import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";
import { CustomerNameSchema } from "../shared/services/volateq-api/api-schemas/customer-schemas";

export interface AuthState {
  token: string;
  role?: ApiRoles;
  customer?: CustomerNameSchema;
  hiddenSuperAdmin?: boolean;
}
