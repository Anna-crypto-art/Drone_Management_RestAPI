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
