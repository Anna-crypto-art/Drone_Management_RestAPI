<template>
  <div class="app-table">
    <table>
      <thead>
        <th v-for="column in computedColumns" :key="column.name" v-html="column.name"></th>
      </thead>
      <tbody>
        <tr v-for="row in computedRows" :key="row.id">
          <td v-for="(cell, index) in row.cells" :key="index" v-html="cell.value"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, PropSync } from "vue-property-decorator";
import { AppTableColumns, AppTableRows } from "./types";

@Component({
  name: "app-table",
})
export default class AppTable extends Vue {
  @PropSync('columns', { required: true }) computedColumns: AppTableColumns | undefined;
  @PropSync('rows') computedRows: AppTableRows | undefined;
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-table {
  table {
    th {
      font-weight: bold;
      padding: 20px 40px;
      border-bottom: 2px solid $dark-60pc;
      
      &:first-child {
        padding-left: 0;
      }
    }

    td {
      padding: 20px 40px;

      &:first-child {
        padding-left: 0;
      }
    }
  }
}
</style>
