<template>
  <div class="app-observation-table-component">
    <app-table-component-container :loading="loading" :tableName="tableName" :pagination="pagination" size="sm">
      <app-table
        :id="tableName"
        :columns="columns"
        :rows="dataProvider"
        ref="table"
        :perPage="pagination.perPage"
        :currentPage="pagination.currentPage"
        :loading="null"
        :compact="true"
      >
      </app-table>
    </app-table-component-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BvTableCtxObject } from "bootstrap-vue";
import AppTableComponentContainer from "@/app/plant/shared/table-component/table-component-container.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import { TableTabComponent } from "./types";
import { ITableComponent } from "./types";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns, IAppTable } from "@/app/shared/components/app-table/types";
import { getUserName } from "@/app/shared/services/helper/user-helper";
import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { DateRange } from "../observations/types";
import dateHelper from "@/app/shared/services/helper/date-helper";

@Component({
  name: "app-observation-table-component",
  components: {
    AppTableComponentContainer,
    AppExplanation,
    AppTable,
  },
})
export default class AppObservationTableComponent extends BaseAuthComponent implements ITableComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) activeComponent!: TableTabComponent;
  @Prop({ required: true }) ccps!: CustomComponentPropertySchema[];
  @Prop({ required: true }) dateRange!: DateRange;

  @Ref() table!: IAppTable;

  loading = false;

  columns: AppTableColumns = [];
  tableName!: string;

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  private lastCtx: BvTableCtxObject | undefined;
  private searchText = "";

  async created() {
    this.tableName = "table_observations" + "_" + this.activeComponent.componentId;

    this.columns = [
      { key: "pcs", label: this.$t("pcs").toString() },
      { key: "observedAt", label: this.$t("observed-at").toString() },
      ...this.ccps.map(ccp => ({
        key: ccp.id,
        label: ccp.name,
        labelExpl: ccp.description
      })),
      { key: "notes", label: this.$t("notes").toString() },
      { key: "createdBy", label: this.$t("created-by").toString() },
    ];
  }

  public search(searchText: string) {
    this.searchText = searchText.trim();

    this.refresh();
  }

  getTableRequestParam(): TableRequest {
    if (!this.lastCtx) {
      throw Error("Missing lastCtx");
    }

    return {
      limit: this.lastCtx.perPage,
      page: this.lastCtx.currentPage,
      search_text: this.searchText,
    };
  }

  getCsvDownloadUrl(): string {
    throw Error("Not Implememented")
  }

  async refresh() {
    await this.table?.refresh();
  }

  async dataProvider(ctx: BvTableCtxObject): Promise<any> {
    this.lastCtx = ctx;

    try {
      this.loading = true;

      const observations = await volateqApi.getObservations(
        this.plant.id,
        this.activeComponent.componentId,
        this.dateRange!.from,
        this.dateRange!.to,
        this.getTableRequestParam(),
      );

      this.pagination.total = observations.total;

      const results: Record<string, unknown>[] = [];
      for (const observation of observations.items) {
        const row = {
          pcs: observation.fieldgeometry_component.kks,
          observedAt: dateHelper.toDateTime(observation.observed_at),
          notes: observation.notes,
          createdBy: getUserName(observation.created_by_user),
        };

        for (const ccp of this.ccps) {
          row[ccp.id] = ccp.id in observation.column_values ? observation.column_values[ccp.id] : "";
        }

        results.push(row);
      }

      return results;
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }

    return [];
  }
}
</script>
<style lang="scss">
@import "@/scss/_colors.scss";

.app-observation-table-component {
  tr.table-primary > td {
    font-weight: bold !important;
  }

  tr > td .diff {
    padding-left: 5px;
    font-weight: bold;

    &.text-grey {
      color: $grey;
    }
  }
}
</style>