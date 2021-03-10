<template>
  <div class="app-analysis-result-csp-ptc-container">
    <slot></slot>
    <app-loading v-show="loading"></app-loading>
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="pagination.total"
      :per-page="pagination.perPage"
      :aria-controls="tableName">
    </b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";

@Component({
  name: "app-analysis-result-csp-ptc-container",
  components: {
    AppLoading
  }
})
export default class AppAnalysisResultCspPtcContainer extends Vue {
  @Prop() tableName!: string;
  @Prop() pagination!: any;

  loading = true;

  startLoading() {
    this.loading = true;
  }
  stopLoading() {
    this.loading = false;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.help-icon {
  color: $blue;
  margin-left: 5px;
}

.app-analysis-result-csp-ptc-container {
  position: relative;
}
</style>