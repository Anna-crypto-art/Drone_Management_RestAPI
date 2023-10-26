import { ObservationSchema } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";

export interface FeatureImage {
  title: string;
  url: string;
}

export interface FeatureInfoHistoryValue {
  value: string;
  date: string;
  descr?: string;
  bold?: boolean;
}

export enum FeatureInfoType {
  PI,
  REF_MEASURE,
  OBSERVATION,
}

export interface FeatureInfo {
  type: FeatureInfoType;
  id: string;
  name: string;
  value: string;
  descr?: string;
  unit?: string;
  bold?: boolean;
  superAdminOnly?: boolean;
  hidden?: boolean;
  collapsable?: boolean;
}

export interface ObservFeatureInfo extends FeatureInfo {
  type: FeatureInfoType.OBSERVATION;
  observation: ObservationSchema;
}

export interface FeatureInfos<F = FeatureInfo> {
  images?: FeatureImage[];
  infos: F[];
}

export type ResultModMode = "null" | "false" | "true";

export interface ObservationFeatures {
  observation: ObservationSchema;
  title: string;
  featureInfos: FeatureInfos;
  editable: boolean;
}

export interface InternalFeatureInfo extends FeatureInfo {
  visible: boolean;
  collapsed: boolean;
  historyValues: FeatureInfoHistoryValue[] | null;
}