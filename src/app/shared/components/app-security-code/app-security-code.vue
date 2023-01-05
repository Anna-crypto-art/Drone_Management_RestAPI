<template>
  <b-form-group :label="inputLabel">
    <b-form-input
      v-model="code"
      type="text"
      :placeholder="$t('security-code')"
      required
      pattern="\d{6,6}"
    ></b-form-input>
  </b-form-group>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { UserAuthMethod } from "../../services/volateq-api/api-schemas/user-schemas";

@Component({
  name: "app-security-code",
})
export default class AppSecurityCode extends Vue {
  @Prop({ required: true }) authMethod!: UserAuthMethod;
  @Prop({ default: null }) value!: string | null;

  code: string | null = null;

  created() {
    this.code = this.value;
  }

  onChange() {
    this.$emit("input", this.code);
  }

  get inputLabel(): string {
    switch (this.authMethod) {
      case UserAuthMethod.EMAIL:
        return this.$t("security-code-from-email").toString();
      
      case UserAuthMethod.TOTP:
        return this.$t("security-code-from-authenticator").toString();
    }

    return "";
  }
}
</script>

<style></style>
