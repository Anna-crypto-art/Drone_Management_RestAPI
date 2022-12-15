import { EventEmitter } from "events";
import { waitFor } from "../helper/debounce-helper";
import { ApiException } from "../volateq-api/api-errors";
import { CreateFileUpload } from "../volateq-api/api-requests/upload-requests";
import { MyUploadingUpload, Upload } from "../volateq-api/api-schemas/upload-schemas";
import volateqApi from "../volateq-api/volateq-api";
import { FileUploader } from "./file-uploader";
import { UploaderEvent } from "./types";


export abstract class UploaderService {
  private event = new EventEmitter();
  public fileUploaders: FileUploader[] = [];
  protected upload: Upload | null = null;

  // Axios fires onUploadProgress, even on (and after!) error 
  // without any error information within the progress event object...
  // That is pretty annoying! Anyway the workaround here is 
  // to ensure that the progress event has been fired twice without any error in between
  private raisedError = false;
  private trials = 0;

  constructor(
    public readonly chunkSizeInMB = 100
  ) {}

  public async addFiles(files: File[]): Promise<void> {
    const securedFileNames = await volateqApi.getSecuredFilenames(files.map(f => f.name));

    for (const securedFileName of securedFileNames) {
      const file = files.find(f => f.name === securedFileName.original_name);
      if (!file) {
        throw new Error("File mapping error");
      }

      const fileUploader = new FileUploader(file, securedFileName.secured_name, this.chunkSizeInMB);
      fileUploader.onChunkComplete(() => { this.emitResume() });

      this.fileUploaders.push(fileUploader);
    }
  }

  public removeFile(fileName: string): void {
    const removeFileIndex = this.fileUploaders.findIndex(file => file.fileName === fileName);
    if (removeFileIndex !== -1) {
      this.fileUploaders.splice(removeFileIndex, 1);
    }
  }

  public onError(onErrorCallback: (ex: ApiException) => void) {
    this.event.on(UploaderEvent.ERROR, onErrorCallback);
  }

  public onStartUpload(onStartUploadCallback: () => void) {
    this.event.on(UploaderEvent.START_UPLOAD, onStartUploadCallback);
  }

  public onResume(onResumeCallback: () => void) {
    this.event.on(UploaderEvent.RESUME_UPLOAD_AFTER_ERROR, onResumeCallback);
  }

  public onUploadComplete(onUploadCompleteCallback: () => void) {
    this.event.on(UploaderEvent.UPLOAD_COMPLETE, onUploadCompleteCallback);
  }

  public getTrials(): number {
    return this.trials;
  }

  private emitError(ex: ApiException | any): void {
    this.event.emit(UploaderEvent.ERROR, ex);

    this.raisedError = true;
    this.trials += 1;
  }

  private emitResume(): void {
    this.trials = 0;

    this.event.emit(UploaderEvent.RESUME_UPLOAD_AFTER_ERROR);
  }

  public abstract doUpload(): Promise<void>;

  protected getCreateUploadFiles(): CreateFileUpload[] {
    return this.fileUploaders.map(f => ({ name: f.fileName, size: f.file.size }));
  }

  protected prepareFileUploaders() {
    if (!this.upload) {
      throw new Error("Upload is undefined. Missing upload object");
    }

    for (const fileUploader of this.fileUploaders) {
      const preparedUploadFile = this.upload.files.find(f => f.name == fileUploader.fileName);
      if (!preparedUploadFile) {
        throw new Error("File mapping error");
      }

      fileUploader.uploadId = this.upload.upload_id;
      fileUploader.fileId = preparedUploadFile.id;
      fileUploader.complete = preparedUploadFile.complete;
      fileUploader.missingChunkNumbers = preparedUploadFile.missing_chunks;
    }
  }

  public async setUpload(upload_or_upload_id: Upload | string) {
    if (typeof upload_or_upload_id === "string") {
      this.upload = await volateqApi.getUpload(upload_or_upload_id);
    } else {
      this.upload = upload_or_upload_id;
    }

    this.prepareFileUploaders();
  }

  protected async startUpload() {
    if (!this.upload) {
      throw new Error("No upload created or resumed")
    }
    if (this.fileUploaders.length === 0) {
      throw new Error("No files to upload");
    }
    if (this.fileUploaders.find(f => !f.fileId)) {
      throw new Error("Files not prepared for upload");
    }
    const invalidFilesSelection = this.getInvalidUploadFilesSelection();
    if (invalidFilesSelection.missingFiles.length > 0 || invalidFilesSelection.unknownFiles.length > 0) {
      throw new Error("Missing upload files or unknown upload files for resume upload")
    }

    this.event.emit(UploaderEvent.START_UPLOAD);

    let fileUploader: FileUploader | undefined;
    while ((fileUploader = this.fileUploaders.find(f => !f.complete)) !== undefined) {
      try {
        await this.tryUpload(fileUploader);
      } catch {
        let instantTries = 3;

        while (instantTries > 0) {
          try {
            await this.tryUpload(fileUploader);

            break;
          } catch {
            instantTries--;

            const waitingTime = 1000 * Math.abs(instantTries - 3);

            await waitFor(waitingTime);
          }
        }

        let erroring = true;
        while (erroring) {
          try {
            await this.refreshUpload();

            erroring = false;
          } catch (e) {
            this.emitError(e);

            const waitingTime = this.trials < 100 ? 10000 : 60000;

            await waitFor(waitingTime);
          }
        }
      }
    }
  }

  public async cancelUpload() {
    await volateqApi.cancelUpload(this.upload!.upload_id);

    this.upload = null;
    
    for (const fileUploader of this.fileUploaders) {
      fileUploader.unregisterEvents();
    }

    this.fileUploaders = [];
  }

  public async getMyUploadingUpload(): Promise<MyUploadingUpload | undefined> {
    return volateqApi.getMyUploadingUpload();
  }

  public getInvalidUploadFilesSelection(): { missingFiles: string[], unknownFiles: string[] } {
    if (!this.upload) {
      throw new Error("upload is undefined");
    }

    const invalidFilesSelection = { 
      missingFiles: this.upload.files
        .filter(f => !this.fileUploaders.find(fileUploader => fileUploader.fileName === f.name))
        .map(f => f.name), 
      unknownFiles: this.fileUploaders
        .filter(fileUploader => !this.upload!.files.find(f => f.name === fileUploader.fileName))
        .map(fileUploader => fileUploader.fileName),
    };

    return invalidFilesSelection;
  }

  private async tryUpload(uploadFile: FileUploader) {
    try {
      await uploadFile.upload();

      if (this.isUploadComplete()) {  
        this.event.emit(UploaderEvent.UPLOAD_COMPLETE);
      }
    } catch (e) {
      uploadFile.emitError();
      this.emitError(e);

      throw e;      
    }
  }

  private async refreshUpload() {
    if (!this.upload) {
      throw new Error("Upload is undefined");
    }

    await this.setUpload(this.upload.upload_id);
  }

  private isUploadComplete(): boolean {
    return !this.fileUploaders.find(f => !f.complete);
  }
}