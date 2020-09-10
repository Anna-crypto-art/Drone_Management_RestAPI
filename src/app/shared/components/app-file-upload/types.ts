import { IResumableFile, IResumable } from "@/app/shared/components/resumable/types";

export interface IAppFileUpload {
  files: IResumableFile[];
  
  progress(): number;
  cancel(): void;
  upload(): void;
}