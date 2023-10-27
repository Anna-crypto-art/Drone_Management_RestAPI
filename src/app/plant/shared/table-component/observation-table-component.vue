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
import { ObservationSelectionService } from "../selection-sidebar/observation-selection/observation-selection-service";
import { IObservationSelectionComponent } from "../selection-sidebar/observation-selection/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-observation-table-component",
  components: {
    AppTableComponentContainer,
    AppExplanation,
    AppTable,
  },
})
export default class AppObservationTableComponent extends BaseAuthComponent implements ITableComponent, IObservationSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) activeComponent!: TableTabComponent;

  @Ref() table!: IAppTable;

  loading = false;

  columns: AppTableColumns = [];
  tableName!: string;

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  observationSelectionService: ObservationSelectionService | null = null;

  private lastCtx: BvTableCtxObject | undefined;
  private searchText = "";

  private columnsMapping!: Record<string, string>;

  async created() {
    this.observationSelectionService = new ObservationSelectionService(this);
    this.tableName = "table_observations" + "_" + this.activeComponent.componentId;

    // TODO: set columns, load rows
  }

  async mounted() {
    await this.observationSelectionService!.register();
  }

  async unmounted() {
    this.observationSelectionService?.unregister();
  }

  public search(searchText: string) {
    this.searchText = searchText.trim();

    this.refresh();
  }

  getTableRequestParam(): TableRequest {
    if (!this.lastCtx) {
      throw Error("Missing last_ctx");
    }

    return {
      limit: this.lastCtx.perPage,
      page: this.lastCtx.currentPage,
      order_by: this.lastCtx.sortBy && this.columnsMapping[this.lastCtx.sortBy],
      order_direction: this.lastCtx.sortDesc ? "desc" : "asc",
      search_text: this.searchText,
    };
  }

  getCsvDownloadUrl(): string {
    throw Error("Not Implememented")
  }

  refresh(): void {
    this.table.refresh();
  }

  @CatchError("loading")
  async dataProvider(ctx: BvTableCtxObject) {
    this.lastCtx = ctx;

   
      // const results = await this.getAnalysisResults();
      // this.pagination.total = results.total;

      // const tableItems = this.mappingHelper.getItems(results.items);

      // if (results.sums) {
      //   const sumItem = this.mappingHelper.getItem(results.sums);
      //   for (const key in sumItem) {
      //     let val = sumItem[key];
      //     if (MathHelper.isFloat(val as any)) {
      //       sumItem[key] = val = MathHelper.roundTo(val as any, 2);
      //     }

      //     if (tableItems.length > 0 && val !== null) {
      //       if (typeof tableItems[0][key] === "number") {
      //         sumItem[key] = "μ " + sumItem[key];
      //       }
      //     }
      //   }

      //   tableItems.unshift({
      //     ...sumItem,
      //    _rowVariant: "primary",
      //   });
      // }

      // return tableItems;
    
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