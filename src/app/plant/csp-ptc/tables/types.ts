import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";

export interface IActiveComponent {
  componentId: number;
  mapping: AnalysisResultCspPtcMappings<AnalysisResultCspPtcSchemaBase>;
  label: string;
  descr?: string;
}

export interface IActiveTabComponent extends IActiveComponent {
  tabIndex: number;
}

export interface ITableComponent {
  search(searchText: string): void;
  getCsvColumnMappingsParam(): { [column_name: string]: string };
  getTableRequestParam(): TableRequest;
  refresh(): void;
}