import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

export interface AuthState {
  token: string;
  role?: ApiRoles;
  customer_id?: string;
}
