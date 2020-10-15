import Vue from "vue"

export interface AppContentAlert {
  variant: "success" | "danger" | "info" | undefined;
  msg: string | undefined;
}

export enum AppContentEvents {
  showAlert = "show-alert",
  clearAlert = "clear-alert",
}

export class AppContentEventBus extends Vue {
  onShowAlert(callbackFn: (alert: AppContentAlert) => void) {
    this.$on(AppContentEvents.showAlert, callbackFn);
  }
  onClearAlert(callbackFn: () => void) {
    this.$on(AppContentEvents.clearAlert, callbackFn);
  }
  showErrorAlert(msg: string) {
    this.showAlert({ msg, variant: "danger" });
  }
  showSuccessAlert(msg: string) {
    this.showAlert({ msg, variant: "success" });
  }
  showInfoAlert(msg: string) {
    this.showAlert({ msg, variant: "info" });
  }
  showAlert(appContentAlert: AppContentAlert) {
    this.$emit(AppContentEvents.showAlert, appContentAlert);
  }
  clearAlert() {
    this.$emit(AppContentEvents.clearAlert);
  }
}

const appContentEventBus = new AppContentEventBus();
export default appContentEventBus;
