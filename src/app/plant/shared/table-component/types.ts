import { TableFilterRequest, TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { IActiveComponent } from "../types";

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
  activeComponents: IActiveComponent[];
}
