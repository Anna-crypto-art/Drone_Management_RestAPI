import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

export interface InviteUser {
  email: string;
  role: ApiRoles | "";
  customer_id?: string;

  customerSelectionDisabled: boolean;
}