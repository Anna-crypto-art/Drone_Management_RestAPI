<template>
  <div class="app-table">
    <b-table
      ref="appTable"
      :fields="fields"
      :items="rows"
      :hover="hover"
      :busy="loading"
      :emptyText="emptyText || $t('no-data')"
      :selectable="selectMode !== null"
      :select-mode="selectMode"
      @row-selected="onRowSelected"

      head-variant="light"
      show-empty
    >
      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>

      <template #empty="scope">
        <span class="grayed">{{ scope.emptyText }}</span>
      </template>

      <template #head()="data">
        {{ data.label }}
        <app-super-admin-marker v-if="data.field.superAdminOnly" />
      </template>

      <template #head(selected)>
        <b-checkbox v-show="enableAllSelection" @change="onSelectAllFiles" />
      </template>

      <template #cell(selected)="{ rowSelected }">
        <b-checkbox v-show="selectMode === 'multi'" :checked="rowSelected" disabled class="b-table-selectable-checkbox" />
      </template>

      <template #cell(actions)="row">
        <div v-if="hoverActions" class="hover-cell pull-right">
          <slot name="hoverActions" v-bind="row" />
        </div>
        <div v-if="hoverActions" class="clear"></div>
      </template>

      <!-- Pass slots through -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { AppTableColumns, IAppSelectTable } from "./types";

@Component({
  name: "app-table",
  components: {
    AppSuperAdminMarker,
  }
})
export default class AppTable extends Vue implements IAppSelectTable {
  @Prop({ required: true }) columns!: AppTableColumns;
  @Prop({ default: [] }) rows!: Array<any>;
  @Prop({ default: true }) hover!: boolean;
  @Prop({ default: "" }) emptyText!: string;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: false }) hoverActions!: boolean;
  
  @Prop({ default: null }) selectMode!: 'single' | 'multi' | null;
  @Prop({ default: 0 }) maxRowSelectoin!: number;
  @Prop({ default: false }) selectAllColumns!: boolean;

  @Ref() appTable!: IAppSelectTable;

  fields!: AppTableColumns;

  allFilesSelected = false;

  created() {
    this.onColumnsChanged();
  }

  @Watch("columns")
  onColumnsChanged() {
    const fields: AppTableColumns = JSON.parse(JSON.stringify(this.columns));
    if (this.hoverActions) {
      fields.push({ key: "actions", label: "" });
    }
    if (this.selectMode === "multi") {
      fields.unshift({ key: "selected", label: "" });
    }
    this.fields = fields;
  }

  @Watch("selectMode")
  onSelectModeChanged() {
    this.onColumnsChanged();
  }

  onRowSelected(selectedRows: Array<any>) {
    this.$emit("rowSelected", selectedRows);
  }

  onSelectAllFiles(selected: boolean) {
    if (selected) {
      this.appTable.selectAllRows();
    } else {
      this.appTable.clearSelected();
    }
  }

  get enableAllSelection(): boolean {
    return this.selectMode === "multi" && this.selectAllColumns;
  }

  selectRow(rowIndex: number) {
    this.appTable.selectRow(rowIndex);
  }
  unselectRow(rowIndex: number) {
    this.appTable.unselectRow(rowIndex);
  }
  clearSelected() {
    this.appTable.clearSelected()
  }
  selectAllRows() {
    this.appTable.selectAllRows()
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-table {
  .table {
    color: $dark;
    border: 1px solid $border-color-grey;
    border-top: none;
    background-color: $white;
  }
  .table.no-border {
    border: none !important;
  }
  .table.b-table.b-table-selectable {
    .b-table-row-selected {
      border-left: 2px solid $blue-60pc;
      font-weight: bold;

      small {
        font-weight: bold;
      }
    }
    
    tbody tr:hover {
      border-left: 2px solid $blue-60pc;
    }
  }

  .table.b-table > thead > tr > [aria-sort="none"] {
    background-size: 0 0;

    &:hover {
      background-size: 0.65em 1em;
    }
  }
  .table .thead-light th {
    color: $dark;
    background-color: $background-grey;
    border-color: $border-color-grey;
  }
  .table-hover tbody tr:hover {
    background-color: $background-grey-60pc;
    td .hover-cell {
      opacity: 1;
    }
  }
  .table-hover tbody tr {
    position: relative;
  }
  .table-hover tbody tr > td .hover-cell {
    opacity: 0;
    position: absolute;
    transition: ease 100ms opacity;
    right: 1em;

    & > .b-dropdown {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
    & > .btn {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .b-table-empty-row > td {
    text-align: center;
    padding: 2rem;
  }

  .b-table-selectable-checkbox {
    .custom-control-label {
      cursor: pointer;
    }
    .custom-control-input:disabled:checked ~ .custom-control-label::before {
      background-color: $blue;
    }
    .custom-control-input[disabled] ~ .custom-control-label::before,
    .custom-control-input:disabled ~ .custom-control-label::before {
      background-color: #fff;
    }
  }
}
</style>
