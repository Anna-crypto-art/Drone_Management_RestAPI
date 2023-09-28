import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ReferenceMeasurementEntriesSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";

export interface IAppMapView {
  plant: PlantSchema;
  setLoading(loading: boolean): Promise<void>;
}

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

export interface FeatureInfoGroup {
  title: string;
  records: FeatureInfo[];
}

export interface FeatureInfos {
  groups: FeatureInfoGroup[];
  title?: string;
  images?: FeatureImage[];
  actionsSummaries?: FeatureActionsSummary[];
}

export interface FeatureInfosMeta {
  fieldgeoComponent?: FieldgeometryComponentSchema;
  refMeasureEntries?: ReferenceMeasurementEntriesSchema;
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

export interface FeatureActionsSummary {
  buttonVariant: string;
  name: string;
  actions: FeatureAction[];
  superAdminOnly?: boolean;
}

export interface FeatureAction {
  name: string;
  action: () => Promise<void>;
}