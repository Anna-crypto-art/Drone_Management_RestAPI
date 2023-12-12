import { SimpleUserSchema } from "./user-schemas";

export interface DocFile {
  id: string;
  file_name: string;
  title?: string;
  description?: string;
  user: SimpleUserSchema;
  updated_at: string;
  created_at: string;
  size: number;
}