import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
// import { GroupLayer, IOpenLayersComponent } from "volateq-geovisualization";
import { KeyFigureLayer } from "./key-figures/shared/key-figure-layer";
import { Legend } from "./key-figures/shared/types";

export interface GroupKPILayer { 
  componentId?: AnalysisResultComponent;
  groupLayer: GroupLayer;
  subGroupLayers?: GroupKPILayer[];
  keyFigureLayers: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[];
}

export interface IPlantVisualization {
  plant: PlantSchema;
  openLayers: IOpenLayersComponent;
  onLayerSelected(selected: boolean, legend?: Legend);
}