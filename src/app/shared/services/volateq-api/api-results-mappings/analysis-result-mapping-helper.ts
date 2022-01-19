import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "../api-schemas/analysis-result-schema";
import { AnalysisResultMappingEntry, AnalysisResultMappings, BvTableFieldExtArray } from "./types";
import VueI18n from "vue-i18n";

export class AnalysisResultMappingHelper<T extends AnalysisResultSchemaBase> {
  constructor(
    private readonly analysisResultMapping: AnalysisResultMappings<T>,
    private readonly analysisResult: AnalysisResultDetailedSchema
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

  public getItemsTranslated(
    results: T[],
    t: (key: VueI18n.Path, values?: VueI18n.Values) => VueI18n.TranslateResult
  ): Record<string, unknown>[] {
    return results.map(result => this.getItem(result), t);
  }

  public getItem(
    result: T,
    t?: (key: VueI18n.Path, values?: VueI18n.Values) => VueI18n.TranslateResult
  ): Record<string, unknown> {
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

  public hasKeyFigure(mappingEntry: AnalysisResultMappingEntry<T>): boolean {
    return (
      mappingEntry.keyFigureId === undefined ||
      !!this.analysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId)
    );
  }

  public getPropertyName(mappingEntry: AnalysisResultMappingEntry<T>): string {
    return mappingEntry.getValue.toString().match(/({|=>)[^.]*\.([^;}]*)/)![2];
  }
}
