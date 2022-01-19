import ResumableJs from "resumablejs";
import { IResumableFile, IUploadService, UploadEvent, UploadState } from "@/app/shared/services/upload-service/types";
import store from "@/app/app-state";
import UploadEventBus from "./upload-event-bus";

export class UploadService implements IUploadService {
  private readonly resumable: ResumableJs;

  private readonly maxRetries = 5;
  private readonly chunkRetryInterval = 3000; // 3 seconds
  private readonly failedTimeoutInterval = 4000; // chunkRetryInterval + 1 second

  private state = UploadState.UNPREPARED;
  private failedTimeout: any | undefined;
  private retries = 0;
  private currentProgress = 0;

  private metadata: any | undefined;
  private eventsRegistered = false;

  constructor() {
    this.resumable = new ResumableJs({
      chunkSize: 1 * 1024 * 1024 * 10, // 10MB
      chunkRetryInterval: this.chunkRetryInterval,
      simultaneousUploads: 1,
      maxChunkRetries: this.maxRetries,
    });
  }

  public init(dropzoneId: string, browseButtonId?: string) {
    this.checkState([UploadState.UNPREPARED, UploadState.INITIALIZED, UploadState.FINISHED]);
    this.initValues();
    this.registerEvents();

    const el = document.getElementById(dropzoneId);
    if (!el) {
      throw new Error(`No HTML-Element found with id='${dropzoneId}'`);
    }
    this.resumable.assignDrop(el);

    if (browseButtonId) {
      const browseBtnEl = document.getElementById(browseButtonId);
      if (!browseBtnEl) {
        throw new Error(`No HTML-Element found with id='${browseButtonId}'`);
      }
      this.resumable.assignBrowse(browseBtnEl, false);
    }

    this.state = UploadState.INITIALIZED;
  }

  public reset() {
    this.checkState([UploadState.FINISHED]);
    this.initValues();
    this.state = UploadState.INITIALIZED;
  }

  public hasState(state: UploadState): boolean {
    return this.state === state;
  }

  public get files(): IResumableFile[] {
    return this.resumable.files;
  }

  public cancel() {
    this.checkState([UploadState.FAILED, UploadState.UPLOADING, UploadState.INITIALIZED]);

    this.resumable.cancel();

    this.state = UploadState.FINISHED;

    this.reset();
  }

  public progress(): number {
    return this.currentProgress;
  }

  public upload<T>(target: string, metadata?: T) {
    this.checkState([UploadState.INITIALIZED, UploadState.FAILED]);
    this.state = UploadState.UPLOADING;

    this.metadata = metadata;

    this.resumable.opts.target = target;
    this.resumable.upload();
  }

  public getMetadata<T>(): T {
    return this.metadata;
  }

  public on(event: UploadEvent, callbackFn: any) {
    UploadEventBus.on(event, callbackFn);
  }

  public emitFileRemoved(file: IResumableFile) {
    this.emit(UploadEvent.FILE_REMOVED, file);
  }

  public getMaxRetries() {
    return this.files.filter(file => !file.isComplete()).length * this.maxRetries;
  }

  private emit(event: UploadEvent, ...args: any[]) {
    UploadEventBus.emit(event, args);
  }

  private initValues() {
    this.resumable.opts.headers = { Authorization: `Bearer ${store.state.auth.token}` };
    this.metadata = undefined;
    this.currentProgress = 0;
  }

  private checkState(states: UploadState | UploadState[]) {
    if (!Array.isArray(states)) {
      states = [states];
    }

    if (states.indexOf(this.state) === -1) {
      throw new Error("Invalid operation. Resumable is in state: " + this.state);
    }
  }

  private onProgress() {
    // Resumable fires progress event after completed event...
    const progress = this.resumable.progress();
    if (this.currentProgress !== progress && !this.hasState(UploadState.FINISHED)) {
      this.currentProgress = progress;

      this.state = UploadState.UPLOADING;
      this.emit(UploadEvent.PROGRESS);
    }
  }
  private onRetry(file: IResumableFile) {
    if (this.failedTimeout) {
      clearTimeout(this.failedTimeout);
      this.failedTimeout = undefined;
    }

    this.state = UploadState.RETRYING;
    this.emit(UploadEvent.FILE_RETRY, file, ++this.retries);
  }
  private onFailed(msg: string) {
    this.state = UploadState.FAILED;
    this.emit(UploadEvent.FAILED, msg);
  }
  private onCompleted() {
    // Resumable does fire "completed"-Event even if the upload has failed
    if (!this.failedTimeout && !this.hasState(UploadState.FAILED)) {
      this.state = UploadState.FINISHED;
      this.resumable.cancel();
      this.emit(UploadEvent.COMPLETED, this.metadata);

      this.reset();
    }
  }
  private onFileSuccess(file: any) {
    this.emit(UploadEvent.FILE_SUCCESS, file);
  }
  private onFileProgress(file: any) {
    this.emit(UploadEvent.FILE_PROGRESS, file);
  }
  private onFileError(file: any, msg: string) {
    // Resumable does not fire "error"-Event reliably
    // So let's use "fileError"-Event additionaly

    this.failedTimeout = setTimeout(() => {
      this.onFailed(msg);
    }, this.failedTimeoutInterval); // wait for "fileRetry"-Event before fire

    this.emit(UploadEvent.FILE_ERROR, file, msg);
  }
  private onFileAdded(file: any) {
    this.emit(UploadEvent.FILE_ADDED, file);
  }

  private registerEvents() {
    if (this.eventsRegistered) {
      return;
    }

    this.resumable.on("fileSuccess", (file: any) => {
      this.onFileSuccess(file);
    });
    this.resumable.on("fileProgress", (file: any) => {
      this.onFileProgress(file);
    });
    this.resumable.on("fileError", (file: any, msg: string) => {
      this.onFileError(file, msg);
    });
    this.resumable.on("fileRetry", (file: any) => {
      this.onRetry(file);
    });
    this.resumable.on("fileAdded", (file: any) => {
      this.onFileAdded(file);
    });
    this.resumable.on("progress", () => {
      this.onProgress();
    });
    this.resumable.on("complete", () => {
      this.onCompleted();
    });
    this.resumable.on("error", (msg: string) => {
      this.onFailed(msg);
    });

    this.eventsRegistered = true;
  }
}

const uploadService: IUploadService = new UploadService();
export default uploadService;
