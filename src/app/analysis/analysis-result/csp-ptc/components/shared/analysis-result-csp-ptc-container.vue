<template>
  <div class="app-analysis-result-csp-ptc-container">
    <slot></slot>
    <app-loading v-show="loading"></app-loading>
    <app-table-pagination :pagination="pagination" :tableName="tableName"></app-table-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import { ITablePagination } from "@/app/shared/components/app-table-pagination/table-pagination";
import AppTablePagination from "@/app/shared/components/app-table-pagination/app-table-pagination.vue";

@Component({
  name: "app-analysis-result-csp-ptc-container",
  components: {
    AppLoading,
    AppTablePagination,
  }
})
export default class AppAnalysisResultCspPtcContainer extends Vue {
  @Prop({ required: true }) tableName!: string;
  @Prop({ required: true }) pagination!: ITablePagination;

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
.app-analysis-result-csp-ptc-container {
  position: relative;
}
</style>