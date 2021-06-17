import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";

export interface IActiveComponent {
  componentId: AnalysisResultComponent;
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