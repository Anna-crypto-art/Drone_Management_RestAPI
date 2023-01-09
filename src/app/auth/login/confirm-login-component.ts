import { ApiErrors, ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { UserAuthMethod } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import Vue from "vue";
import authContainerEventBus from "../shared/components/auth-container-event-bus";

export abstract class ConfirmLoginComponent extends Vue {
  protected abstract securityCode: string;
  protected abstract loading: boolean;

  protected async confirmLogin(authMethod: UserAuthMethod) {
    try {
      this.loading = true;

      if (authMethod === UserAuthMethod.EMAIL) {
        await volateqApi.confirmMailLogin(this.$route.params.confirmKey, this.securityCode);
      }
      else if (authMethod === UserAuthMethod.TOTP) {
        await volateqApi.confirmTotpLogin(this.$route.params.confirmKey, this.securityCode);
      }

      if (this.$route.query.dest && typeof this.$route.query.dest === "string") {
        this.$router.push({ path: this.$route.query.dest });
      } else {
        this.$router.push({ name: "Home" });
      }
    } catch (e) {
      if ((e as any).error && (e as any).error === ApiErrors.RESOURCE_NOT_FOUND) {
        this.$router.push({ name: "Login" });
      }

      authContainerEventBus.showError(e as ApiException);
      this.loading = false;
    }
  }
}