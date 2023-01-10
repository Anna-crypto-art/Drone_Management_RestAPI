<template>
  <div class="app-auth-register">
    <app-auth-container v-if="confirmationKey">
      <b-form @submit.prevent="onSubmit">
        <app-setup-totp :confirmationKey="confirmationKey" v-model="securityCode" />
        
        <app-button type="submit" :loading="loading">{{ $t('verify') }}</app-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSetupTotp from "@/app/shared/components/app-setup-totp/app-setup-totp.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";

@Component({
  name: "app-register-setup-totp",
  components: {
    AppAuthContainer,
    AppButton,
    AppSetupTotp,
  },
})
export default class AppRegisterSetupTotp extends BaseComponent {
  confirmationKey: string | null = null;
  securityCode: string | null = null;

  loading = false;

  created() {
    this.confirmationKey = this.$route.params.confirmKey;
  }

  @CatchError('loading')
  async onSubmit() {
    await volateqApi.verifyTotpCode(this.confirmationKey!, this.securityCode!);

    this.showSuccess(this.$t('totp-verify-success').toString());

    this.$router.push({ name: "Login" });
  }
      
}
</script>

<style lang="scss"></style>
