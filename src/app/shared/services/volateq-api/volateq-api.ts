import store from "@/app/app-state";
import { InviteUser, RegisterUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { ConfirmLoginResult, TokenResult } from "@/app/shared/services/volateq-api/api-schemas/auth-schema";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { UserSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { HttpClientBase } from "@/app/shared/services/volateq-api/http-client-base";
import { apiBaseUrl, baseUrl } from "@/environment/environment";
import { NewAnalysis, UpdateAnalysisState } from "./api-requests/analysis-requests";
import { CreatePlantRequest, UpdatePlantRequest } from "./api-requests/plant-requests";
import { AnalysisSchema } from "./api-schemas/analysis-schema";
import { PlantSchema } from "./api-schemas/plant-schema";
import { AnalysisResultDetailedSchema } from "./api-schemas/analysis-result-schema";
import { TableFilterRequest, TableRequest } from "./api-requests/common/table-requests";
import { AnalysisResultFileSchema } from "./api-schemas/analysis-result-file-schema";
import { ApiComponent } from "./api-components/api-components";
import { ApiKeyFigure } from "./api-key-figures";
import { GeoVisualQuery } from "./api-requests/geo-visual-query-requests";
import { RouteSchema } from "./api-schemas/route-schema";
import { TableResultSchema } from "./api-schemas/table-result-schema";
import { TaskSchema } from "./api-schemas/task-schema";
import { ApiStates } from "./api-states";
import { CustomerRequest } from "./api-requests/customer-requests";
import { TechnologySchema } from "./api-schemas/technology-schema";
import { AnalysisMonitoring } from "./api-schemas/analysis-monitoring";
import { QFlyServerSchema } from "./api-schemas/server-schemas";
import { QFlyServerActionRequest } from "./api-requests/server-requests";

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

    await store.dispatch.auth.updateToken({ token: "", role: undefined, customer_id: undefined });
  }

  public async getUsers(customerId?: string): Promise<UserSchema[]> {
    return this.get("/auth/users", customerId ? { customer_id: customerId } : undefined);
  }

  public async inviteUser(user: InviteUser): Promise<string> {
    const confirmKey = (await this.post("/auth/user", user)).confirmation_key;

    return `${baseUrl}/confirm/${confirmKey}`;
  }

  public async assignPlantsToUser(userId: string, plantIds: string[]): Promise<void> {
    await this.post(`/auth/user/${userId}/assign-plants`, { plant_ids: plantIds });
  }

  public async changeUserRole(userId: string, roleId: number): Promise<void> {
    await this.post(`/auth/user/${userId}/change-role`, { role_id: roleId });
  }

  public async getInvitedUser(confirmKey: string): Promise<UserSchema> {
    return this.get(`/confirm/${confirmKey}`);
  }

  public async registerUser(confirmKey: string, user: RegisterUser): Promise<void> {
    await this.post(`/confirm/${confirmKey}`, user);
  }

  public async deleteUser(userId): Promise<void> {
    await this.delete(`/auth/user/${userId}/delete`);
  }

  public async getRoutes(
    params: { customer_id?: string; plant_id?: string } | undefined = undefined
  ): Promise<RouteSchema[]> {
    return this.get(`/auth/routes`, params);
  }

  public async createAnalysis(newAnalyis: NewAnalysis): Promise<{ id: string }> {
    return this.post(`/auth/analysis`, newAnalyis);
  }

  public async getAllAnalysis(queryParams?: { plant_id?: string; customer_id?: string }): Promise<AnalysisSchema[]> {
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

  public async deleteAnalysis(analysisId: string): Promise<void> {
    await this.delete(`/auth/analysis/${analysisId}`);
  }

  public getAnalysisFileDownloadUrl(analysisId: string, fileName: string): Promise<{ url: string }> {
    return this.get(`/auth/analysis/${analysisId}/file/${fileName}`);
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
    imageFilesZipName?: string,
  ): Promise<TaskSchema> {
    const formData = { json_file: jsonFile };
    if (imageFilesZipName) {
      formData["images_zip_filename"] = imageFilesZipName;
    }

    return await this.postForm(`/auth/import-analysis-result/${analysisId}`, formData);
  }

  public async uploadImportAnalysisResultImageFiles(
    analysisId: string,
    imageFilesZip: File,
    onUploadProgress?: (progressEvent: ProgressEvent) => void,
  ): Promise<void> {
    await this.postForm(
      `/auth/import-analysis-result/${analysisId}/upload-images`, 
      { image_files_zip: imageFilesZip },
      onUploadProgress
    );
  }

  public async prepareAnalysisUpload(analysisId: string, fileNames: string[]): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/prepare-upload`, { files: fileNames });
  }

  public async cancelAnalysisUpload(analysisId: string): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/cancel-upload`);
  }

  public async updateAnalysis(
    analysisId: string,
    updateData: { data_complete?: boolean; flown_at?: string }
  ): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}`, updateData);
  }

  public async getAnalysisResult(analysisResultId: string): Promise<AnalysisResultDetailedSchema> {
    const analysisResults = [await this.get(`/auth/analysis-result/${analysisResultId}`)];

    this.filterKeyFigures(analysisResults);

    return analysisResults[0];
  }

  public getAllSpecificAnalysisResult<T>(analysisResultId: string, componentId: ApiComponent): Promise<T[]> {
    return this.get(`/auth/analysis-result/${analysisResultId}/${componentId}`);
  }

  private getEncodedAnalysisResultFilterParams(filterParams?: TableFilterRequest) {
    let encodedFilterParams = "";
    if (filterParams) {
      if (filterParams.filters) {
        encodedFilterParams += `&filters=${encodeURIComponent(JSON.stringify(filterParams.filters))}`;
      }
      if (filterParams.component_filter) {
        encodedFilterParams += `&component_filter=${encodeURIComponent(JSON.stringify(filterParams.component_filter))}`;
      }
      if (filterParams.columns_selection) {
        encodedFilterParams += `&columns_selection=${encodeURIComponent(
          JSON.stringify(filterParams.columns_selection)
        )}`;
      }
    }

    return encodedFilterParams;
  }

  public getSpecificAnalysisResult<T>(
    analysisResultId: string,
    componentId: number,
    params: TableRequest,
    filterParams?: TableFilterRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(
      `/auth/analysis-result/${analysisResultId}/${componentId}${this.getQueryParams(
        params
      )}${this.getEncodedAnalysisResultFilterParams(filterParams)}`
    );
  }

  public getSpecificAnalysisResultCsvUrl(
    analysisResultId: string,
    componentId: number,
    params: TableRequest,
    filterParams?: TableFilterRequest,
    csvMappings?: { [key: string]: string }
  ): string {
    const encodedCsvMappings =
      (csvMappings && `&csv_mappings=${encodeURIComponent(this.getQueryParams(csvMappings).substring(1))}`) || "";

    return `${apiBaseUrl}/auth/analysis-result/${analysisResultId}/${componentId}${this.getQueryParams(
      params
    )}&csv=1${encodedCsvMappings}${this.getEncodedAnalysisResultFilterParams(filterParams)}`;
  }

  public getSpecificAnalysisResultCompared<T>(
    analysisResultId: string,
    componentId: number,
    compareAnalysisResultId: string,
    params: TableRequest,
    filterParams?: TableFilterRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(
      `/auth/analysis-result/compare/${analysisResultId}/${componentId}/${compareAnalysisResultId}${this.getQueryParams(
        params
      )}${this.getEncodedAnalysisResultFilterParams(filterParams)}`
    );
  }

  public getAnalysisResultHistory<T>(
    plantId: string,
    componentId: number,
    params: TableRequest,
    filterParams?: TableFilterRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(`/auth/analysis-results/history/${plantId}/${componentId}${this.getQueryParams(params)}
      ${this.getEncodedAnalysisResultFilterParams(filterParams)}`);
  }

  public async generateDownloadUrl(downloadUrl: string): Promise<string> {
    const encodedUrl = encodeURIComponent(encodeURIComponent(downloadUrl));

    const urlTokenResponse: { url_token: string } = await this.get(`/auth/user/generate-url-token/${encodedUrl}`);

    return `${downloadUrl}&url_token=${encodeURIComponent(urlTokenResponse.url_token)}`;
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

  public getComponentsGeoVisual(plantId: string, componentIds: ApiComponent[]): Promise<any> {
    return this.get(`/auth/geo-visual/${plantId}/components`, { ids: componentIds });
  }

  public getKeyFiguresGeoVisual(
    plantId: string,
    analysisResultId: string,
    keyFiguresId: ApiKeyFigure,
    query_params?: GeoVisualQuery
  ): Promise<any> {
    return this.get(`/auth/geo-visual/${plantId}/${analysisResultId}/key-figure/${keyFiguresId}`, query_params);
  }

  public getKeyFiguresGeoVisualCompare(
    plantId: string,
    analysisResultId: string,
    compareAnalysisResultId: string,
    keyFiguresId: ApiKeyFigure,
    query_params?: GeoVisualQuery
  ): Promise<any> {
    return this.get(
      `/auth/geo-visual/compare/${plantId}/${analysisResultId}/${compareAnalysisResultId}/key-figure/${keyFiguresId}`,
      query_params
    );
  }

  public async getAnalysisResults(plantId: string): Promise<AnalysisResultDetailedSchema[]> {
    const analysisResults = await this.get(`/auth/plant/${plantId}/analysis-results`);

    this.filterKeyFigures(analysisResults);

    return analysisResults;
  }

  public importFieldgeometry(file: File, plantId: string, clearBefore: boolean): Promise<TaskSchema> {
    return this.postForm(`/auth/fieldgeometry/${plantId}?clear_before=${clearBefore}`, { file });
  }

  public waitForTask(
    taskId: string,
    onFinished: (task: TaskSchema, failed: boolean) => void,
    onProgress?: (task: TaskSchema) => void,
  ): void {
    const interval = setInterval(async () => {
      const task = await this.getTask(taskId);
      if (task.state === "SUCCESSFUL" || task.state === "FAILED") {
        clearInterval(interval);

        const failed = task.state !== "SUCCESSFUL";
        if (failed) {
          if (!task.output) {
            task.output = {};
          }
          if (!task.output.error) {
            task.output.error = "No error message provided. Check server logs for details";
          }
        }

        onFinished(task, failed);
      } else if (onProgress) {
        onProgress(task);
      }
    }, 3000);
  }

  public getTaskOutputAsMessage(task: TaskSchema, defaultMsg = "") {
    if (task.output?.infos && task.output.infos.length > 0) {
      return "> " +
        task.output.infos.join("<br>> ") +
        ((task.output.max_steps && `... (${task.output.step}/${task.output.max_steps})`) || "...");
    }

    return defaultMsg;
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

  public getPlants(withAnalysisResultsCount = false, customerId?: string): Promise<PlantSchema[]> {
    return this.get(`/auth/plants`, {
      with_analysis_results_count: withAnalysisResultsCount ? 1 : 0,
      customer_id: customerId,
    });
  }

  public getAnalysisResultFileUrl(analysisResultFileId: string): Promise<{ url: string }> {
    return this.get(`/auth/analysis-result/result-file/${analysisResultFileId}`);
  }

  public getFieldgeometryFileUrl(fieldgeometryId: string): Promise<{ url: string }> {
    return this.get(`/auth/fieldgeometry/${fieldgeometryId}/file-url`);
  }

  public downloadMultipleAnalysisFilesUrl(analysisId: string, filenames: string[]) {
    return this.getUrl(`${apiBaseUrl}/auth/analysis/${analysisId}/files-download`, { filenames: filenames });
  }

  public getAnalysisFilesInfo(analysisId: string, filenames: string[]): Promise<Record<string, number | null>> {
    return this.get(`/auth/analysis/${analysisId}/files-info`, { filenames });
  }

  public getStates(): Promise<Record<ApiStates, ApiStates[]>> {
    return this.get(`/auth/states`);
  }

  public updatePlant(plantId: string, updatePlantRequest: UpdatePlantRequest): Promise<void> {
    return this.post(`/auth/plant/${plantId}`, updatePlantRequest);
  }

  public getAnalysisMonitoring(): Promise<AnalysisMonitoring> {
    return this.get(`/auth/analysis-monitoring`).then(
      response =>
        typeof response == "string"
          ? {}
          : response /* The 204 (NO CONTENT) response from the backend causes response to be a string */
    );
  }

  public getFieldgeometryComponentCodes(fieldgeometryId: string, componentId: ApiComponent): Promise<string[]> {
    return this.get(`/auth/fieldgeometry/${fieldgeometryId}/${componentId}/component-codes`);
  }

  public getCustomers(): Promise<CustomerSchema[]> {
    return this.get(`/auth/customers`);
  }

  public async createCustomer(customerRequest: CustomerRequest): Promise<void> {
    await this.post(`/auth/customer`, customerRequest);
  }

  public async updateCustomer(customerId: string, customerRequest: CustomerRequest): Promise<void> {
    await this.post(`/auth/customer/${customerId}`, customerRequest);
  }

  public async deleteCustomer(customerId: string): Promise<void> {
    await this.delete(`/auth/customer/${customerId}`);
  }

  public async getTechnologies(): Promise<TechnologySchema[]> {
    return await this.get(`/auth/technologies`);
  }

  public async createPlant(createPlantRequest: CreatePlantRequest): Promise<void> {
    await this.post(`/auth/plant`, createPlantRequest);
  }

  public async deletePlant(plantId: string): Promise<void> {
    await this.delete(`/auth/plant/${plantId}`);
  }

  public async getQFlyServer(analysisId: string): Promise<QFlyServerSchema> {
    return this.get(`/auth/analysis/${analysisId}/qfly-server`);
  }

  public async runQFlyServerAction(analysisId: string, qFlyServerAction: QFlyServerActionRequest): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/qfly-server`, qFlyServerAction);
  }

  private filterKeyFigures(analysisResults: AnalysisResultDetailedSchema[]): void {
    // Temporary special case for IR_INTENSITY: Replaced by GLASS_TUBE_TEMPERATURE
    for (const analysisResult of analysisResults) {
      const ir_intensity_index = analysisResult.key_figures.findIndex(
        keyFigure => keyFigure.id === ApiKeyFigure.IR_INTENSITY_ID
      );
      if (
        ir_intensity_index != -1 &&
        analysisResult.key_figures.find(keyFigure => keyFigure.id === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID)
      ) {
        analysisResult.key_figures.splice(ir_intensity_index, 1);
      }
    }
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;
