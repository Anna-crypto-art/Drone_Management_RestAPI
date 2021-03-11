import Vue from "vue";
import { BvTableCtxObject, BvTableFieldArray } from "bootstrap-vue";
import { Prop, Ref } from "vue-property-decorator";
import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";

export interface IAnalysisResultCspPtcContainer {
  startLoading(): void;
  stopLoading(): void;
}

export interface IAnalysisResultCspPtcComponent {
  search(searchText: string): void;
}

export abstract class AppAnalysisResultCspPtcBase extends Vue implements IAnalysisResultCspPtcComponent {
  @Prop() analysisResultId!: string;
  @Prop() componentKeyFigure!: ComponentKeyFigureSchema;
  @Ref() container!: IAnalysisResultCspPtcContainer;
  @Ref() table!: any;

  columns: BvTableFieldArray = [];

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  protected searchText = "";

  abstract dataProvider(ctx: BvTableCtxObject);

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