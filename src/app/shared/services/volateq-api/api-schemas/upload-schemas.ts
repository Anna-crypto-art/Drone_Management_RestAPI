export interface SecuredFilename {
  original_name: string;
  secured_name: string;
}

export interface UploadFile {
  id: string;
  name: string;
  missing_chunks: number[];
  complete: boolean;
}

export enum UploadState {
  UPLOADING = 0,
  SUCCESS = 1,
  FAILED = 2,
}

export interface Upload {
  upload_id: string;
  state: UploadState;
  files: UploadFile[];
}

export enum UploadProgress {
  CHUNK_COMPLETE = 0,
  FILE_COMPLETE = 1,
  UPLOAD_COMPLETE = 2,
}

export interface UploadChunkResult {
  upload_progress: UploadProgress;
}

export interface MyUploadingUpload {
  upload_id: string;
  analysis_id?: string;
  analysis_name?: string;
}