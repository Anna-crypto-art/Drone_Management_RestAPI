import Vue, { VNode } from "vue";
import { ApiErrors, ApiException } from "../../services/volateq-api/api-errors";

export abstract class BaseComponent extends Vue {
  protected setBrowserTitle(title?: string) {
    document.title = title ? title : "Volateq";
  }

  public showError(e: any) {
    console.error(e);
    
    let toastContent: VNode | string;

    if (e.error) {
      const error: ApiException = e;

      toastContent = this.$createElement("p", {}, [
        error.error,
        this.$createElement("br"),
        error.message && this.$createElement("small", {}, error.message) || "",
      ]);
    } else if (e instanceof Error) {
      toastContent = this.$createElement("p", {}, e.toString());
    } else if (typeof e === "string") {
      toastContent = e;
    } else {
      toastContent = this.$createElement("p", {}, ApiErrors.SOMETHING_WENT_WRONG);
    }

    this.$bvToast.toast(" ", {
      title: toastContent,
      variant: "danger",
      bodyClass: "base-toast-body",
      headerClass: "base-toast-header",
      toaster: "b-toaster-bottom-center",
      solid: true,
      noAutoHide: true,
    });
  }

  public showSuccess(msg: string) {
    this.$bvToast.toast(" ", {
      title: msg,
      variant: "success",
      bodyClass: "base-toast-body",
      headerClass: "base-toast-header",
      toaster: "b-toaster-bottom-center",
      solid: true,
    });
  }
}