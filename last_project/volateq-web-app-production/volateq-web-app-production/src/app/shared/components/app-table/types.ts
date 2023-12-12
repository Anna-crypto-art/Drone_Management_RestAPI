import { BvTableField } from "bootstrap-vue";

export interface AppTableColumnOptions extends BvTableField {
  labelExpl?: string;
  superAdminOnly?: boolean;
}

export type AppTableColumns = Array<string | ({ key: string } & AppTableColumnOptions)>

export interface IAppSelectTable {
  selectRow(rowIndex: number): void;
  unselectRow(rowIndex: number): void;
  clearSelected(): void;
  selectAllRows(): void;
}

export interface IAppTable {
  refresh(): Promise<void>;
}