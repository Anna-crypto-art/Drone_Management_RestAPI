import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "../api-schemas/analysis-result-schema";
import { AnalysisResultMappingEntry, AnalysisResultMappings, RefMeasureMappingEntryValue } from "./types";
import VueI18n from "vue-i18n";
import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { ApiComponent } from "../api-components/api-components";
import { allCspPtcMappings } from "./csp_ptc/analysis-result-csp-ptc-mapping";
import { allPvMappings } from "./pv/analysis-result-pv-mapping";
import { ApiKeyFigure } from "../api-key-figures";
import { FeatureInfo, FeatureInfoType } from "@/app/plant/shared/map-view/map-view-popup/types";
import { i18n } from "@/main";
import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema, RefMeasureEntryValue } from "../api-schemas/reference-measurement-schema";

export class AnalysisResultMappingHelper<T extends AnalysisResultSchemaBase> {
  private compareAnalysisResult: AnalysisResultDetailedSchema | null = null;
  private tableView = false;

  public static getMappingsByComponentId(componentId: ApiComponent): AnalysisResultMappings<any, any> | null {
    for (const mappings of [allCspPtcMappings, allPvMappings]) {
      const compResultMapping = mappings.find(m => m.componentId === componentId);
      if (compResultMapping) {
        return compResultMapping.resultMapping;
      }
    }

    return null;
  }

  constructor(
    private readonly analysisResultMapping: AnalysisResultMappings<T>,
    private readonly analysisResult: AnalysisResultDetailedSchema | null = null,
    private readonly isSuperAdmin: boolean = false,
  ) {}

  public setCompareAnalysisResult(compareAnalysisResult: AnalysisResultDetailedSchema | null) {
    this.compareAnalysisResult = compareAnalysisResult;
  }

  public setTableView(tableView: boolean) {
    this.tableView = tableView;
  }

  public getEntries(): AnalysisResultMappings<T> {
    return this.analysisResultMapping.filter(entry => {
      return this.hasKeyFigure(entry) &&
        (!this.tableView || !entry.disableForTable) &&
        (!entry.superAdminOnly || this.isSuperAdmin);
    });
  }

  public findEntry(propertyName: string, keyFigureId: ApiKeyFigure): AnalysisResultMappingEntry<T> | null {
    return this.getEntries()
      .find(e => this.getPropertyName(e) === propertyName && e.keyFigureId === keyFigureId) || null;
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

  public getColumns(transFunc: (transName: string) => VueI18n.TranslateResult): AppTableColumns {
    return this.getEntries().map(mappingEntry => ({
      key: mappingEntry.transName,
      label: transFunc(mappingEntry.transName).toString() + 
        (mappingEntry.unit ? ` (${mappingEntry.unit})` : ""),
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
      let entryValue = mappingEntry.getValue(result);
      if (entryValue !== undefined && entryValue !== null && mappingEntry.formatter) {
        entryValue = mappingEntry.formatter(entryValue);
      }

      item[mappingEntry.transName] = entryValue;

      if (this.compareAnalysisResult && mappingEntry.getDiffValue) {
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
      this.analysisResult !== null && ((
        this.compareAnalysisResult === null &&
        !!this.analysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId)
      ) ||
      (
        this.compareAnalysisResult !== null &&
        !!this.analysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId) &&
        !!this.compareAnalysisResult.key_figures.find(keyFigure => keyFigure.id === mappingEntry.keyFigureId)
      ))
      || this.analysisResult === null
    );
  }

  public getPropertyName(mappingEntry: AnalysisResultMappingEntry<T>): string {
    if (mappingEntry.transName === "pcs") {
      // special case.. regex is not working for this case...
      return "fieldgeometry_component.kks";
    }

    return mappingEntry.getValue.toString().match(/({|=>)[^.]*\.([^;}]*)/)![2];
  }

  public toFeatureInfo(
    mappingEntry: AnalysisResultMappingEntry<T>,
    value: string,
    featureInfoType: FeatureInfoType,
    currentKeyFigureId?: ApiKeyFigure,
  ): FeatureInfo {
    return {
      type: featureInfoType,
      id: mappingEntry.transName,
      name: i18n.t(mappingEntry.transName).toString(),
      value: value +  (
        mappingEntry.valueDescr && value && value !== "0"
        ? " - " + i18n.t(mappingEntry.valueDescr + value).toString()
        : ""
      ),
      bold: currentKeyFigureId === mappingEntry.keyFigureId,
      descr: mappingEntry.transDescr && i18n.t(mappingEntry.transDescr).toString(),
      unit: value !== "" ? mappingEntry.unit : undefined,
      superAdminOnly: mappingEntry.superAdminOnly,
      hidden: currentKeyFigureId && 
        currentKeyFigureId !== mappingEntry.keyFigureId &&
        !mappingEntry.superAdminOnly
        || false,
    }
  }

  public getRefMeasureEntries(
    refMeasureEntry: RefMeasureEntry,
    refMeasureKeyFigures: RefMeasureEntryKeyFigureSchema[]
  ): RefMeasureMappingEntryValue[] {
    const rmMappingEntriesValues: RefMeasureMappingEntryValue[] = [];

    for (const rmKeyFigure of refMeasureKeyFigures) {
      if (refMeasureEntry.values && rmKeyFigure.entry_key_name in refMeasureEntry.values) {
        const mappingEntry = this.findEntry(rmKeyFigure.column_name, rmKeyFigure.key_figure_id);
        if (mappingEntry) {
          rmMappingEntriesValues.push({
            entry: mappingEntry,
            value: refMeasureEntry.values[rmKeyFigure.entry_key_name]
          });
        }
      }
    }

    return rmMappingEntriesValues;
  }     
}
