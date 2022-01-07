import { RoleSchema } from "@/app/shared/services/volateq-api/api-schemas/role-schema";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";

export interface NotifiacationSettingsSchema {
  init_debug_phase: boolean;
  pickup_data: boolean;
  upgrade_product: boolean;
  retry_upload: boolean;
  analysis_failed: boolean;
  analysis_successful: boolean;
}

export interface UserProfileSchema {
  login_failed_count: number;
}

export enum UserStateSchema {
  REGISTERED = "REGISTERED",
  PENDING = "PENDING",
  UNKNOWN = "UNKNOWN",
}

export interface UserSchema {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: UserProfileSchema;
  notification_settings: NotifiacationSettingsSchema;
  last_login: string;
  created_at: string;
  invited_at: string;
  registered_at: string;
  role: RoleSchema;
  state: UserStateSchema;
  customer?: CustomerSchema;
  is_locked: boolean;
}

export interface UserInfoSchema {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}
