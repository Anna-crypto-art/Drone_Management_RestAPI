import { BvTableFieldArray } from "bootstrap-vue";
import { AnalysisResultCspPtcSchemaBase } from "../api-schemas/analysis-result-csp-ptc-schema-base";
import { AnalysisResultDetailedSchema } from "../api-schemas/analysis-result-schema";
import { AnalysisResultCspPtcMappingEntry, AnalysisResultCspPtcMappings, BvTableFieldExtArray } from "./types";
import VueI18n from "vue-i18n";
import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";

export class AnalysisResultCspPtcMappingHelper<T extends AnalysisResultCspPtcSchemaBase> {
  constructor(
    private readonly analysisResultMapping: AnalysisResultCspPtcMappings<T>,
    private readonly analysisResult: AnalysisResultDetailedSchema,
  ) {}

  public getColumns(transFunc: (transName: string) => VueI18n.TranslateResult): BvTableFieldExtArray {
    const columns: BvTableFieldExtArray = [];

    for (const mappingEntry of this.analysisResultMapping) {
      if (this.hasKeyFigure(mappingEntry)) {
        columns.push({
          key: mappingEntry.transName,
          label: transFunc(mappingEntry.transName).toString(),
          sortable: true,
          labelExpl: mappingEntry.transDescr,
        });
      }
    }

    return columns;
  }

  public getItems(results: T[]): Record<string, unknown>[] {
    return results.map(result => this.getItem(result));
  }

  public getItemsTranslated(results: T[], t: (key: VueI18n.Path, values?: VueI18n.Values) => VueI18n.TranslateResult): Record<string, unknown>[] {
    return results.map(result => this.getItem(result), t);
  }

  public getItem(result: T, t?: (key: VueI18n.Path, values?: VueI18n.Values) => VueI18n.TranslateResult): Record<string, unknown> {
    const item: Record<string, unknown> = {};

    for (const mappingEntry of this.analysisResultMapping) {
      if (this.hasKeyFigure(mappingEntry)) {
        item[mappingEntry.transName] = mappingEntry.getValue(result);
      }
    }

    return item;
  }

  public getColumnsMapping(): Record<string, string> {
    const columnsMapping: Record<string, string> = {};

    for (const mappingEntry of this.analysisResultMapping) {
      if (this.hasKeyFigure(mappingEntry)) {
        columnsMapping[mappingEntry.transName] = this.getPropertyName(mappingEntry);
      }
    }

    return columnsMapping;
  }

  public getComponentKeyFigureId(keyFigureId: AnalysisResultKeyFigure): string | undefined {
    const comp_key_figures = this.analysisResult.component_key_figures
      .filter(comp_key_figure => comp_key_figure.key_figure.id === keyFigureId)

    if (comp_key_figures.length > 0) {
      return comp_key_figures[0].id;
    }

    return undefined;
  }

  public hasKeyFigure(mappingEntry: AnalysisResultCspPtcMappingEntry<T>): boolean {
    return mappingEntry.keyFigureId === undefined || !!this.getComponentKeyFigureId(mappingEntry.keyFigureId)
  }

  public getPropertyName(mappingEntry: AnalysisResultCspPtcMappingEntry<T>): string {
    return mappingEntry.getValue.toString().match(/=>[^.]*\.(.*)/)![1];
  }
}