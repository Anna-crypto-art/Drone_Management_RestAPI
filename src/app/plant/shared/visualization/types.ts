import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureInfo, QueryColor, SubKeyFigureInfo } from "./layers/types";


export interface Legend {
  id: string;
  entries: { color: string, name: string }[];
}

export interface GroupKPILayer { 
  componentId?: AnalysisResultComponent;
  groupLayer: GroupLayer;
  subGroupLayers?: GroupKPILayer[];
  keyFigureLayers: KeyFigureLayer<AnalysisResultSchemaBase>[];
}

export interface IPlantVisualization {
  plant: PlantSchema;
  openLayers: IOpenLayersComponent | undefined;
  onLayerSelected(selected: boolean, legend?: Legend);
}

export interface FeatureProperties {
  name: string;
  value?: number | boolean | string | null;
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

export type KeyFigureTypeMap = {
  keyFigureId: AnalysisResultKeyFigure,
  layerType: any, // (typeof KeyFigureLayer) leads to: Type "T" is not assignable to type "AnalysisResultCspPtcHceSchema"
  /**
   * applies to all subLayers if not overwritten
   */
  keyFigureInfo?: KeyFigureInfo,
  /**
   * URL query parameters and color for the layer
   */
  queryColor?: QueryColor,
  /**
   * If the layer has subLayers it will be handled as a group layer.
   */
  subLayers?: { keyFigureInfo?: SubKeyFigureInfo, queryColor: QueryColor }[],
};