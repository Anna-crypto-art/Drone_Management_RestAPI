import { UserInfoSchema } from "./user-schemas";

export interface DocFile {
  id: string;
  file_name: string;
  title?: string;
  description?: string;
  user: UserInfoSchema;
  updated_at: string;
  created_at: string;
  size: number;
}