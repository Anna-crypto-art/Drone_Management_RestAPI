<template>
  <b-button variant="primary" :type="type" :class="cls" :disabled="loading" :form="parentForm" @click="onClick">
    <span class="app-button-loading" v-show="loading"><b-spinner small></b-spinner></span><slot></slot>
  </b-button>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { IAppButton } from "@/app/shared/components/app-button/types";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";

@Component({
  name: "app-button"
})
export default class AppButton extends Vue implements IAppButton {
  @Prop({ default: "button" }) type!: string;
  @Prop({ default: "" }) cls!: string;
  @Prop() parentForm: HTMLFormElement | undefined;

  loading = false;

  created() {
    appButtonEventBus.onStopLoading(() => {
      this.stopLoading();
    });
  }

  stopLoading() {
    this.loading = false;
  }

  onClick(e: Event) {
    if (this.parentForm) {
      if (this.parentForm.checkValidity()) {
        this.loading = true;
        this.parentForm.submit();
      }
    } else {
      this.$emit("click", e);
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-button-loading {
  margin-right: 5px;
}

</style>
