export interface IResumable {
  getFiles(): IResumableFile[];
  cancel(): void;
  setBearerToken(token: string): void;
}

export interface IResumableFile {
  fileName: string;
  uniqueIdentifier: string;

  cancel(): void;
  progress(relative: boolean): number;
}