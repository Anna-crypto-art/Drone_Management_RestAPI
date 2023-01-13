<template>
  <div>
    <div class="mar-top mar-bottom">
      <center><app-icon cls="font-xl" :icon="authIcon" /></center>
    </div>
    <b-form-group :label="inputLabel">
      <b-form-input
        v-model="code"
        type="text"
        :placeholder="placeholderText"
        required
        pattern="\d{6,6}"
        @change="onChange"
        autocomplete="off"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { UserAuthMethod } from "../../services/volateq-api/api-schemas/user-schemas";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";

@Component({
  name: "app-security-code",
  components: {
    AppIcon
  }
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

  get placeholderText(): string {
    switch (this.authMethod) {
      case UserAuthMethod.EMAIL:
        return this.$t("security-code").toString();
      
      case UserAuthMethod.TOTP:
        return this.$t("authentication-code").toString();
    }

    return "";
  }

  get authIcon(): string {
    switch (this.authMethod) {
      case UserAuthMethod.EMAIL:
        return "envelope";
      
      case UserAuthMethod.TOTP:
        return "phone";
    }

    return "";
  }
}
</script>

<style></style>
