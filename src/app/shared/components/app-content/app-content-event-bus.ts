import Vue from "vue"

export interface AppContentAlert {
  variant: "success" | "danger" | "info" | "warning" | undefined;
  msg: string | undefined;
  id?: string;
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
  showErrorAlert(msg: string, id?: string) {
    this.showAlert({ msg, variant: "danger", id });
  }
  showSuccessAlert(msg: string, id?: string) {
    this.showAlert({ msg, variant: "success", id });
  }
  showInfoAlert(msg: string, id?: string) {
    this.showAlert({ msg, variant: "info", id });
  }
  showWarningAlert(msg: string, id?: string) {
    this.showAlert({ msg, variant: "warning", id });
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
