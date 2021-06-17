import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { GroupLayer } from "volateq-geovisualization";
import { KeyFigureLayer } from "./key-figures/shared/key-figure-layer";

export interface GroupKPILayer { 
  componentId: AnalysisResultComponent;
  groupLayer: GroupLayer;
  kpiLayers: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[];
}