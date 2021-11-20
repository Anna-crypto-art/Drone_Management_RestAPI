import Vue from "vue"
import { ApiErrors, ApiException } from "../volateq-api/api-errors";

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
  showError(error: ApiException) {
    console.error(error);

    if (error && error.error) {
      this.showErrorAlert(error.error + (error.message && "<br><small>" + error.message + "</small>" || ""));
    } else {
      this.showErrorAlert(ApiErrors.SOMETHING_WENT_WRONG);
    }
  }
  clearAlert() {
    this.$emit(AppAlertEvents.clearAlert);
  }
}
