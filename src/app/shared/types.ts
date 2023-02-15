export interface BvSelectOption {
  text: string;
  value: any;
  disabled?: boolean;
}

export interface BvSelectGroupOption {
  label: string;
  options: BvSelectOption[];
}

export type BvSelectCombinedOption = BvSelectOption | BvSelectGroupOption;

export interface BvTableCellData {
  item: any;
  value: any;
  field: { key: string, label: string };
}