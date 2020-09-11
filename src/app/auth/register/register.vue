<template>
  <div class="app-auth-register">
    <app-auth-container title="">
      <div v-if="hasUser">
        <b-form @submit="onSubmit">
          <div v-show="company">
            <b-form-group :label="$t('company')" label-for="company">
              <b-form-input id="company" v-model="company" disabled></b-form-input>
            </b-form-group>
          </div>
          <b-form-group :label="$t('email')" label-for="email">
            <b-form-input id="email" v-model="email" type="email" disabled></b-form-input>
          </b-form-group>
          <b-form-group :label="$t('first-name')" label-for="first-name">
            <b-form-input id="first-name" v-model="user.first_name" required></b-form-input>
          </b-form-group>
          <b-form-group :label="$t('last-name')" label-for="last-name">
            <b-form-input id="last-name" v-model="user.last_name" required></b-form-input>
          </b-form-group>
          <b-form-group :label="$t('password')" label-for="password">
            <b-form-input id="password" v-model="user.password" type="password" :placeholder="$t('password')" required></b-form-input>
          </b-form-group>
          <b-form-group :label="$t('repeat-password')" label-for="repeat-password">
            <b-form-input id="repeat-password" v-model="user.repeat_password" type="password" :placeholder="$t('repeat-password')" required></b-form-input>
          </b-form-group>
          <app-button type="submit" cls="width-100pc">{{ $t("register") }}</app-button>
        </b-form>
      </div>
      <b-alert class="invalid-register-alert" v-model="alertVisible" variant="danger" dismissible>
        {{ alertMsg }}
      </b-alert>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { RegisterUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";

@Component({
  name: "app-auth-register",
  components: {
    AppAuthContainer,
    AppButton,
  }
})
export default class AppAuthRegister extends Vue {
  hasUser = false;
  email = "";
  company = "";
  user!: RegisterUser;

  alertMsg = "";
  alertVisible = false;

  async created() {
    try {
      const user = await volateqApi.getInvitedUser(this.$route.params.confirmKey);
      this.user = {
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        password: "",
        repeat_password: ""
      };
      this.email = user.email;
      this.company = user.customer && user.customer.name || "";

      this.hasUser = true;
    } catch (e) {
      if (e.error === ApiErrors.RESOURCE_NOT_FOUND) {
        this.$router.push({ name: "Login" });
      }

      this.showAlert(e.error);
    }
  }

  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (this.user.password !== this.user.repeat_password) {
      this.showAlert("PASSWORDS_DONT_MATCH");
      return;
    }

    try {
      await volateqApi.registerUser(this.$route.params.confirmKey, this.user);

      this.$router.push({ name: "Login" })
    } catch (e) {
      this.showAlert(e.error);
    }
  }

  showAlert(msg: string) {
    this.alertMsg = msg;
    this.alertVisible = true;

    appButtonEventBus.stopLoading();
  }
}
</script>

<style lang="scss">
.app-auth-register {
  .invalid-register-alert {
    margin-top: 1rem;
  }
}
</style>