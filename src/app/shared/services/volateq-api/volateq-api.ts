import store from "@/app/app-state";
import { AuthResult } from "./api-schemas/auth-schemas";
import { UserSchema } from "./api-schemas/user-schemas";
import { HttpClientBase } from "./http-client-base";
import { CustomerSchema } from "./api-schemas/customer-schemas";
import { InviteUser } from "@/app/settings/users/types";
import { baseUrl } from "@/environment/environment";

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

    return `${baseUrl}confirm/${confirmKey}`;
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;