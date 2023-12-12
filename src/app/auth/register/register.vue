<template>
  <div class="app-auth-register">
    <app-auth-container>
      <div v-if="hasUser">
        <b-form @submit.prevent="onSubmit" autocomplete="off">
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
            <b-form-input
              id="password"
              v-model="user.password"
              type="password"
              :placeholder="$t('password')"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group :label="$t('repeat-password')" label-for="repeat-password">
            <b-form-input
              id="repeat-password"
              v-model="user.repeat_password"
              type="password"
              :placeholder="$t('repeat-password')"
              required
            ></b-form-input>
          </b-form-group>
          <app-select-auth-method v-model="user.auth_method" />
          <div>
            <b-form-checkbox id="terms-of-service" v-model="checkedTermsOfService" required>
              <span v-html="$t('accept-terms-of-service')"></span>
            </b-form-checkbox>
          </div>
          <app-button type="submit" cls="width-100pc" :disabled="!checkedTermsOfService" :loading="loading">{{
            $t("register")
          }}</app-button>
        </b-form>
      </div>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import AppAuthContainer from "@/app/shared/components/app-auth-container/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSelectAuthMethod from "@/app/shared/components/app-select-auth-method/app-select-auth-method.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { RegisterUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { ApiErrors, ApiException } from "@/app/shared/services/volateq-api/api-errors";
import authContainerEventBus from "@/app/shared/components/app-auth-container/auth-container-event-bus";
import { Dictionary } from "vue-router/types/router";
import { UserAuthMethod } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";

@Component({
  name: "app-auth-register",
  components: {
    AppAuthContainer,
    AppButton,
    AppSelectAuthMethod
  },
})
export default class AppAuthRegister extends Vue {
  hasUser = false;
  email = "";
  company = "";
  checkedTermsOfService = false;
  user!: RegisterUser;
  loading = false;

  async created() {
    try {
      const user = await volateqApi.getInvitedUser(this.$route.params.confirmKey);
      this.user = {
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        password: "",
        repeat_password: "",
        auth_method: null,
      };
      this.email = user.email;
      this.company = (user.customer && user.customer.name) || "";

      this.hasUser = true;
    } catch (e) {
      if ((e as ApiException).error === ApiErrors.RESOURCE_NOT_FOUND || (e as ApiException).error === ApiErrors.TOKEN_EXPIRED) {
        let query: Dictionary<string | undefined> | undefined = undefined;
        if ((e as ApiException).error === ApiErrors.TOKEN_EXPIRED) {
          query = {
            error: (e as ApiException).error,
            message: (e as ApiException).message,
          }
        }

        this.$router.push({ name: "Login", query: query });
      }

      this.showAlert(e as ApiException);
    }
  }

  async onSubmit(e: Event): Promise<void> {
    if (this.user.password !== this.user.repeat_password) {
      this.showAlert({ error: "PASSWORDS_DONT_MATCH" });
      return;
    }

    if (this.user.auth_method === null) {
      this.showAlert({ error: "AUTHENTICATION_METHOD_REQUIRED" });
      return;
    }

    if (!this.checkedTermsOfService) {
      this.showAlert({ error: "ACCEPT_TERMS_OF_SERVICE" });
      return;
    }

    try {
      this.loading = true;

      const confirmKey = await volateqApi.registerUser(this.$route.params.confirmKey, this.user);
      if (this.user.auth_method === UserAuthMethod.TOTP) {
        this.$router.push({ name: "RegisterTOTP", params: { confirmKey: confirmKey.confirmation_key! }});
      } else {
        this.$router.push({ name: "Login" });
      }
    } catch (e) {
      this.showAlert(e as ApiException);
    }
  }

  showAlert(e: ApiException) {
    authContainerEventBus.showError(e);
    this.loading = false;
  }
}
</script>

<style lang="scss"></style>
