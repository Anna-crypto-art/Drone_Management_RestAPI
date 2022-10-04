import { ApiRoles } from "../api-roles";
import { CustomerNameSchema } from "./customer-schemas";

export interface TokenResult {
  token: string;
  role: ApiRoles;
  customer?: CustomerNameSchema;
}

export interface ConfirmLoginResult {
  login_with_unknown_host: true;
  confirmation_key: string;
}
