import store from "@/app/app-state";
import { AuthResult } from "./api-schemas/auth-schemas";
import { UserSchema } from "./api-schemas/user-schemas";
import { HttpClientBase } from "./http-client-base";

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

  public async users(): Promise<UserSchema[]> {
    return this.get("/auth/users");
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;