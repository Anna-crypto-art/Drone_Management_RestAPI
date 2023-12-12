import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";
import { UserAuthMethod } from "../api-schemas/user-schemas";

export interface InviteUser {
  email: string;
  role_id: ApiRoles | null;
  customer_id: string | null;
  plant_ids?: string[];
}

export interface RegisterUser {
  user_id: string;
  first_name?: string;
  last_name?: string;
  password: string;
  repeat_password: string;
  auth_method: UserAuthMethod | null;
}
