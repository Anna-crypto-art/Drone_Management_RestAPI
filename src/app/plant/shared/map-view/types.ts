export interface FeatureProperties {
  name: string;
  value?: number | boolean | string | null;
  diff_value?: number;
}

export type PropsFeature = {
  properties: FeatureProperties;
}

export interface LegendEntry {
  color: string;
  name: string;
  indent?: boolean;
}

export interface Legend {
  id: string;
  entries: LegendEntry[];
  merge?: {
    name: string;
    count: number;
    metaSum?: number;
    metaIds?: string[];
  }
}

export interface FeatureImage {
  title: string;
  url: string;
}

export interface FeatureInfo {
  name: string;
  value: string;
  descr?: string;
  unit?: string;
  bold?: boolean;
  superAdminOnly?: boolean;
  hidden?: boolean;
  _visible?: boolean;
}

export interface FeatureInfos {
  images?: FeatureImage[];
  infos: FeatureInfo[];
}

export type ResultModMode = "null" | "false" | "true";