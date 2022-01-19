import { BvTableField } from "bootstrap-vue";
import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";

export interface AnalysisResultMappingEntry<T extends AnalysisResultSchemaBase> {
  getValue: (result: T) => unknown;
  transName: string;
  transDescr?: string;
  keyFigureId?: AnalysisResultKeyFigure;
}

export type AnalysisResultMappings<T extends AnalysisResultSchemaBase> = AnalysisResultMappingEntry<T>[];

export interface BvTableFieldExt extends BvTableField {
  labelExpl?: string;
}

export type BvTableFieldExtArray = Array<string | ({ key: string } & BvTableFieldExt)>;
