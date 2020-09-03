import Vue from "vue"

export enum AppButtonEvents {
  stopLoading = "stop-loading",
}

export class AppButtonEventBus extends Vue {
  onStopLoading(callbackFn: () => void) {
    this.$on(AppButtonEvents.stopLoading, callbackFn);
  }
  stopLoading() {
    this.$emit(AppButtonEvents.stopLoading);
  }
}

const appButtonEventBus = new AppButtonEventBus();
export default appButtonEventBus;
