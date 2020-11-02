import store from "@/app/app-state";
import { AuthResult } from "@/app/shared/services/volateq-api/api-schemas/auth-schema";
import { UserSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { HttpClientBase } from "@/app/shared/services/volateq-api/http-client-base";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { InviteUser, RegisterUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { baseUrl } from "@/environment/environment";
import { RouteSchema } from "./api-schemas/route-schema";
import { NewAnalysis, UpdateAnalysisState } from "./api-requests/analysis-requests";
import { AnalysisSchema } from "./api-schemas/analysis-schema";

export class VolateqAPI extends HttpClientBase {

  public async login(email: string, password: string): Promise<void> {
    const authResult: AuthResult = await this.post("/auth/login", {}, {
      auth: {
        username: email,
        password: password
      }
    });

    await store.dispatch.auth.updateToken({ token: authResult.token, role: authResult.role });    
  }

  public async logout(): Promise<void> {
    await this.post("/auth/logout");

    await store.dispatch.auth.updateToken({ token: "", role: "" });
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

  public async getAnalysis(customer_id?: string): Promise<AnalysisSchema[]> {
    return this.get(`/auth/analysis`, customer_id && { customer_id } || undefined);
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

  public getAnalysisFileDownloadUrl(analysisId: string, fileName: string): string {
    return `${this.baseURL}/auth/analysis/${analysisId}/file/${fileName}`;
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;