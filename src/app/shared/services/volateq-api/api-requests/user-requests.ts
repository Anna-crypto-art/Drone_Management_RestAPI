import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

export interface InviteUser {
  email: string;
  role: ApiRoles | "";
  customer_id?: string;
}

export interface RegisterUser {
  user_id: string;
  first_name?: string;
  last_name?: string;
  password: string;
  repeat_password: string;
}