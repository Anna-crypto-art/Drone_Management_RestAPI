<template>
  <div class="app-auth-login">
    <app-auth-container title="">
      <b-form @submit="onSubmit" ref="loginForm">
        <b-form-group :label="$t('email')" label-for="email">
          <b-form-input id="email" v-model="email" type="email" :placeholder="$t('email')" required></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('password')" label-for="password">
          <b-form-input id="password" v-model="password" type="password" :placeholder="$t('password')" required></b-form-input>
        </b-form-group>
        <app-button type="submit" cls="width-100pc" :parentForm="loginForm">{{ $t("login") }}</app-button>
      </b-form>
      <b-alert class="invalid-login-alert" v-model="show" variant="danger" dismissible>
        {{msg}}
      </b-alert>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";

import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";

@Component({
  name: "app-login",
  components: {
    AppAuthContainer,
    AppButton,
  }
})
export default class AppAuthLogin extends Vue {
  @Ref() loginForm!: HTMLFormElement;
  
  email = "";
  password = "";
  msg = "";
  show = false;

  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();

    try {
      await volateqApi.login(this.email, this.password);

      this.$router.push({ name: "Home" })
    } catch (e) {
      this.msg = e.message;
      this.show = true;

      appButtonEventBus.stopLoading();
    }
  }
}
</script>

<style lang="scss">
.app-auth-login {
  .invalid-login-alert {
    margin-top: 1rem;
  }
}
</style>