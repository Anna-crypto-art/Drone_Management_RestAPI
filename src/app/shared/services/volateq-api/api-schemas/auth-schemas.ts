import { ApiRoles } from "../api-roles";

export interface AuthResult {
  token: string;
  role: ApiRoles;
}