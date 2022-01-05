<template>
  <div class="app-table-component-container">
    <slot></slot>
    <app-loading v-show="loading"></app-loading>
    <app-table-pagination :pagination="pagination" :tableName="tableName" v-show="!loading"></app-table-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import { ITablePagination } from "@/app/shared/components/app-table-pagination/table-pagination";
import AppTablePagination from "@/app/shared/components/app-table-pagination/app-table-pagination.vue";

@Component({
  name: "app-table-component-container",
  components: {
    AppLoading,
    AppTablePagination,
  }
})
export default class AppTableComponentContainer extends Vue {
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
.app-table-component-container {
  position: relative;
  min-height: 250px;

  .b-table {
    font-size: .7rem;
  }
}
</style>