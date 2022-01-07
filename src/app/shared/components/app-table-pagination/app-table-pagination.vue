<template>
  <div class="app-table-pagination">
    <div>
      <b-form inline>
        <label class="mr-sm-2">{{ $t("per-page") }}</label>
        <b-form-select
          v-model="pagination.perPage"
          :options="selectPageOptions"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-select>
      </b-form>
    </div>
    <div>
      <b-pagination
        v-model="pagination.currentPage"
        :total-rows="pagination.total"
        :per-page="pagination.perPage"
        :aria-controls="tableName"
      >
      </b-pagination>
    </div>
    <div>
      <span
        >{{ $t("total") }}: <b>{{ pagination.total }}</b></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ITablePagination } from "./table-pagination";

@Component({
  name: "app-table-pagination",
})
export default class AppTablePagination extends Vue {
  @Prop({ required: true }) tableName!: string;
  @Prop({ required: true }) pagination!: ITablePagination;

  selectPageOptions = [10, 25, 50, 100];
}
</script>

<style lang="scss">
.app-table-pagination {
  display: flex;
  justify-content: space-between;
}
</style>
