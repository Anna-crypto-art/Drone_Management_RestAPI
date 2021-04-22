import Vue from "vue";
import { BvTableCtxObject, BvTableFieldArray } from "bootstrap-vue";
import { Prop, Ref } from "vue-property-decorator";
import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";

export interface IAnalysisResultCspPtcContainer {
  startLoading(): void;
  stopLoading(): void;
}

export interface IAnalysisResultCspPtcComponent {
  search(searchText: string): void;
  getCsvColumnMappingsParam(): { [column_name: string]: string };
  getTableRequestParam(): TableRequest;
}

export abstract class AppAnalysisResultCspPtcBase extends Vue implements IAnalysisResultCspPtcComponent {
  @Prop() analysisResultId!: string;
  @Prop() componentKeyFigures!: ComponentKeyFigureSchema[];
  @Ref() container!: IAnalysisResultCspPtcContainer;
  @Ref() table!: any;

  columns: BvTableFieldArray = [];

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  protected last_ctx: BvTableCtxObject | undefined;
  protected searchText = "";

  abstract dataProvider(ctx: BvTableCtxObject);
  abstract getCsvColumnMappingsParam(): { [column_name: string]: string };
  abstract getTableRequestParam(): TableRequest;

  protected startLoading() {
    this.container.startLoading()
  }
  protected stopLoading() {
    this.container.stopLoading()
  }

  public search(searchText: string) {
    this.searchText = searchText.trim();

    this.table.refresh()
  }
}