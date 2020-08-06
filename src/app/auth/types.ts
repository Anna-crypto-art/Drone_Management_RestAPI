import { ApiRoles } from "../shared/services/volateq-api/api-roles";

export interface AuthState {
  token: string;
  role: ApiRoles | "";
}