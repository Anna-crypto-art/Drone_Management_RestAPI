<template>
  <app-content :title="$t('overview')" :subtitle="$t('overview_descr')">
    <div class="app-home">
    </div>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppContent from "@/app/shared/components/app-content/app-content.vue";

@Component({
  name: "app-home",
  components: {
    AppContent
  }
})
export default class AppHome extends Vue {}
</script>

<style>

</style>
