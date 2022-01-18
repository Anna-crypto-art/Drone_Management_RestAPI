import { IResumableFile } from "@/app/shared/services/upload-service/types";

export interface IAppFileUpload {
  files: IResumableFile[];

  cancel(): void;
  upload<T>(target: string, metadata?: T): void;
}

export interface IAppFileUploadFile {
  uniqueIdentifier: string;

  success: boolean;
  error: string;
  emitError(msg: string): void;
  emitProgress(): void;
  emitSuccess(): void;
  emitRetry(): void;
}
