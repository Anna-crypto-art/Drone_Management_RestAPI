import store from "@/app/app-state";
import { ConfirmLoginResult, TokenResult } from "@/app/shared/services/volateq-api/api-schemas/auth-schema";
import { UserSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { HttpClientBase } from "@/app/shared/services/volateq-api/http-client-base";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { InviteUser, RegisterUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { baseUrl, apiBaseUrl, environment } from "@/environment/environment";
import { RouteSchema } from "./api-schemas/route-schema";
import { NewAnalysis, UpdateAnalysisState } from "./api-requests/analysis-requests";
import { AnalysisSchema } from "./api-schemas/analysis-schema";
import { PlantSchema } from "./api-schemas/plant-schema";
import { TaskSchema } from "./api-schemas/task-schema";
import { AnalysisResultDetailedSchema } from "./api-schemas/analysis-result-schema";
import { TableRequest } from "./api-requests/common/table-requests";
import { TableResultSchema } from "./api-schemas/table-result-schema";
import { AnalysisResultFileSchema } from "./api-schemas/analysis-result-file-schema";
import { AnalysisResultComponent } from "./api-analysis-result-components";
import { AnalysisResultKeyFigure } from "./api-analysis-result-key-figures";
import { GeoVisualQuery } from "./api-requests/geo-visual-query-requests";
import { ApiErrors, ApiException } from "./api-errors";

export class VolateqAPI extends HttpClientBase {
  /**
   * @returns confirmation_key if user logs in with an unkown host, else undefined.
   */
  public async login(email: string, password: string): Promise<string> {
    const confirmLoginResult: ConfirmLoginResult = await this.post(
      "/auth/login",
      {},
      {
        auth: {
          username: email,
          password: password,
        },
      }
    );

    return confirmLoginResult.confirmation_key;
  }

  public async isLoggedIn(): Promise<boolean> {
    if (store.getters.auth.isAuthenticated) {
      try {
        const pong: { pong: true } = await this.get("/auth/ping");

        if (pong.pong) {
          return true;
        }
      } catch {
        return false;
      }
    }

    return false;
  }

  public async confirmLogin(confirmationKey: string, securityCode: string): Promise<void> {
    const tokenResult: TokenResult = await this.post(`/confirm-login/${confirmationKey}`, {
      security_code: securityCode,
    });

    await store.dispatch.auth.updateToken({
      token: tokenResult.token,
      role: tokenResult.role,
      customer_id: tokenResult.customer_id,
    });
  }

  public async logout(): Promise<void> {
    await this.post("/auth/logout");

    await store.dispatch.auth.updateToken({ token: "", role: "", customer_id: undefined });
  }

  public async getUsers(): Promise<UserSchema[]> {
    return this.get("/auth/users");
  }

  public async getCustomers(): Promise<CustomerSchema[]> {
    return this.get("/auth/customers");
  }

  public async inviteUser(user: InviteUser): Promise<string> {
    const confirmKey = (await this.post("/auth/user", user)).confirmation_key;

    return `${baseUrl}/confirm/${confirmKey}`;
  }

  public async getInvitedUser(confirmKey: string): Promise<UserSchema> {
    return this.get(`/confirm/${confirmKey}`);
  }

  public async registerUser(confirmKey: string, user: RegisterUser): Promise<void> {
    await this.post(`/confirm/${confirmKey}`, user);
  }

  public async getRoutes(
    params: { customer_id?: string; plant_id?: string } | undefined = undefined
  ): Promise<RouteSchema[]> {
    return this.get(`/auth/routes`, params);
  }

  public async createAnalysis(newAnalyis: NewAnalysis): Promise<{ id: string }> {
    return this.post(`/auth/analysis`, newAnalyis);
  }

  public async getAllAnalysis(queryParams?: { plant_id?: string }): Promise<AnalysisSchema[]> {
    return this.get(`/auth/analysis`, queryParams);
  }

  public getAnalysis(analysisId?: string): Promise<AnalysisSchema> {
    return this.get(`/auth/analysis/${analysisId}`);
  }

  public getAnalysisFileUploadUrl(analysisId: string): string {
    return `${this.baseURL}/auth/analysis/${analysisId}/file`;
  }

  public async updateAnalysisState(analysisId: string, analysisState: UpdateAnalysisState): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/state`, analysisState);
  }

  public async cancelAnalysisUpload(analysisId: string): Promise<void> {
    await this.delete(`/auth/analysis/${analysisId}`);
  }

  public getAnalysisFileDownloadUrl(analysisId: string, fileName: string): Promise<{ url: string }> {
    return this.get(`/auth/analysis/${analysisId}/file/${fileName}`);
  }

  public getPlants(customerId?: string): Promise<PlantSchema[]> {
    customerId = customerId || store.state.auth.customer_id;
    if (!customerId) {
      throw Error("Missing customer_id");
    }

    return this.get(`/auth/customer/${customerId}/plants`);
  }

  public forgotPassword(email: string): Promise<void> {
    return this.post(`/forgot-password`, { email });
  }

  public confirmPasswordReset(confirmationKey: string): Promise<void> {
    return this.get(`/reset-password/${confirmationKey}`);
  }

  public resetPassword(confirmationKey: string, new_password: string, new_password_repeat: string): Promise<void> {
    return this.post(`/reset-password/${confirmationKey}`, { new_password, new_password_repeat });
  }

  public async importAnalysisResult(
    jsonFile: File,
    analysisId: string,
    imageFiles?: File[],
    uploadProgressCallback?: (progress: number) => void
  ): Promise<TaskSchema> {
    const fileData = { json_file: jsonFile };
    if (imageFiles) {
      fileData["image_filenames"] = imageFiles.map(file => file.name);
    }

    const task = await this.postForm(`/auth/import-analysis-result/${analysisId}`, fileData);

    if (imageFiles) {
      try {
        await this.uploadImportAnalysisResultImageFiles(analysisId, imageFiles, uploadProgressCallback);
      } catch (e) {
        if (!(e as ApiException).error || (e as ApiException).error !== ApiErrors.BAD_REQUEST) {
          // Ignore Bad request error (='An import is running for this analysis, already.')
          // to avoid overwriting of actual task error
          throw e;
        }
      }
    }

    return task;
  }

  private async uploadImportAnalysisResultImageFiles(
    analysisId: string,
    imageFiles: File[],
    uploadProgressCallback?: (progress: number) => void
  ): Promise<void> {
    const imagesFilesToUpload = imageFiles.slice();

    while (imagesFilesToUpload.length > 0) {
      await this.postForm(`/auth/import-analysis-result/${analysisId}/upload-images`, {
        // Only upload 50 files simultaneously to avoid 504 (Gateway timout)
        image_files: imagesFilesToUpload.splice(0, 50),
      });

      uploadProgressCallback &&
        uploadProgressCallback(
          Math.round(((imageFiles.length - imagesFilesToUpload.length) / imageFiles.length) * 100)
        );
    }
  }

  public async getAnalysisResult(analysisResultId: string): Promise<AnalysisResultDetailedSchema> {
    const analysisResults = [await this.get(`/auth/analysis-result/${analysisResultId}`)];

    this.filterKeyFigures(analysisResults);

    return analysisResults[0];
  }

  public getAllSpecificAnalysisResult<T>(analysisResultId: string, componentId: AnalysisResultComponent): Promise<T[]> {
    return this.get(`/auth/analysis-result/${analysisResultId}/${componentId}`);
  }

  public getSpecificAnalysisResult<T>(
    analysisResultId: string,
    componentId: number,
    params: TableRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(`/auth/analysis-result/${analysisResultId}/${componentId}`, params);
  }

  public getSpecificAnalysisResultCsvUrl(
    analysisResultId: string,
    componentId: number,
    params: TableRequest,
    csvMappings?: { [key: string]: string }
  ): string {
    const encodedCsvMappings =
      (csvMappings && `&csv_mappings=${encodeURIComponent(this.getQueryParams(csvMappings).substring(1))}`) || "";

    return `${apiBaseUrl}/auth/analysis-result/${analysisResultId}/${componentId}${this.getQueryParams(
      params
    )}&csv=1${encodedCsvMappings}`;
  }

  public async generateDownloadUrl(downloadUrl: string, filename?: string): Promise<string> {
    const encodedUrl = encodeURIComponent(encodeURIComponent(downloadUrl));
    const filenameParam = (filename && `?filename=${encodeURIComponent(filename)}`) || "";

    const urlTokenResponse: { url_token: string } = await this.get(
      `/auth/user/generate-url-token/${encodedUrl}${filenameParam}`
    );

    return `${apiBaseUrl}/temp-url/${urlTokenResponse.url_token}`;
  }

  public getTask(taskId: string): Promise<TaskSchema> {
    return this.get(`/auth/task/${taskId}`);
  }

  public getAnalysisResultFiles(analysisResultId: string): Promise<AnalysisResultFileSchema[]> {
    return this.get(`/auth/analysis-result/${analysisResultId}/files`);
  }

  public deleteAnalysisResult(analysisResultId: string): Promise<{ results_deleted: number }> {
    return this.delete(`/auth/analysis-result/${analysisResultId}`);
  }

  public async resendSecurityCode(confirmationKey: string): Promise<void> {
    await this.post(`/confirm-login-resend/${confirmationKey}`, {});
  }

  public getPlant(plantId: string): Promise<PlantSchema> {
    return this.get(`/auth/plant/${plantId}`);
  }

  public getComponentsGeoVisual(plantId: string, componentIds: AnalysisResultComponent[]): Promise<any> {
    return this.get(`/auth/geo-visual/${plantId}/components`, { ids: componentIds });
  }

  public getKeyFiguresGeoVisual(
    plantId: string,
    analysisResultId: string,
    keyFiguresId: AnalysisResultKeyFigure,
    query_params?: GeoVisualQuery
  ): Promise<any> {
    return this.get(`/auth/geo-visual/${plantId}/${analysisResultId}/key-figure/${keyFiguresId}`, query_params);
  }

  public async getAnalysisResults(plantId: string): Promise<AnalysisResultDetailedSchema[]> {
    const analysisResults = await this.get(`/auth/plant/${plantId}/analysis-results`);

    this.filterKeyFigures(analysisResults);

    return analysisResults;
  }

  public importFieldgeometry(
    file: File,
    customerId: string,
    plantId: string,
    clearBefore: boolean
  ): Promise<TaskSchema> {
    return this.postForm(`/auth/fieldgeometry/${customerId}/${plantId}?clear_before=${clearBefore}`, { file });
  }

  public waitForTask(taskId: string, finished: (task: TaskSchema) => void, info?: (infoMessage: string) => void): void {
    const interval = setInterval(async () => {
      const task = await this.getTask(taskId);
      if (task.state === "SUCCESS" || task.state === "FAILURE") {
        clearInterval(interval);
        finished(task);
      } else {
        if (info) {
          if (task.info && task.info.infos && task.info.infos.length > 0) {
            const infoMessage =
              ">" +
              task.info.infos.join("<br>>") +
              ((task.info.max_steps && `... (${task.info.current_step}/${task.info.max_steps})`) || "...");

            info(infoMessage);
          } else {
            info("Wait for start...");
          }
        }
      }
    }, 3000);
  }

  public resendUserInvitation(userId: string): Promise<void> {
    return this.post(`/auth/user/${userId}/resend-invitation`);
  }

  public unLockUser(userId: string, lock: boolean): Promise<void> {
    return this.post(`/auth/user/${userId}/un-lock`, { lock });
  }

  public updateAnalysisResult(analysisResultId: string, updates: { release: boolean }): Promise<void> {
    return this.post(`/auth/analysis-result/${analysisResultId}`, updates);
  }

  public getAllPlants(): Promise<PlantSchema[]> {
    return this.get(`/auth/plants`);
  }

  public getAnalysisResultFileUrl(analysisResultFileId: string): Promise<{ url: string }> {
    return this.get(`/auth/analysis-result/result-file/${analysisResultFileId}`)
  }

  private filterKeyFigures(analysisResults: AnalysisResultDetailedSchema[]): void {
    // Temporary special case for IR_INTENSITY: Replaced by GLASS_TUBE_TEMPERATURE
    for (const analysisResult of analysisResults) {
      const ir_intensity_index = analysisResult.key_figures.findIndex(
        keyFigure => keyFigure.id === AnalysisResultKeyFigure.IR_INTENSITY_ID
      );
      if (
        ir_intensity_index != -1 &&
        analysisResult.key_figures.find(keyFigure => keyFigure.id === AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID)
      ) {
        analysisResult.key_figures.splice(ir_intensity_index, 1);
      }
    }
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;
