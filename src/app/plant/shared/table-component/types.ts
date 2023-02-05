import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { TableFilterRequest, TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";

export interface ITableComponentContainer {
  startLoading(): void;
  stopLoading(): void;
}

export interface ITableComponent {
  search(searchText: string): void;
  getCsvColumnMappingsParam(): { [column_name: string]: string };
  getTableRequestParam(): TableRequest;
  getTableFilterParam(): TableFilterRequest | undefined;
  refresh(): void;
}

export interface ITablesComponent {
  activeComponents: TableResultComponent[];
}

export interface TableResultComponent {
  componentId: ApiComponent;
  descr?: string;
}

export interface TableResultMappingComponent extends TableResultComponent {
  mapping: AnalysisResultMappings<any>;
}

export interface TableResultMappingTabComponent extends TableResultMappingComponent {
  label: string;
  tabIndex: number;
}