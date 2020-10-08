import Vue from "vue"

export enum AppButtonEvents {
  stopLoading = "stop-loading",
  startLoading = "start-loading"
}

export class AppButtonEventBus extends Vue {
  onStopLoading(callbackFn: () => void) {
    this.$on(AppButtonEvents.stopLoading, callbackFn);
  }
  onStartLoading(callbackFn: () => void) {
    this.$on(AppButtonEvents.startLoading, callbackFn);
  }
  stopLoading() {
    this.$emit(AppButtonEvents.stopLoading);
  }
  startLoading() {
    this.$emit(AppButtonEvents.startLoading);
  }
}

const appButtonEventBus = new AppButtonEventBus();
export default appButtonEventBus;
