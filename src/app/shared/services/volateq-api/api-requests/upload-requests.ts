export interface CreateFileUpload {
  name: string;
  size: number;
}

export interface CreateUploadRequest {
  chunk_size_in_mb: number;
  files: CreateFileUpload[];
}