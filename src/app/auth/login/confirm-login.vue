<template>
  <div class="app-auth-confirm-login">
    <app-auth-container :title="$t('mfa')" :subtitle="$t('mfa-email_descr')">
      <b-form @submit.prevent="onSubmit">
        <b-form-group :label="$t('security-code')" label-for="securityCode">
          <b-form-input
            id="securityCode"
            v-model="securityCode"
            type="text"
            :placeholder="$t('security-code')"
            required
          ></b-form-input>
        </b-form-group>
        <app-button ref="submitButton" type="submit" cls="width-100pc" :loading="loading">{{ $t("login") }}</app-button>
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
import Vue from "vue";
import { Component } from "vue-property-decorator";

import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import authContainerEventBus from "@/app/auth/shared/components/auth-container-event-bus";
import { ApiErrors, ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-auth-confirm-login",
  components: {
    AppAuthContainer,
    AppButton,
  },
})
export default class AppAuthConfirmLogin extends Vue {
  loading = false;
  resendCodeLoading = false;
  securityCode = "";

  async onSubmit(e: Event): Promise<void> {
    try {
      this.loading = true;

      await volateqApi.confirmLogin(this.$route.params.confirmKey, this.securityCode);

      this.$router.push({ name: "Home" });
    } catch (e) {
      if ((e as any).error && (e as any).error === ApiErrors.RESOURCE_NOT_FOUND) {
        this.$router.push({ name: "Login" });
      }

      authContainerEventBus.showError(e as ApiException);
      this.loading = false;
    }
  }

  async resendSecurityCode(e: Event): Promise<void> {
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
