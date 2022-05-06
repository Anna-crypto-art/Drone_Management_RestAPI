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
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-analysis-monitoring",
  components: {
    AppContent,
  },
})
export default class AppAnalysisMonitoring extends BaseAuthComponent {
  monitoring_json = {'test': false};
  
  async created() {
    this.monitoring_json = await volateqApi.getAnalysisMonitoring();
    console.log(this.monitoring_json)
    /*try {
      this.monitoring_json = await volateqApi.getAnalysisMonitoring();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }*/
  }
}
</script>

<style lang="scss"></style>
