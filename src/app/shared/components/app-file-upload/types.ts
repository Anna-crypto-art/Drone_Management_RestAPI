export interface IResumable {
  files: IResumableFile[];
  
  cancel(): void;
  setBearerToken(token: string): void;
  upload(): void;
  progress(): number;
}

export interface IResumableFile {
  fileName: string;
  uniqueIdentifier: string;

  cancel(): void;
  progress(relative: boolean): number;
}

export interface IAppFileUpload {
  files: IResumableFile[];
  
  progress(): number;
  cancel(): void;
  upload(): void;
}