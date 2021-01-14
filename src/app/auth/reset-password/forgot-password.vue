<template>
  <div class="app-auth-forgot-password">
    <app-auth-container :title="$t('forgot-password')" :subtitle="$t('forgot-password_descr')">
      <b-form @submit.prevent="onSubmit">
        <b-form-group :label="$t('email')" label-for="email">
          <b-form-input id="email" v-model="email" type="email" required :placeholder="$t('email')"></b-form-input>
        </b-form-group>
        <app-button type="submit" cls="width-100pc">{{ $t("send") }}</app-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import authContainerEventBus from "@/app/auth/shared/components/auth-container-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

@Component({
  name: "app-auth-forgot-password",
  components: {
    AppAuthContainer,
    AppButton
  }
})
export default class AppAuthForgotPassword extends Vue {
  email = "";

  async onSubmit(): Promise<void> {
    try {
      appButtonEventBus.startLoading();

      await volateqApi.forgotPassword(this.email);

      authContainerEventBus.showSuccessAlert(this.$t('request-sent').toString())
    } catch (e) {
      authContainerEventBus.showErrorAlert(e.message);
    } finally {
      appButtonEventBus.stopLoading();
    }
  }
}
</script>

<style lang="scss">
</style>