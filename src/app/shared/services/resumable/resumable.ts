import Vue from "vue"
import ResumableJs from "resumablejs";
import { IResumableFile, ResumableEvent, ResumableState } from "@/app/shared/services/resumable/types";
import store from "@/app/app-state";

export class Resumable extends Vue {
  private readonly resumable: ResumableJs;

  private readonly failedTimeoutInterval = 4000;
  private readonly maxRetries = 100;
  private readonly chunkRetryInterval = 3000;

  private state = ResumableState.UNPREPARED;
  private failedTimeout: any | undefined;
  private retries = 0;
  private currentProgress = 0;

  private metadata: any | undefined;
  private eventsRegistered = false;

  constructor() {
    super();

    this.resumable = new ResumableJs({
      chunkSize: 1*1024*1024*10, // 10MB
      chunkRetryInterval: this.chunkRetryInterval,
      simultaneousUploads: 1,
      maxChunkRetries: this.maxRetries,
    });
  }

  public init(dropzoneId: string, browseButtonId?: string) {
    this.resumable.opts.headers = { "Authorization": `Bearer ${store.state.auth.token}`};

    this.checkState([ResumableState.UNPREPARED, ResumableState.INITIALIZED, ResumableState.FINISHED]);    

    this.metadata = undefined;

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

    this.state = ResumableState.INITIALIZED;
  }

  public hasState(state: ResumableState) {
    return this.state === state;
  }

  public get files(): IResumableFile[] {
    return this.resumable.files;
  }

  public cancel() {
    this.checkState([ResumableState.FAILED, ResumableState.UPLOADING, ResumableState.INITIALIZED, ResumableState.PAUSED])

    this.resumable.cancel();

    this.state = ResumableState.FINISHED;
  }

  public progress(): number {
    return this.currentProgress;
  }

  public upload<T>(target: string, metadata?: T) {
    this.checkState([ResumableState.INITIALIZED, ResumableState.FAILED, ResumableState.PAUSED]);
    this.state = ResumableState.UPLOADING;

    this.metadata = metadata;

    this.resumable.opts.target = target;
    this.resumable.upload();
  }

  public getMetadata<T>(): T {
    return this.metadata;
  }

  public pause() {
    this.checkState([ResumableState.UPLOADING, ResumableState.RETRYING]);
    this.state = ResumableState.PAUSED;

    this.resumable.pause();
  }

  public on(event: ResumableEvent, callbackFn: any) {
    this.$on(event, callbackFn);
  }

  private checkState(states: ResumableState | ResumableState[]) {
    if (!Array.isArray(states)) {
      states = [states];
    }

    if (states.indexOf(this.state) === -1) {
      throw new Error("Invalid operation. Resumable is in state: " + this.state);
    }
  }

  private onProgress() {
    this.state = ResumableState.UPLOADING;
    this.$emit(ResumableEvent.PROGRESS);
  }
  private onRetry(file: IResumableFile) {
    this.state = ResumableState.RETRYING;
    this.$emit(ResumableEvent.FILE_RETRY, file, ++this.retries, this.maxRetries);
  }
  private onFailed(msg: string) {
    this.state = ResumableState.FAILED;
    this.$emit(ResumableEvent.FAILED, msg);
  }
  private onCompleted() {
    this.state = ResumableState.FINISHED;
    this.resumable.cancel();
    this.$emit(ResumableEvent.COMPLETED);
  }

  private registerEvents() {
    if (this.eventsRegistered) {
      return;
    }

    this.resumable.on("fileSuccess", (file: any) => {
      this.$emit(ResumableEvent.FILE_SUCCESS, file);
    });
    this.resumable.on("fileProgress", (file: any) => {
      this.$emit(ResumableEvent.FILE_PROGRESS, file);
    });
    this.resumable.on("fileError", (file: any, msg: string) => {
      // Resumable does not fire "error"-Event reliably
      // So let's use "fileError"-Event additionaly

      this.failedTimeout = setTimeout(() => {
        this.onFailed(msg);
      }, this.failedTimeoutInterval) // wait for "fileRetry"-Event before fire

      this.$emit(ResumableEvent.FILE_ERROR, file, msg);
    });
    this.resumable.on("fileRetry", (file: any) => {
      if (this.failedTimeout) {
        clearTimeout(this.failedTimeout);
        this.failedTimeout = undefined;
      }

      this.onRetry(file);
    });
    this.resumable.on("fileAdded", (file: any) => {
      this.$emit(ResumableEvent.FILE_ADDED, file);
    });
    this.resumable.on("progress", () => {
      // Resumable fires "progress"-Event even if the current chunk upload has failed.. so that's not a real progress, isn't it?
      const progress = this.resumable.progress();
      if (this.currentProgress !== progress) {
        this.currentProgress = progress;

        this.onProgress();
      }
    });
    this.resumable.on("complete", () => {
      // Resumable does fire "completed"-Event even if the upload has failed
      if (!this.failedTimeout && this.state !== ResumableState.FAILED) {
        this.onCompleted();
      }
    });
    this.resumable.on("error", (msg: string) => {
      this.onFailed(msg);
    });

    this.eventsRegistered = true;
  }
}

const resumable = new Resumable();
export default resumable;