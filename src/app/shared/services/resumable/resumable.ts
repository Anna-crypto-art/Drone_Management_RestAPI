import Vue from "vue"
import ResumableJs from "resumablejs";
import { IResumableFile, ResumableEvent, ResumableState } from "@/app/shared/services/resumable/types";
import store from "@/app/app-state";

export class Resumable extends Vue {
  private readonly resumable: ResumableJs;

  private state = ResumableState.UNPREPARED;
  private failedTimeout: any | undefined;

  private metadata: any | undefined;
  private eventsRegistered = false;

  constructor() {
    super();

    this.resumable = new ResumableJs({
      chunkSize: 1*1024*1024*5, // 5MB
      chunkRetryInterval: 1000, // 1sec
      simultaneousUploads: 1,
      headers: { "Authorization": `Bearer ${store.state.auth.token}`}
    });
  }

  public init(dropzoneId: string, browseButtonId?: string) {
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
    this.checkState([ResumableState.FAILED, ResumableState.UPLOADING, ResumableState.INITIALIZED])

    this.resumable.cancel();

    this.state = ResumableState.FINISHED;
  }

  public progress(): number {
    return this.resumable.progress();
  }

  public upload<T>(target: string, metadata?: T) {
    this.checkState([ResumableState.INITIALIZED, ResumableState.FAILED]);
    this.state = ResumableState.UPLOADING;

    this.metadata = metadata;

    this.resumable.opts.target = target;
    this.resumable.upload();
  }

  public getMetadata<T>(): T {
    return this.metadata;
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
      // So let's use "fileError"-Event instead 

      this.failedTimeout = setTimeout(() => {
        this.state = ResumableState.FAILED;

        this.$emit(ResumableEvent.FAILED, msg);
      }, 2000) // wait 2 secs for "fileRetry"-Event before fire

      this.$emit(ResumableEvent.FILE_ERROR, file, msg);
    });
    this.resumable.on("fileRetry", (file: any) => {
      if (this.failedTimeout) {
        clearTimeout(this.failedTimeout);
        this.failedTimeout = undefined;
      }

      this.$emit(ResumableEvent.FILE_RETRY, file);
    });
    this.resumable.on("fileAdded", (file: any) => {
      this.$emit(ResumableEvent.FILE_ADDED, file);
    });
    this.resumable.on("progress", () => {
      this.$emit(ResumableEvent.PROGRESS);
    });
    this.resumable.on("complete", () => {
      // Resumable does fire "completed"-Event even if the upload has failed
      if (!this.failedTimeout && this.state !== ResumableState.FAILED) {
        this.state = ResumableState.FINISHED;
        
        this.resumable.cancel();
        this.$emit(ResumableEvent.COMPLETED);
      }
    });

    this.eventsRegistered = true;
  }
}

const resumable = new Resumable();
export default resumable;