<template>
  <div class="app-table">
    <table>
      <thead>
        <th v-for="column in computedColumns" :key="column.name" v-html="column.name"></th>
      </thead>
      <tbody>
        <tr v-for="row in computedRows" :key="row.id">
          <td v-for="(cell, index) in row.cells" :key="index" v-html="cell.value" v-bind:class="{ 'hover-cell': cell.showOnHoverOnly }"></td>
        </tr>
        <tr v-if="computedRows && computedRows.length === 0">
          <td :colspan="computedColumns.length" style="text-align: center" ><span class="grayed">{{ $t("no-data") }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, PropSync } from "vue-property-decorator";
import { AppTableColumns, AppTableRows } from "@/app/shared/components/app-table/types";

@Component({
  name: "app-table",
})
export default class AppTable extends Vue {
  @PropSync("columns", { required: true }) computedColumns!: AppTableColumns;
  @PropSync("rows") computedRows: AppTableRows | undefined;
}
</script>

<style lang="scss">
@import '~bootstrap/scss/_functions';
@import '~bootstrap/scss/_variables';
@import '~bootstrap/scss/mixins/_breakpoints';
@import "@/scss/_colors.scss";

$table-padding: 20px 40px;
$left-padding: 15px;

.app-table {
  table {
    width: 100%;

    th {
      font-weight: bold;
      padding: $table-padding;
      border-bottom: 2px solid $dark-40pc;
      
      &:first-child {
        padding-left: $left-padding;
      }
    }

    tr {
      border-bottom: 1px solid $dark-20pc;
      transition: ease 100ms background-color;

      &:last-child {
        border: none;
      }
      &:hover {
        background-color: $background-grey;

        td.hover-cell {
          opacity: 0;
        }
      }
    }

    td {
      padding: $table-padding;

      &:first-child {
        padding-left: $left-padding;
      }
      &.hover-cell {
        opacity: 0;
        transition: ease 100ms opacity;
      }
    }
  }
}

@include media-breakpoint-down(xs) {
  $table-padding: 5px 10px;
  $left-padding: 0px;

  .app-table {
    font-size: 0.75rem;
    overflow-x: auto;
    max-width: 100%;

    table {
      th {
        padding: $table-padding;
        
        &:first-child {
          padding-left: $left-padding;
        }
      }

      td {
        padding: $table-padding;

        &:first-child {
          padding-left: $left-padding;
        }
      }
    }
  }
}

</style>
