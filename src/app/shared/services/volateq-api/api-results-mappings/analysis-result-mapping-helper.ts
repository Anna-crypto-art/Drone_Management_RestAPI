import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "../api-schemas/analysis-result-schema";
import { AnalysisResultMappingEntry, AnalysisResultMappings, BvTableFieldExtArray } from "./types";
import VueI18n from "vue-i18n";
import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";

export class AnalysisResultMappingHelper<T extends AnalysisResultSchemaBase> {
  private compareAnalysisResult: AnalysisResultDetailedSchema | null = null;

  constructor(
    private readonly analysisResultMapping: AnalysisResultMappings<T>,
    private readonly analysisResult: AnalysisResultDetailedSchema
  ) {}

  public setCompareAnalysisResult(compareAnalysisResult: AnalysisResultDetailedSchema | null) {
    this.compareAnalysisResult = compareAnalysisResult;
  }

  public getEntries(): AnalysisResultMappings<T> {
    return this.analysisResultMapping.filter(entry => this.hasKeyFigure(entry));
  }

  public getDiagramEntries(): AnalysisResultMappings<T> {
    return this.getEntries()
      .filter(entry => entry.enableForDiagram && (!this.compareAnalysisResult || !!entry.getDiffValue));
  }

  public getFields(): { key: string, filterType?: FilterFieldType }[] {
    return this.getEntries().map(entry => ({
      key: entry.transName,
      filterType: entry.filterType
    }));
  }

  public getColumns(transFunc: (transName: string) => VueI18n.TranslateResult): BvTableFieldExtArray {
    return this.getEntries().map(mappingEntry => ({
      key: mappingEntry.transName,
      label: transFunc(mappingEntry.transName).toString(),
      sortable: true,
      labelExpl: mappingEntry.transDescr,
    }));
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

    for (const mappingEntry of this.getEntries()) {
      item[mappingEntry.transName] = mappingEntry.getValue(result);

      if (mappingEntry.getDiffValue) {
        item[`${mappingEntry.transName}__diff`] = mappingEntry.getDiffValue(result as unknown);
      }
    }

    return item;
  }

  public getColumnsMapping(): Record<string, string> {
    const columnsMapping: Record<string, string> = {};

    for (const mappingEntry of this.getEntries()) {
      columnsMapping[mappingEntry.transName] = this.getPropertyName(mappingEntry);
    }

    return columnsMapping;
  }

  public hasKeyFigure(mappingEntry: AnalysisResultMappingEntry<T>): boolean {
    return (
      mappingEntry.keyFigureId === undefined ||
      (
        this.compareAnalysisResult === null &&
        !!this.analysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId)
      ) ||
      (
        this.compareAnalysisResult !== null &&
        !!this.analysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId) &&
        !!this.compareAnalysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId)
      )
    );
  }

  public getPropertyName(mappingEntry: AnalysisResultMappingEntry<T>): string {
    if (mappingEntry.transName === "pcs") {
      // special case.. regex is not working for this case...
      return "fieldgeometry_component.kks";
    }

    return mappingEntry.getValue.toString().match(/({|=>)[^.]*\.([^;}]*)/)![2];
  }
}
