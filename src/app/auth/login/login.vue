<template>
  <div class="app-auth-login">
    <app-auth-container title="" :infoAlert="infoAlert">
      <b-form @submit.prevent="onSubmit">
        <b-form-group :label="$t('email')" label-for="email">
          <b-form-input id="email" v-model="email" type="email" :placeholder="$t('email')" required></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('password')" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            :placeholder="$t('password')"
            required
          ></b-form-input>
          <router-link :to="{ name: 'ForgotPassword' }" class="input-info-link">{{
            $t("forgot-password")
          }}</router-link>
        </b-form-group>
        <app-button type="submit" cls="width-100pc" :loading="loading">{{ $t("login") }}</app-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import authContainerEventBus from "@/app/auth/shared/components/auth-container-event-bus";
import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
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

  loading = false;

  infoAlert = "";

  created() {
    if (this.$route.query?.error) {
      this.infoAlert = this.$route.query.error + 
        ((this.$route.query.message && "<br><small>" + this.$route.query.message + "</small>") || "");
    }
  }

  async onSubmit() {
    try {
      this.loading = true;

      const confirmationKey = await volateqApi.login(this.email, this.password);

      this.$router.push({
        name: "ConfirmLogin",
        params: { confirmKey: confirmationKey },
        query: { dest: this.$route.query.dest || "" },
      });
    } catch (e) {
      authContainerEventBus.showErrorAlert((e as ApiException).message!);

      this.loading = false;
    }
  }
}
</script>

<style lang="scss"></style>
