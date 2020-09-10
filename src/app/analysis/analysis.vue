<template>
  <app-content :title="$t('overview')" :subtitle="$t('overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'Analysis-New' }">
        <b-button variant="primary">{{ $t("create-new-analysis") }}</b-button>
      </router-link>
    </div>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppContent from "@/app/shared/components/app-content/app-content.vue";

@Component({
  name: "app-analysis",
  components: {
    AppContent
  }
})
export default class AppAnalysis extends Vue {}
</script>

<style>

</style>
