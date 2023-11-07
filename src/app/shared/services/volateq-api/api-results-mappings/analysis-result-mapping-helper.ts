import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "../api-schemas/analysis-result-schema";
import { AnalysisResultMappingEntry, AnalysisResultMappingEntryWithPiFieldName, AnalysisResultMappings, PI, PIDataType } from "./types";
import VueI18n from "vue-i18n";
import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { ApiComponent } from "../api-components/api-components";
import { ApiKeyFigure } from "../api-key-figures";
import { FeatureInfo, FeatureInfoType } from "@/app/plant/shared/map-view/map-view-popup/types";
import { i18n } from "@/main";
import { allMappings } from "./analysis-result-mapping";
import { EnabledPiFieldsService } from "@/app/plant/shared/plant-settings/enabled-pi-fields-service";

export class AnalysisResultMappingHelper<T extends AnalysisResultSchemaBase> {
  private compareAnalysisResult: AnalysisResultDetailedSchema | null = null;
  private tableView = false;

  public static getMappingsByComponentId(componentId: ApiComponent): AnalysisResultMappings<any, any> | null {
    const compResultMapping = allMappings.find(m => m.componentId === componentId);
    if (compResultMapping) {
      return compResultMapping.resultMapping;
    }

    return null;
  }

  public static getMappingsByKeyFigureId(keyFigureId: ApiKeyFigure): AnalysisResultMappingEntry[] {
    for (const compResultMapping of allMappings) {
      const mappingEntries = compResultMapping.resultMapping.filter(e => e.keyFigureId == keyFigureId);
      if (mappingEntries.length > 0) {
        return mappingEntries;
      }
    }

    return [];
  }

  public static getPIs(pis: { keyFigureId: ApiKeyFigure, piFieldName: string }[]): PI[] {
    const mappingEntries: PI[] = [];
    
    for (const compResultMapping of allMappings) {
      mappingEntries.push(
        ...compResultMapping.resultMapping
          .filter(e => pis.find(pi => pi.keyFigureId === e.keyFigureId && pi.piFieldName === AnalysisResultMappingHelper.getPropertyName(e)))
          .map(e => ({ 
            ...e, 
            keyFigureId: e.keyFigureId!,
            dataType: e.dataType!,
            componentId: compResultMapping.componentId,
            piFieldName: AnalysisResultMappingHelper.getPropertyName(e),
            id: AnalysisResultMappingHelper.getEntryId(e),
          }))
        );
    }

    return mappingEntries;
  }

  public static getPropertyName(mappingEntry: AnalysisResultMappingEntry): string {
    if (mappingEntry.transName === "pcs") {
      // special case.. regex is not working for this case...
      return "fieldgeometry_component.kks";
    }

    return mappingEntry.getValue.toString().match(/({|=>)[^.]*\.([^;}]*)/)![2];
  }

  public static getEntryId(mappingEntry: AnalysisResultMappingEntry<any> | AnalysisResultMappingEntryWithPiFieldName<any>): string {
    const mappingEntryWithPiFieldName: AnalysisResultMappingEntryWithPiFieldName = "piFieldName" in mappingEntry ? 
        mappingEntry : { ...mappingEntry, piFieldName: this.getPropertyName(mappingEntry) };

    return `__${mappingEntry.keyFigureId}__${mappingEntryWithPiFieldName.piFieldName}__`;
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

  public getFilterFields(): { key: string, filterType?: FilterFieldType }[] {
    return this.getEntries().filter(e => e.enableForFilter).map(entry => ({
      key: entry.transName,
      filterType: this.convertPiDataTypeToFilterFieldType(entry.dataType)
    }));
  }

  public convertPiDataTypeToFilterFieldType(piDataType?: PIDataType): FilterFieldType | undefined {
    switch (piDataType) {
      case PIDataType.BOOLEAN:
        return FilterFieldType.BOOLEAN;

      case PIDataType.NUMERIC:
        return FilterFieldType.NUMERIC_EXTENDED;
    }
  }

  public getColumns(transFunc: (transName: string) => VueI18n.TranslateResult): AppTableColumns {
    return this.getEntries().map(mappingEntry => ({
      key: mappingEntry.transName,
      label: transFunc(mappingEntry.transName).toString() + 
        (mappingEntry.unit ? ` (${mappingEntry.unit})` : ""),
      sortable: true,
      labelExpl: mappingEntry.transDescr && transFunc(mappingEntry.transDescr).toString(),
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
    return AnalysisResultMappingHelper.getPropertyName(mappingEntry as any);
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

  public getEntriesForObservations(): AnalysisResultMappingEntryWithPiFieldName<T>[] {
    return this.withPiFieldNames().filter(e => e.enableForRefMeasure || e.enableForObservation);
  }

  public getEntryId(mappingEntry: AnalysisResultMappingEntry<T> | AnalysisResultMappingEntryWithPiFieldName<T>): string {
    return AnalysisResultMappingHelper.getEntryId(mappingEntry);
  }

  public async getEnabledEntries(plantId: string): Promise<AnalysisResultMappingEntryWithPiFieldName<T>[]> {
    const enabledPiFields = await EnabledPiFieldsService.get(plantId).getEnabledPiFields();

    return this.withPiFieldNames().filter(e => 
      enabledPiFields.find(pi => pi.pi_field_name === e.piFieldName && pi.key_figure.id === e.keyFigureId));
  }

  public withPiFieldNames(): AnalysisResultMappingEntryWithPiFieldName<T>[] {
    return this.analysisResultMapping.map(e => ({...e, piFieldName: this.getPropertyName(e) }));
  }
}
