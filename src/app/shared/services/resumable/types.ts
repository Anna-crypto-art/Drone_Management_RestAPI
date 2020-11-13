export interface IResumableFile {
  fileName: string;
  uniqueIdentifier: string;

  cancel(): void;
  progress(relative: boolean): number;
}

export enum ResumableState {
  UNPREPARED = "UNPREPARED",
  INITIALIZED = "INITIALIZED",
  UPLOADING = "UPLOADING",
  PAUSED = "PAUSED",
  FINISHED = "FINISHED",
  FAILED = "FAILED",
  RETRYING = "RETRYING",
}

export enum ResumableEvent {
  FILE_SUCCESS = "fileSuccess",
  FILE_PROGRESS = "fileProgress",
  FILE_ERROR = "fileError",
  FILE_RETRY = "fileRetry",
  FILE_ADDED = "fileAdded",

  PROGRESS = "progress",
  FAILED = "failed",
  COMPLETED = "completed",
}