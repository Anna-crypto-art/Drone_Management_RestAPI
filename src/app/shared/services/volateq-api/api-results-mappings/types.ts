import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { BvTableField } from "bootstrap-vue";
import { ApiComponent } from "../api-components/api-components";
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
  disableForTable?: boolean;
  superAdminOnly?: boolean;
}

export type AnalysisResultMappings<T extends AnalysisResultSchemaBase, C = any> = AnalysisResultMappingEntry<T, C>[];

export interface ComponentResultMappings {
  componentId: ApiComponent;
  resultMapping: AnalysisResultMappings<any>;
}