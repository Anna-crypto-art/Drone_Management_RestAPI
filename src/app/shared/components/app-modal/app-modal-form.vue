<template>
  <b-modal class="app-modal-form" :id="id" :ok-title="okTitle">
    <template v-slot:modal-title>
      <div class="app-modal-form-title">
        <h2>{{ title }}</h2>
        <div v-if="subtitle" v-html="subtitle" class="app-modal-form-title-subtitle grayed"></div>
      </div>
    </template>
    <b-alert v-model="showAlert" :variant="alertVariant" v-html="alertMsg" class="app-modal-form-alert" dismissible></b-alert>
    <form @submit="onSubmit">
      <slot></slot>
    </form>
    <template v-slot:modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide(id)">{{ $t('cancel') }}</b-button>
      <app-button @click="onSubmit">{{ okTitle }}</app-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";

@Component({
  name: "app-modal-form",
  components: {
    AppButton,
  }
})
export default class AppModalForm extends Vue implements IAppModalForm {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) title!: string;
  @Prop() subtitle: string | undefined;
  @Prop({ required: true }) okTitle!: string;
  
  showAlert = false;
  alertMsg = "";
  alertVariant = "default";

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

    console.error(msg)

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
    this.$emit("submit");
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
      font-size: 2em;
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
