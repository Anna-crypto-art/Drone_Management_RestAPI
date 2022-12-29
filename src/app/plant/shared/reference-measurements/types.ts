import { ReferenceMeasurementValueSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { ComponentLayer } from "../visualization/layers/component-layer";
import { PILayersHierarchy } from "../visualization/pi-layers-hierarchy";

export interface ReferenceMeasurementOptions { 
  analysisLoaded: boolean;
  analysisId: string | null;
  analysisName: string | null;
  oldMeasureId: string | null;
  measureDate: string | null;
  notes: string | null;
  gps: boolean;
}

export interface ReferenceMeasurementEventObject {
  options: ReferenceMeasurementOptions,
  componentLayers: ComponentLayer[],
  piLayersHierarchy: PILayersHierarchy,
  refMeasureId: string,
  refMeasureValues: ReferenceMeasurementValueSchema[];
}