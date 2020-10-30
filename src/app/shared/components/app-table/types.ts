export interface AppTableColumn {
  name: string;
}
export interface AppTableColumns {
  [index: number]: AppTableColumn;
}
export interface AppTableCell {
  showOnHoverOnly?: boolean;
  value: string;
}
export interface AppTableRow {
  cells: AppTableCell[];
  id: string;
}
export interface AppTableRows {
  [index: number]: AppTableRow;
}