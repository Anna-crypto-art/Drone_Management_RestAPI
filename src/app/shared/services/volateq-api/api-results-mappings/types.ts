import { BvTableField, BvTableFieldArray } from "bootstrap-vue";
import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcSchemaBase } from "../api-schemas/analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcMappingEntry<T extends AnalysisResultCspPtcSchemaBase> {
  getValue: (result: T) => unknown;
  transName: string;
  transDescr?: string;
  keyFigureId?: AnalysisResultKeyFigure;
}

export type AnalysisResultCspPtcMappings<T extends AnalysisResultCspPtcSchemaBase> = AnalysisResultCspPtcMappingEntry<T>[];

export interface BvTableFieldExt extends BvTableField {
  labelExpl?: string;
}

export type BvTableFieldExtArray = Array<string | ({ key: string } & BvTableFieldExt)>;
