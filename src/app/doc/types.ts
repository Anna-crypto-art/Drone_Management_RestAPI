export interface DocFileItem {
  id?: string;
  fileName: string | null;
  description: string | null;
  updatedAtBy?: string;
  size?: string;
}