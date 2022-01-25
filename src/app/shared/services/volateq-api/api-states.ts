export enum ApiStates {
  UPLOADING = 1,
  UPLOAD_FAILED = 2,
  UPLOAD_FINISHED = 3,
  DATA_INCOMPLETE = 4,
  DATA_COMPLETE = 5,
  PROCESSING = 6,
  FINISHED = 7,
}

export const apiStateNames: Record<ApiStates, string> = {
  [ApiStates.UPLOADING]: "UPLOADING",
  [ApiStates.UPLOAD_FAILED]: "UPLOAD_FAILED",
  [ApiStates.UPLOAD_FINISHED]: "UPLOAD_FINISHED",
  [ApiStates.DATA_INCOMPLETE]: "DATA_INCOMPLETE",
  [ApiStates.DATA_COMPLETE]: "DATA_COMPLETE",
  [ApiStates.PROCESSING]: "PROCESSING",
  [ApiStates.FINISHED]: "FINISHED",
}
