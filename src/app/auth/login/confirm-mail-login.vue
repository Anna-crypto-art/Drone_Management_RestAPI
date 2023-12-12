<template>
  <div class="app-auth-confirm-mail-login">
    <app-auth-container :title="$t('mfa')" :subtitle="$t('mfa-email_descr')">
      <b-form @submit.prevent="onSubmit">
        <app-security-code :authMethod="0" v-model="securityCode" />
        <app-button ref="submitButton" type="submit" cls="width-100pc" :loading="loading">{{ $t("verify") }}</app-button>
      </b-form>
      <hr />
      <app-button
        type="button"
        cls="width-100pc"
        variant="secondary"
        :loading="resendCodeLoading"
        @click="resendSecurityCode"
        >{{ $t("resend-security-code") }}</app-button
      >
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AppAuthContainer from "@/app/shared/components/app-auth-container/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSecurityCode from "@/app/shared/components/app-security-code/app-security-code.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import authContainerEventBus from "@/app/shared/components/app-auth-container/auth-container-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { ConfirmLoginComponent } from "./confirm-login-component";
import { UserAuthMethod } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";

@Component({
  name: "app-auth-confirm-mail-login",
  components: {
    AppAuthContainer,
    AppButton,
    AppSecurityCode,
  },
})
export default class AppAuthConfirmMailLogin extends ConfirmLoginComponent {
  loading = false;
  resendCodeLoading = false;
  securityCode = "";

  async onSubmit(): Promise<void> {
    await this.confirmLogin(UserAuthMethod.EMAIL);
  }

  async resendSecurityCode(): Promise<void> {
    try {
      this.resendCodeLoading = true;

      await volateqApi.resendSecurityCode(this.$route.params.confirmKey);

      authContainerEventBus.showSuccessAlert(this.$t("resend-security-code-success").toString());
    } catch (e) {
      authContainerEventBus.showError(e as ApiException);
    } finally {
      this.resendCodeLoading = false;
    }
  }
}
</script>

<style lang="scss"></style>
