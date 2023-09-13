<template>
  <b-modal class="app-modal-form" :id="id" :ok-title="okTitle" :cancel-title="cancelTitle" :size="size" no-close-on-backdrop>
    <template v-slot:modal-title>
      <div class="app-modal-form-title">
        <slot name="modal-title">
          <h2>{{ title }} <app-super-admin-marker v-if="superAdminProtected" /></h2>
          <div v-if="subtitle" v-html="subtitle" class="app-modal-form-title-subtitle grayed"></div>
        </slot>
      </div>
    </template>
    <b-alert
      v-model="showAlert"
      :variant="alertVariant"
      class="app-modal-form-alert"
      dismissible
    >
      <div v-html="alertMsg"></div>
    </b-alert>
    <form @submit.prevent="onSubmit">
      <slot></slot>
    </form>
    <template v-slot:modal-footer>
      <app-button v-if="showCancelButton" variant="secondary" @click="onCancel">{{ cancelTitle }}</app-button>
      <app-button @click="onSubmitButtonClick" :loading="modalLoading">{{ okTitle }}</app-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { BaseAuthComponent } from "../base-auth-component/base-auth-component";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";

@Component({
  name: "app-modal-form",
  components: {
    AppButton,
    AppSuperAdminMarker,
  },
})
export default class AppModalForm extends BaseAuthComponent implements IAppModalForm {
  @Prop({ required: true }) id!: string;
  @Prop({ default: "" }) title!: string;
  @Prop() subtitle: string | undefined;
  @Prop({ required: true }) okTitle!: string;
  @Prop({ default: "" }) cancelTitle!: string;
  @Prop({ default: false }) modalLoading!: boolean;
  @Prop({ default: false }) superAdminProtected!: boolean;
  @Prop({ default: true }) showCancelButton!: boolean
  @Prop({ default: undefined }) size!: "sm" | "lg" | "xl" | undefined;
  @Prop({ default: false }) submitOnButtonClickOnly!: boolean;

  showAlert = false;
  alertMsg = "";
  alertVariant = "default";

  async created() {
    if (!this.cancelTitle) {
      this.cancelTitle = this.$t("cancel").toString();
    }
  }

  show() {
    this.$bvModal.show(this.id || "");
  }

  hide() {
    this.hideAlert();
    this.$bvModal.hide(this.id || "");
  }

  alertError(msg: string | any) {
    this.alertVariant = "danger";
    this.showAlert = true;

    console.error(msg);

    if (typeof msg === "string") {
      this.alertMsg = msg;
    } else {
      this.alertMsg = msg.error;
      const details = msg.details || msg.message;
      if (details) {
        this.alertMsg += "<br><small>Details: " + details + "</small>";
      }
    }
  }

  alertInfo(msg: string) {
    this.alertVariant = "primary";
    this.showAlert = true;
    this.alertMsg = msg;
  }

  onSubmit(e: Event) {
    if (!this.submitOnButtonClickOnly) {
      this.$emit("submit");
    }
  }

  onSubmitButtonClick(e: Event) {
    this.$emit("submit");
  }

  onCancel(e: Event) {
    this.$emit("cancel");

    this.hide();
  }

  hideAlert() {
    this.showAlert = false;
    this.alertMsg = "";
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-modal-form {
  &-title {
    h2 {
      font-size: 1.5em;
      margin-bottom: 10px;
    }

    &-subtitle {
      font-size: 1em;
    }
  }
  &-alert {
    margin-bottom: 1.5rem;
  }
}
</style>
