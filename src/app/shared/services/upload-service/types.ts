export enum UploaderEvent {
  FILE_PROGRESS = "UPLOAD_FILE_PROGRESS",
  FILE_COMPLETE = "FILE_COMPLETE",
  FILE_CHUNK_COMPLETE = "FILE_CHUNK_COMPLETE",
  ERROR = "UPLOAD_ERROR",
  START_UPLOAD = "START_UPLOAD",
  UPLOAD_COMPLETE = "UPLOAD_COMPLETE",
  UPLOAD_CANCELED = "UPLOAD_CANCELED",
  RESUME_UPLOAD_AFTER_ERROR = "RESUME_UPLOAD_AFTER_ERROR",
}

export interface IResumableFile {
  fileName: string;
  uniqueIdentifier: string;

  cancel(): void;
  progress(relative: boolean): number;
  isComplete(): boolean;
}

export enum UploadState {
  UNPREPARED = "UNPREPARED",
  INITIALIZED = "INITIALIZED",
  UPLOADING = "UPLOADING",
  FINISHED = "FINISHED",
  FAILED = "FAILED",
  RETRYING = "RETRYING",
}

export enum UploadEvent {
  FILE_SUCCESS = "fileSuccess",
  FILE_PROGRESS = "fileProgress",
  FILE_ERROR = "fileError",
  FILE_RETRY = "fileRetry",
  FILE_ADDED = "fileAdded",
  FILE_REMOVED = "fileRemoved",

  PROGRESS = "progress",
  FAILED = "failed",
  COMPLETED = "completed",
}

export interface IUploadService {
  on(event: UploadEvent, callbackFn: any): void;
  hasState(state: UploadState): boolean;
  getMetadata<T>(): T;
  progress(): number;
  getMaxRetries(): number;
}

export interface IUploadListener {
  registerUploadEvents(): void; // call me on mounted event, to avoid multiple registrations
  checkUploadState(): void;
}
