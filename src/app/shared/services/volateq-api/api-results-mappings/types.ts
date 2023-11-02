import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { BvTableField } from "bootstrap-vue";
import { ApiComponent } from "../api-components/api-components";
import { ApiKeyFigure } from "../api-key-figures";
import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { RefMeasureEntryValue } from "../api-schemas/reference-measurement-schema";

export enum PIDataType {
  BOOLEAN = 1,
  NUMERIC = 2,
}

export interface AnalysisResultMappingEntry<T extends AnalysisResultSchemaBase = AnalysisResultSchemaBase, C = any> {
  getValue: (result: T) => unknown;
  getDiffValue?: (result: C) => unknown;
  transName: string;
  transDescr?: string;
  keyFigureId?: ApiKeyFigure;
  dataType?: PIDataType;
  unit?: string;
  formatter?: (value: unknown) => string;
  enableForDiagram?: boolean;
  disableForTable?: boolean;
  enableForRefMeasure?: boolean;
  enableForObservation?: boolean;
  enableForFilter?: boolean;
  superAdminOnly?: boolean;
  valueDescr?: string;
}

export interface AnalysisResultMappingEntryWithPiFieldName<T extends AnalysisResultSchemaBase = AnalysisResultSchemaBase> extends AnalysisResultMappingEntry<T> {
  piFieldName: string;
}

export type AnalysisResultMappings<T extends AnalysisResultSchemaBase, C = any> = AnalysisResultMappingEntry<T, C>[];

export interface ComponentResultMappings {
  componentId: ApiComponent;
  resultMapping: AnalysisResultMappings<any>;
}

export interface RefMeasureMappingEntryValue { 
  entry: AnalysisResultMappingEntry<any>, 
  value: RefMeasureEntryValue 
}