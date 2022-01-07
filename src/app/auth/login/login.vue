<template>
  <div class="app-auth-login">
    <app-auth-container title="">
      <b-form @submit.prevent="onSubmit">
        <b-form-group :label="$t('email')" label-for="email">
          <b-form-input id="email" v-model="email" type="email" :placeholder="$t('email')" required></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('password')" label-for="password">
          <b-form-input id="password" v-model="password" type="password" :placeholder="$t('password')" required></b-form-input>
          <router-link :to="{ name: 'ForgotPassword' }" class="input-info-link">{{ $t("forgot-password") }}</router-link>
        </b-form-group>
        <app-button type="submit" cls="width-100pc">{{ $t("login") }}</app-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import authContainerEventBus from "@/app/auth/shared/components/auth-container-event-bus";
import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "app-auth-login",
  components: {
    AppAuthContainer,
    AppButton,
  },
})
export default class AppAuthLogin extends Vue {
  email = "";
  password = "";

  async onSubmit() {
    try {
      appButtonEventBus.startLoading();

      const confirmationKey = await volateqApi.login(this.email, this.password);

      this.$router.push({
        name: "ConfirmLogin",
        params: { confirmKey: confirmationKey },
      });
    } catch (e) {
      authContainerEventBus.showErrorAlert(e.message);
      appButtonEventBus.stopLoading();
    }
  }
}
</script>

<style lang="scss"></style>
