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

export class VolateqAPI extends HttpClientBase {

  /**
   * @returns confirmation_key if user logs in with an unkown host, else undefined.
   */
  public async login(email: string, password: string): Promise<string> {
    const confirmLoginResult: ConfirmLoginResult = await this.post("/auth/login", {}, {
      auth: {
        username: email,
        password: password
      }
    });

    return confirmLoginResult.confirmation_key
  }

  public async isLoggedIn(): Promise<boolean> {
    if (store.getters.auth.isAuthenticated) {
      try {
        const pong: { pong: true; } = await this.get("/auth/ping");

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
    const tokenResult: TokenResult = await this.post(`/confirm-login/${confirmationKey}`, { security_code: securityCode });

    await store.dispatch.auth.updateToken({ token: tokenResult.token, role: tokenResult.role, customer_id: tokenResult.customer_id });
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

  public async getRoutes(params: { customer_id?: string, plant_id?: string } | undefined = undefined): Promise<RouteSchema[]> {
    return this.get(`/auth/routes`, params);
  }

  public async createAnalysis(newAnalyis: NewAnalysis): Promise<{ id: string }> {
    return this.post(`/auth/analysis`, newAnalyis);
  }

  public async getAllAnalysis(customer_id?: string): Promise<AnalysisSchema[]> {
    return this.get(`/auth/analysis`, customer_id && { customer_id } || undefined);
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

  public getAnalysisFileDownloadUrl(analysisId: string, fileName: string): Promise<{url: string}> {
    return this.get(`/auth/analysis/${analysisId}/file/${fileName}`);
  }

  public getPlants(customerId?: string): Promise<PlantSchema[]> {
    customerId = customerId || store.state.auth.customer_id;
    if (!customerId) {
      throw Error('Missing customer_id');
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

  public importAnalysisResult(file: File, analysisId: string): Promise<TaskSchema> {
    return this.postFile(`/auth/import-analysis-result/${analysisId}`, 'file', file);
  }

  public getAnalysisResult(analysisResultId: string): Promise<AnalysisResultDetailedSchema> {
    return this.get(`/auth/analysis-result/${analysisResultId}`);
  }

  public getSpecificAnalysisResult<T>(
    analysisResultId: string,
    componentKeyFigureId: string,
    params: TableRequest): 
    Promise<TableResultSchema<T>>
  {
    return this.get(`/auth/analysis-result/${analysisResultId}/${componentKeyFigureId}`, params);
  }

  public getSpecificAnalysisResultCsvUrl(
    analysisResultId: string, 
    componentKeyFigureId: string, 
    params: TableRequest,
    csvMappings?: { [key: string]: string }): string {
    const encodedCsvMappings = csvMappings && `&csv_mappings=${encodeURIComponent(this.getQueryParams(csvMappings).substring(1))}` || '';

    return `${apiBaseUrl}/auth/analysis-result/${analysisResultId}/${componentKeyFigureId}${this.getQueryParams(params)}&csv=1${encodedCsvMappings}`;
  }

  public async generateDownloadUrl(downloadUrl: string, filename?: string): Promise<string> {
    const encodedUrl= encodeURIComponent(encodeURIComponent(downloadUrl));
    const filenameParam = filename && `?filename=${encodeURIComponent(filename)}` || '';

    const urlTokenResponse: { url_token: string } = await this.get(`/auth/user/generate-url-token/${encodedUrl}${filenameParam}`);
    
    return `${apiBaseUrl}/temp-url/${urlTokenResponse.url_token}`;
  }

  public getTask(taskId: string): Promise<TaskSchema> {
    return this.get(`/auth/task/${taskId}`);
  }

  public getAnalysisResultFiles(analysisResultId: string): Promise<AnalysisResultFileSchema[]> {
    return this.get(`/auth/analysis-result/${analysisResultId}/files`);
  }

  public deleteAnalysisResultFile(analysisResultId: string, analysisResultFileId: string): Promise<{ results_deleted: number }> {
    return this.delete(`/auth/analysis-result/${analysisResultId}/file/${analysisResultFileId}`);
  }

  public async resendSecurityCode(confirmationKey: string): Promise<void> {
    await this.post(`/confirm-login-resend/${confirmationKey}`, {});
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;