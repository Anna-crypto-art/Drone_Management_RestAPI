export interface BvSelectOption {
  text: string;
  value: any;
}

export interface BvSelectGroupOption {
  label: string;
  options: BvSelectOption[];
}

export type BvSelectCombinedOption = BvSelectOption | BvSelectGroupOption;