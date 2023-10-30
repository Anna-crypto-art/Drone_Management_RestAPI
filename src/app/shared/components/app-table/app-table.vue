<template>
  <div class="app-table">
    <b-table
      :id="id"
      ref="appTable"
      :fields="fields"
      :items="rows"
      :hover="hover"
      :busy="loading"
      :emptyText="emptyText || $t('no-data')"
      :selectable="selectMode !== null"
      :select-mode="selectMode"
      @row-selected="onRowSelected"
      :class="{ 'app-table-compact': compact, 'app-table-hidden-header': hideHeader }"

      :per-page="perPage"
      :current-page="currentPage"

      head-variant="light"
      show-empty
    >
      <template v-if="loading !== null" #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>

      <template #empty="scope">
        <span class="grayed">{{ scope.emptyText }}</span>
      </template>

      <template #head()="column">
        <app-expl-wrap :expl="column.field.labelExpl">{{ column.label }}</app-expl-wrap>
        <app-super-admin-marker v-if="column.field.superAdminOnly" />
      </template>

      <template #head(selected)>
        <b-checkbox v-show="enableAllSelection" @change="onSelectAllFiles" />
      </template>

      <template #cell(selected)="{ rowSelected }">
        <b-checkbox v-show="hasMultiOrRangeSelectMode" :checked="rowSelected" disabled class="b-table-selectable-checkbox" />
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
    
    <app-loading v-if="overlayLoading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { AppTableColumns, IAppSelectTable, IAppTable } from "./types";


@Component({
  name: "app-table",
  components: {
    AppSuperAdminMarker,
    AppExplWrap,
    AppLoading
  }
})
export default class AppTable extends Vue implements IAppSelectTable, IAppTable {
  @Prop({ required: true }) columns!: AppTableColumns;
  @Prop({ default: [] }) rows!: Array<any>;
  @Prop({ default: null }) id!: string | null;
  @Prop({ default: true }) hover!: boolean;
  @Prop({ default: "" }) emptyText!: string;
  @Prop({ default: false }) loading!: boolean | null;
  @Prop({ default: false }) overlayLoading!: boolean | null;
  @Prop({ default: false }) hoverActions!: boolean;
  @Prop({ default: false }) compact!: boolean;
  @Prop({ default: false }) hideHeader!: boolean;

  @Prop({ default: null }) perPage!: number | null;
  @Prop({ default: null }) currentPage!: number | null;
  
  @Prop({ default: null }) selectMode!: 'single' | 'multi' | 'range' | null;
  @Prop({ default: false }) selectAllColumns!: boolean;

  @Ref() appTable!: IAppSelectTable & IAppTable;

  fields!: AppTableColumns;

  created() {
    this.onColumnsChanged();
  }

  @Watch("columns")
  onColumnsChanged() {
    const fields: AppTableColumns = JSON.parse(JSON.stringify(this.columns));
    if (this.hoverActions) {
      fields.push({ key: "actions", label: "" });
    }
    if (this.hasMultiOrRangeSelectMode) {
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
    return this.hasMultiOrRangeSelectMode && this.selectAllColumns;
  }

  get hasMultiOrRangeSelectMode(): boolean {
    return this.selectMode === "multi" || this.selectMode === "range"
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
  async refresh() {
    this.appTable.refresh();
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-table {
  position: relative;

  .table {
    color: $dark;
    border: 1px solid $border-color-grey;
    border-top: none;
    background-color: $white;
  }
  .table.b-table.b-table-selectable {
    .b-table-row-selected {
      -webkit-box-shadow: inset 2px 0px 0px 0px $blue-60pc;
      -moz-box-shadow: inset 2px 0px 0px 0px $blue-60pc;
      box-shadow: inset 2px 0px 0px 0px $blue-60pc;
      font-weight: bold;

      small {
        font-weight: bold;
      }
    }
    
    tbody tr:hover:not(.b-table-empty-row) {
      -webkit-box-shadow: inset 2px 0px 0px 0px $blue-60pc;
      -moz-box-shadow: inset 2px 0px 0px 0px $blue-60pc;
      box-shadow: inset 2px 0px 0px 0px $blue-60pc;
    }
    tbody > tr.b-table-empty-row {
      cursor: default;
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
    & > .btn, & > a.link {
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

  .table.app-table-compact > tbody > tr > td, .table.app-table-compact > thead > tr > th {
    padding: 0.5em;
  }
  .table.app-table-compact > tbody > tr > td {
    white-space: nowrap;
  }
  .table.app-table-hidden-header > thead {
    display: none;
  }
}
</style>
