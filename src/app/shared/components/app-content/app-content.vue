<template>
  <div>
    <app-header></app-header>
    <div class="app-content">
      <b-container>
        <div v-if="navback" class="app-content-navback">
          <router-link class="link" :to="{ name: 'Home' }">
            <b-icon icon="chevron-left"></b-icon> {{ $t("back-to-overview") }}
          </router-link>
        </div>
        <div class="app-content-title">
          <h1 v-html="title"></h1>
          <div v-if="subtitle" v-html="subtitle" class="app-content-subtitle"></div>
        </div>
        <div class="app-content-content">
          <slot></slot>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "../app-header/app-header.vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
  name: "app-content",
  components: {
    AppHeader
  }
})
export default class AppContent extends Vue {
  @Prop({ required: true }) title: string | undefined;
  @Prop() subtitle: string | undefined;
  @Prop({ default: false }) navback: boolean | undefined;
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-content {
  &-navback {
    margin-top: 50px;
  }

  &-title {
    margin: 50px 0;

    h1 {
      font-size: 4rem;
      margin-bottom: 10px;
    }
  }
  &-subtitle {
    color: $dark-80pc;
    font-size: 1.5rem;
  }
}
</style>
