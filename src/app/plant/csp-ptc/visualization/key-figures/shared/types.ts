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