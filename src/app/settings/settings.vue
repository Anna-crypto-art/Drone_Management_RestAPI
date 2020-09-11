<template>
  <app-content :title="$t($route.meta.title)" :navback="true" :subtitle="$t($route.meta.subtitle)">
    <router-view></router-view>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import AppContent from "@/app/shared/components/app-content/app-content.vue";

@Component({
  name: "app-settings",
  components: {
    AppContent
  }
})
export default class AppSettings extends Vue {}
</script>

<style>

</style>
