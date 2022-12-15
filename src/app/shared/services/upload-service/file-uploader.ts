import { EventEmitter } from "events";
import volateqApi from "../volateq-api/volateq-api";
import { UploaderEvent } from "./types";


export class FileUploader {
  private event = new EventEmitter();
  
  public complete = false;
  public uploadId: string | null = null;
  public fileId: string | null = null;
  public missingChunkNumbers: number[] = [];
  
  constructor(
    public readonly file: File,
    public readonly fileName: string,
    private readonly chunkSizeInMB: number,
  ) {}

  public onProgress(progressCallback: (progress: number) => void) {
    this.event.on(UploaderEvent.FILE_PROGRESS, progressCallback);
  }

  public onChunkComplete(chunkCompleteCallback: () => void) {
    this.event.on(UploaderEvent.FILE_CHUNK_COMPLETE, chunkCompleteCallback);
  }

  public onComplete(completeCallback: () => void) {
    this.event.on(UploaderEvent.FILE_COMPLETE, completeCallback);
  }

  public onError(errorCallback: () => void) {
    this.event.on(UploaderEvent.ERROR, errorCallback);
  }

  private emitProgress(progress: number) {
    this.event.emit(UploaderEvent.FILE_PROGRESS, progress);
  }

  private emitComplete() {
    this.event.emit(UploaderEvent.FILE_COMPLETE);
  }

  public emitError() {
    this.event.emit(UploaderEvent.ERROR);
  }

  private emitChunkComplete() {
    this.event.emit(UploaderEvent.FILE_CHUNK_COMPLETE);
  }

  public fileUploadCompleted() {
    this.complete = true;

    this.emitComplete();
  }

  public get size(): number {
    return this.file.size;
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
      if (chunkNumber === false) {
        break;
      }

      offsetIndex = chunkNumber - 1;

      const start = offsetIndex * chunkSize;
      let end = chunkNumber * chunkSize;      
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
          const fileProgress = Math.round((progress.loaded / progress.total) * ((end - start) / fileSize) * 100);
          this.emitProgress(fileProgress);
        }
      );

      this.emitChunkComplete();

      this.removeChunkNumber();

      offsetIndex++;
    }

    this.fileUploadCompleted();
  }

  public unregisterEvents() {
    this.event.removeAllListeners();
  }

  private getNextChunkNumber(lastChunkNumber: number): number | false {
    if (this.missingChunkNumbers.length > 0) {
      let nextChunkNumber = this.missingChunkNumbers[0];

      if (nextChunkNumber === -1) {
        nextChunkNumber = lastChunkNumber + 1;

        if (nextChunkNumber > this.maxChunks) {
          return false;
        }

        this.missingChunkNumbers.unshift(nextChunkNumber);
      }

      return nextChunkNumber
    }

    return false;
  }

  private removeChunkNumber() {
    if (this.missingChunkNumbers.length > 0) {
      const nextChunkNumber = this.missingChunkNumbers[0];

      if (nextChunkNumber !== -1) {
        this.missingChunkNumbers.splice(0, 1);
      }
    }
  }

  private get maxChunks(): number {
    const chunkSize = this.chunkSizeInMB * 1024 * 1024;
    const fileSize = this.file.size

    return Math.ceil(fileSize / chunkSize);
  }
}