import Vue from "vue"

export interface AppContentAlert {
  variant: "success" | "danger" | undefined;
  msg: string | undefined;
}

export enum AppContentEvents {
  showAlert = "show-alert",
}

export class AppContentEventBus extends Vue {
  onShowAlert(callbackFn: (alert: AppContentAlert) => void) {
    this.$on(AppContentEvents.showAlert, callbackFn);
  }
  showErrorAlert(msg: string) {
    this.showAlert({ msg, variant: "danger" });
  }
  showSuccessAlert(msg: string) {
    this.showAlert({ msg, variant: "success" });
  }
  showAlert(appContentAlert: AppContentAlert) {
    this.$emit(AppContentEvents.showAlert, appContentAlert);
  }
}

const appContentEventBus = new AppContentEventBus();
export default appContentEventBus;
