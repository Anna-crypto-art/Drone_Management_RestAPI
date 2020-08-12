<template>
  <b-modal class="app-modal" :id="id" :ok-title="okTitle">
    <template v-slot:modal-title>
      <div class="app-modal-title">
        <h2>{{ title }}</h2>
        <div v-if="subtitle" v-html="subtitle" class="app-modal-title-subtitle grayed"></div>
      </div>
    </template>
    <template v-slot:modal-body>
      <form @submit="onSubmit">
        <slot></slot>
      </form>
    </template>
    <template v-slot:modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide(id)">{{ $t('cancel') }}</b-button>
      <app-loading-button ref="loadingButton" @click="onSubmit">{{ okTitle }}</app-loading-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import AppLoadingButton from "../app-loading-button/app-loading-button.vue";
import { IAppLoadingButton } from "../app-loading-button/types";

@Component({
  name: "app-modal-form",
  components: {
    AppLoadingButton
  }
})
export default class AppModalForm extends Vue {
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) title: string | undefined;
  @Prop() subtitle: string | undefined;
  @Prop({ required: true }) okTitle: string | undefined;

  @Ref() loadingButton: IAppLoadingButton | undefined;

  show() {
    this.$bvModal.show(this.id || "");
  }

  onSubmit(e: Event | undefined) {
    try {
      e && e.preventDefault();

      this.$emit('submit');
    } finally {
      this.loadingButton && this.loadingButton.stopLoading();
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-modal {
  &-title {
    h2 {
      font-size: 2em;
      margin-bottom: 10px;
    }
    
    &-subtitle {
      font-size: 1em;
    }
  }
}
</style>
