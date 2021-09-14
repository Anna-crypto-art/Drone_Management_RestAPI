export interface FeatureProperties {
  name: string;
  value: number | boolean;
}

export interface FeatureInfos {
  title: string;
  records: FeatureInfo[];
}

export interface FeatureInfo {
  name: string;
  value: string;
  descr?: string;
  bold?: boolean;
}

export interface Legend {
  id: string;
  entries: { color: string, name: string }[];
}