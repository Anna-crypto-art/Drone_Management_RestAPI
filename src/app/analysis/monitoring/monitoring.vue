<template>
  <app-content :title="$t('QFly Analysis Monitoring')" :subtitle="$t('Overview about all currently running evaluations.')">
    <div class="app-analysis-monitoring">
      <pre>{{ monitoring_json }}</pre>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

@Component({
  name: "app-analysis-monitoring",
  components: {
    AppContent,
  },
})
export default class AppAnalysisMonitoring extends BaseAuthComponent {
  monitoring_json = {'test': false};
  
  async created() {
    try {
      this.monitoring_json = await volateqApi.getAnalysisMonitoring();
    } catch (e) {
      this.showError(e);
    }
  }
}
</script>

<style lang="scss"></style>
