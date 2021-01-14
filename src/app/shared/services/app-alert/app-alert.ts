import Vue from "vue"

export interface AppAlert {
  variant: "success" | "danger" | "info" | "warning" | undefined;
  msg: string | undefined;
  id?: string;
}

export enum AppAlertEvents {
  showAlert = "show-alert",
  clearAlert = "clear-alert",
}

export class AppAlertEventBus extends Vue {
  onShowAlert(callbackFn: (alert: AppAlert) => void) {
    this.$on(AppAlertEvents.showAlert, callbackFn);
  }
  onClearAlert(callbackFn: () => void) {
    this.$on(AppAlertEvents.clearAlert, callbackFn);
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
  showAlert(appAlert: AppAlert) {
    this.$emit(AppAlertEvents.showAlert, appAlert);
  }
  clearAlert() {
    this.$emit(AppAlertEvents.clearAlert);
  }
}
