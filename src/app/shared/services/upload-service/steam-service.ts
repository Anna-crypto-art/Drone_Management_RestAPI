import { EventEmitter } from "events";
import { transformExtentWithOptions } from "ol/format/Feature";
import { ApiException } from "../volateq-api/api-errors";
import { CreateFileUpload } from "../volateq-api/api-requests/upload-requests";
import { Upload } from "../volateq-api/api-schemas/upload-schemas";
import volateqApi from "../volateq-api/volateq-api";


export class UploadFile {
  private event = new EventEmitter();
  
  public complete: boolean = false;
  public uploadId: string | null = null;
  public fileId: string | null = null;
  public missingChunkNumbers: number[] = [];
  
  constructor(
    public readonly file: File,
    public readonly fileName: string,
    private readonly chunkSizeInMB: number,
  ) {}

  public onProgress(progressCallback: (progress: number) => void) {
    this.event.on(UploadEvent.FILE_PROGRESS, progressCallback);
  }

  public onComplete(completeCallback: () => void) {
    this.event.on(UploadEvent.FILE_COMPLETE, completeCallback);
  }

  public onError(errorCallback: () => void) {
    this.event.on(UploadEvent.ERROR, errorCallback);
  }

  private emitProgress(progress: number) {
    this.event.emit(UploadEvent.FILE_PROGRESS, progress);
  }

  private emitComplete() {
    this.event.emit(UploadEvent.FILE_COMPLETE);
  }

  public emitError() {
    this.event.emit(UploadEvent.ERROR);
  }

  public fileUploadCompleted() {
    this.complete = true;

    this.emitComplete();
  }

  public async upload() {
    if (this.complete) {
      this.fileUploadCompleted();

      return;
    }

    const chunkSize = this.chunkSizeInMB * 1024 * 1024;
    const fileSize = this.file.size

    let offsetIndex = 0;
    let eof = false;
    while (!eof) {
      const chunkNumber = this.getNextChunkNumber(offsetIndex);
      offsetIndex = chunkNumber - 1;

      const start = offsetIndex * chunkSize;
      let end = start * chunkSize;

      if (end >= fileSize) {
        eof = true;
        end = fileSize;
      }

      const fileChunk = this.file.slice(start, end);

      await volateqApi.uploadFileChunk(
        this.uploadId!,
        fileChunk,
        this.fileId!,
        offsetIndex + 1,
        (progress) => {
          const fileProgress = Math.ceil(progress.loaded * (end - start) / fileSize);
          this.emitProgress(fileProgress);
        }
      );

      this.removeChunkNumber();
    }

    this.fileUploadCompleted();
  }

  private getNextChunkNumber(lastChunkNumber: number): number {
    if (this.missingChunkNumbers.length > 0) {
      const nextChunkNumber = this.missingChunkNumbers[0];

      if (nextChunkNumber === -1) {
        return lastChunkNumber + 1;
      }

      return nextChunkNumber
    }

    return lastChunkNumber + 1;
  }

  private removeChunkNumber() {
    if (this.missingChunkNumbers.length > 0) {
      const nextChunkNumber = this.missingChunkNumbers[0];

      if (nextChunkNumber !== -1) {
        this.missingChunkNumbers.splice(0, 1);
      }
    }
  }
}

export enum UploadEvent {
  FILE_PROGRESS = "UPLOAD_FILE_PROGRESS",
  FILE_COMPLETE = "FILE_COMPLETE",
  ERROR = "UPLOAD_ERROR",
  UPLOAD_PROGRESS = "UPLOAD_PROGRESS",
}


export abstract class SteamService {
  private event = new EventEmitter();
  private uploadFiles: UploadFile[] = [];
  protected upload: Upload | null = null;

  constructor(
    public readonly chunkSizeInMB = 100
  ) {
    // constructor
  }

  public async addFiles(files: File[]): Promise<void> {
    const securedFileNames = await volateqApi.getSecuredFilenames(files.map(f => f.name));

    for (const securedFileName of securedFileNames) {
      const file = files.find(f => f.name === securedFileName.original_name);
      if (!file) {
        throw new Error("File mapping error");
      }

      this.uploadFiles.push(new UploadFile(file, securedFileName.secured_name, this.chunkSizeInMB));
    }
  }

  public onError(onErrorCallback: (ex: ApiException) => void) {
    this.event.on(UploadEvent.ERROR, onErrorCallback);
  }

  protected getCreateUploadFiles(): CreateFileUpload[] {
    return this.uploadFiles.map(f => ({ name: f.fileName, size: f.file.size }));
  }

  protected prepareFiles(upload: Upload) {
    for (const uploadFile of this.uploadFiles) {
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

  public async startUpload() {
    if (!this.upload) {
      throw new Error("No upload created or resumed")
    }
    if (this.uploadFiles.length === 0) {
      throw new Error("No files to upload");
    }
    if (this.uploadFiles.find(f => !f.fileId)) {
      throw new Error("Files not prepared for upload");
    }

    let uploadFile;
    while ((uploadFile = this.uploadFiles.find(f => !f.complete)) !== undefined) {
      try {
        await this.tryUpload(uploadFile);

        this.event.emit(UploadEvent.UPLOAD_PROGRESS);
      } catch (e) {
        let instantTries = 3;

        while (instantTries-- > 0) {
          try {
            await this.tryUpload(uploadFile);
          } catch {
            // keep retrying
          }
        }

        let erroring = true;
        while (erroring) {
          try {
            this.refreshUpload();

            erroring = false;
          } catch (e) {
            this.event.emit(UploadEvent.ERROR, e);
          }
        }
      }
    }
  }

  private async tryUpload(uploadFile: UploadFile) {
    try {
      await uploadFile.upload();
    } catch (e) {
      uploadFile.emitError();
      this.event.emit(UploadEvent.ERROR, e);

      throw e;      
    }
  }

  private async refreshUpload() {
    this.upload = await volateqApi.getUpload(this.upload!.upload_id);
    this.prepareFiles(this.upload);
  }
}