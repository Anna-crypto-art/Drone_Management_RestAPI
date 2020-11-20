import Vue from "vue";
import { UploadEvent } from "./types";

export class UploadEventBus extends Vue {
  emit(event: UploadEvent, args: any) {
    this.$emit(event, ...args);
  }
  on(event: UploadEvent, callbackFn: any) {
    this.$on(event, callbackFn);
  }
}

const uploadEventBus = new UploadEventBus();
export default uploadEventBus;