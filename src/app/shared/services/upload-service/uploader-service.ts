import { EventEmitter } from "events";
import { waitFor } from "../helper/debounce-helper";
import { ApiException } from "../volateq-api/api-errors";
import { CreateFileUpload } from "../volateq-api/api-requests/upload-requests";
import { Upload } from "../volateq-api/api-schemas/upload-schemas";
import volateqApi from "../volateq-api/volateq-api";
import { FileUploader } from "./file-uploader";
import { UploaderEvent } from "./types";


export abstract class UploaderService {
  private event = new EventEmitter();
  private fileUploaders: FileUploader[] = [];
  protected upload: Upload | null = null;

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

      this.fileUploaders.push(new FileUploader(file, securedFileName.secured_name, this.chunkSizeInMB));
    }
  }

  public removeFile(fileName: string): void {
    const removeFileIndex = this.fileUploaders.findIndex(file => file.fileName === fileName);
    if (removeFileIndex !== -1) {
      this.fileUploaders.splice(removeFileIndex, 0);
    }
  }

  public onError(onErrorCallback: (ex: ApiException) => void) {
    this.event.on(UploaderEvent.ERROR, onErrorCallback);
  }

  public abstract doUpload(): Promise<void>;

  protected getCreateUploadFiles(): CreateFileUpload[] {
    return this.fileUploaders.map(f => ({ name: f.fileName, size: f.file.size }));
  }

  protected prepareFiles(upload: Upload) {
    for (const uploadFile of this.fileUploaders) {
      const preparedUploadFile = upload.files.find(f => f.name == uploadFile.fileName);
      if (!preparedUploadFile) {
        throw new Error("File mapping error");
      }

      uploadFile.uploadId = upload.upload_id;
      uploadFile.fileId = preparedUploadFile.id;
      uploadFile.complete = preparedUploadFile.complete;
      uploadFile.missingChunkNumbers = preparedUploadFile.missing_chunks;
    }
  }

  protected setUpload(upload: Upload) {
    this.prepareFiles(upload);
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

    let fileUploader: FileUploader | undefined;
    while ((fileUploader = this.fileUploaders.find(f => !f.complete)) !== undefined) {
      try {
        await this.tryUpload(fileUploader);

        this.event.emit(UploaderEvent.UPLOAD_PROGRESS);
      } catch {
        let instantTries = 3;

        while (instantTries > 0) {
          try {
            await this.tryUpload(fileUploader);

            this.event.emit(UploaderEvent.UPLOAD_PROGRESS);

            break;
          } catch {
            instantTries--;

            await waitFor(1000 * Math.abs(instantTries - 3));
          }
        }

        let erroring = true;
        while (erroring) {
          try {
            this.refreshUpload();

            erroring = false;
          } catch (e) {
            this.event.emit(UploaderEvent.ERROR, e);

            await waitFor(10000);
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


  private async tryUpload(uploadFile: FileUploader) {
    try {
      await uploadFile.upload();
    } catch (e) {
      uploadFile.emitError();
      this.event.emit(UploaderEvent.ERROR, e);

      throw e;      
    }
  }

  private async refreshUpload() {
    this.upload = await volateqApi.getUpload(this.upload!.upload_id);
    this.prepareFiles(this.upload);
  }
}