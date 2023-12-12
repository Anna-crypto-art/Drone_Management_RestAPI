<template>
  <b-form-group :label="$t('select-auth-method')">
    <b-form-select v-model="authMethod" :options="authMethodOptions" @change="onChange" />
  </b-form-group>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { UserAuthMethod } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";

@Component({
  name: "app-select-auth-method",
})
export default class AppSelectAuthMethod extends Vue {
  @Prop({ default: null }) value!: UserAuthMethod | null;

  authMethodOptions: { text: string, value: number }[] = [];
  authMethod: UserAuthMethod | null = null;

  created() {
    this.authMethodOptions = [
      { text: this.$t('mfa-with-email').toString(), value: UserAuthMethod.EMAIL },
      { text: this.$t('mfa-with-totp-recommended').toString(), value: UserAuthMethod.TOTP },
    ]

    this.authMethod = this.value;
  }

  onChange() {
    this.$emit("input", this.authMethod);
  }
}
</script>

<style></style>
