import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";

export interface ITableComponent {
  search(searchText: string): void;
  getCsvDownloadUrl(): string;
  refresh(): void;
}

export interface ITablesComponent {
  activeComponents: TableTabComponent[];
}

export interface TableTabComponent {
  componentId: ApiComponent;
  descr?: string;
}

export interface LabelledTableTabComponent extends TableTabComponent {
  label: string;
  tabIndex: number;
  tableRefName: string;
}

export interface ResultMappingTableTabComponent extends LabelledTableTabComponent {
  mapping: AnalysisResultMappings<any>;
}