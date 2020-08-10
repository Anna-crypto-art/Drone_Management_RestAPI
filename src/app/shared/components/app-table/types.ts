export interface AppTableColumn {
  name: string;
}
export interface AppTableColumns {
  [index: number]: AppTableColumn;
}
export interface AppTableCell {
  value: string;
}
export interface AppTableRow {
  cells: AppTableCell[];
  id: number;
}
export interface AppTableRows {
  [index: number]: AppTableRow;
}