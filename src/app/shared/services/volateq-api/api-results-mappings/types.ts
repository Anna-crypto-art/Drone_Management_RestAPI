import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { BvTableField } from "bootstrap-vue";
import { ApiKeyFigure } from "../api-key-figures";
import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";

export interface AnalysisResultMappingEntry<T extends AnalysisResultSchemaBase, C = any> {
  getValue: (result: T) => unknown;
  transName: string;
  transDescr?: string;
  keyFigureId?: ApiKeyFigure;
  filterType?: FilterFieldType;
  enableForDiagram?: boolean;
  unit?: string;
  getDiffValue?: (result: C) => unknown;
  formatter?: (value: unknown) => string;
}

export type AnalysisResultMappings<T extends AnalysisResultSchemaBase, C = any> = AnalysisResultMappingEntry<T, C>[];

export interface BvTableFieldExt extends BvTableField {
  labelExpl?: string;
}

export type BvTableFieldExtArray = Array<string | ({ key: string } & BvTableFieldExt)>;
