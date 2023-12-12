export interface DocFileItem {
  id?: string;
  fileName?: string;
  file: File | null;
  title?: string | null;
  description: string | null;
  updatedAtBy?: string;
  size?: string;
}