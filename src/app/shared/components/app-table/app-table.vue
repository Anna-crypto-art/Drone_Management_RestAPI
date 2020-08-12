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
  @PropSync('columns', { required: true }) computedColumns!: AppTableColumns;
  @PropSync('rows') computedRows: AppTableRows | undefined;
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-table {
  table {
    width: 100%;

    th {
      font-weight: bold;
      padding: 20px 40px;
      border-bottom: 2px solid $dark-40pc;
      
      &:first-child {
        padding-left: 5px;
      }
    }

    tr {
      border-bottom: 1px solid $dark-20pc;
      &:last-child {
        border: none;
      }
    }

    td {
      padding: 20px 40px;

      &:first-child {
        padding-left: 5px;
      }
    }
  }
}
</style>
