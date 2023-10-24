import { ObservationSchema } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";

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

export interface ObservationFeatures {
  observation: ObservationSchema;
  title: string;
  featureInfos: FeatureInfos;
  editable: boolean;
}