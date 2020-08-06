<template>
  <div class="app-login">
    <app-auth-container title="">
      <b-form @submit="onSubmit">
        <b-form-group :label="$t('email')" label-for="email">
          <b-form-input id="email" v-model="email" type="email" :placeholder="$t('email')" required></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('password')" label-for="password">
          <b-form-input id="password" v-model="password" type="password" :placeholder="$t('password')" required></b-form-input>
        </b-form-group>
        <b-button variant="primary" class="width-100pc" type="submit">{{ $t("login") }}</b-button>
      </b-form>
      <b-alert class="invalid-login-alert" v-model="show" variant="danger" dismissible>
        {{msg}}
      </b-alert>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import router from "../app-routes";
import AppAuthContainer from "./shared/components/auth-container.vue";
import volateqApi from "../shared/services/volateq-api/volateq-api";

@Component({
  name: "app-login",
  components: {
    AppAuthContainer,
  }
})
export default class AppLogin extends Vue {
  email = "";
  password = "";
  msg = "";
  show = false;

  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();

    try {
      await volateqApi.login(this.email, this.password);

      router.push({ name: "Home" })
    } catch (e) {
      this.msg = e.message;
      this.show = true;
    }
  }
}
</script>

<style>
.invalid-login-alert {
  margin-top: 1rem;
}
</style>