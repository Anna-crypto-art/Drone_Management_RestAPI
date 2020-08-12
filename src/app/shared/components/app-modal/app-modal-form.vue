<template>
  <b-modal class="app-modal-form" :id="id" :ok-title="okTitle">
    <template v-slot:modal-title>
      <div class="app-modal-form-title">
        <h2>{{ title }}</h2>
        <div v-if="subtitle" v-html="subtitle" class="app-modal-form-title-subtitle grayed"></div>
      </div>
    </template>
    <template v-slot:modal-body>
      <form @submit="onSubmit">
        <slot></slot>
      </form>
    </template>
    <template v-slot:modal-footer>
      <b-button variant="secondary" @click="$bvModal.hide(id)">{{ $t('cancel') }}</b-button>
      <b-button variant="primary" @click="onSubmit" :disabled="loading">
        <span class="app-modal-form-loading" v-show="loading"><b-spinner small></b-spinner></span> {{ okTitle }}
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IAppModalForm } from "./types";

@Component({
  name: "app-modal-form",
})
export default class AppModalForm extends Vue implements IAppModalForm {
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) title: string | undefined;
  @Prop() subtitle: string | undefined;
  @Prop({ required: true }) okTitle: string | undefined;

  loading = false;

  show() {
    this.$bvModal.show(this.id || "");
  }

  onSubmit(e: Event) {
    e && e.preventDefault();

    this.loading = true;

    this.$emit('submit');
  }

  stopLoading() {
    this.loading = false;
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
  &-loading {
    margin-right: 5px;
  }
}
</style>
