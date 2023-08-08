<template>
  <div class="app-auth-confirm-login">
    <app-auth-container :title="$t('mfa')" :subtitle="$t('mfa-totp_descr')">
      <b-form @submit.prevent="onSubmit">
        <app-security-code :authMethod="1" v-model="securityCode" />
        <app-button ref="submitButton" type="submit" cls="width-100pc" :loading="loading">{{ $t("verify") }}</app-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AppAuthContainer from "@/app/shared/components/app-auth-container/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSecurityCode from "@/app/shared/components/app-security-code/app-security-code.vue";
import { ConfirmLoginComponent } from "./confirm-login-component";
import { UserAuthMethod } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";

@Component({
  name: "app-auth-confirm-totp-login",
  components: {
    AppAuthContainer,
    AppButton,
    AppSecurityCode,
  },
})
export default class AppAuthConfirmTotpLogin extends ConfirmLoginComponent {
  loading = false;
  securityCode = "";

  async onSubmit(e: Event): Promise<void> {
    await this.confirmLogin(UserAuthMethod.TOTP);
  }
}
</script>

<style lang="scss"></style>
