<template>
  <div class="app-auth-reset-password">
    <app-auth-container :title="$t('reset-password')">
      <b-form @submit.prevent="onSubmit">
        <b-form-group :label="$t('password')" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
            :placeholder="$t('password')"
          ></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('repeat-password')" label-for="repeat-password">
          <b-form-input
            id="repeat-password"
            v-model="repeatPassword"
            type="password"
            required
            :placeholder="$t('repeat-password')"
          ></b-form-input>
        </b-form-group>
        <app-button type="submit" cls="width-100pc" :loading="loading">{{ $t("apply") }}</app-button>
      </b-form>
    </app-auth-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppAuthContainer from "@/app/auth/shared/components/auth-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import authContainerEventBus from "@/app/auth/shared/components/auth-container-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ApiErrors, ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-auth-reset-password",
  components: {
    AppAuthContainer,
    AppButton,
  },
})
export default class AppAuthResetPassword extends Vue {
  password = "";
  repeatPassword = "";

  loading = false;

  async created() {
    try {
      await volateqApi.confirmPasswordReset(this.$route.params.confirmKey);
    } catch (e) {
      if ((e as ApiException).error === ApiErrors.RESOURCE_NOT_FOUND) {
        this.$router.push({ name: "Login" });
      }

      authContainerEventBus.showErrorAlert((e as ApiException).error);
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;

      await volateqApi.resetPassword(this.$route.params.confirmKey, this.password, this.repeatPassword);

      this.$router.push({ name: "Login" });
    } catch (e) {
      authContainerEventBus.showErrorAlert((e as any).message);
      this.loading = false;
    }
  }
}
</script>

<style lang="scss"></style>
