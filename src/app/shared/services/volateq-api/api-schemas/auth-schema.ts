import { ApiRoles } from "../api-roles";

export interface TokenResult {
  token: string;
  role: ApiRoles;
  customer_id?: string;
}

export interface ConfirmLoginResult {
  login_with_unknown_host: true;
  confirmation_key: string;
}

export type AuthResult = TokenResult | ConfirmLoginResult;