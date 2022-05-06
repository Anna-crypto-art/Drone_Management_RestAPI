import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureColors, KeyFigureInfo, SubKeyFigureInfo } from "./layers/types";

export interface LegendEntry {
  color: string;
  name: string;
}

export interface Legend {
  id: string;
  entries: LegendEntry[];
}

export interface GroupKPILayer {
  componentId?: ApiComponent;
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
  diff_value?: number;
}

export interface FeatureImage {
  title: string;
  url: string;
}

export interface FeatureInfos {
  title: string;
  records: FeatureInfo[];
  images?: FeatureImage[];
}

export interface FeatureInfo {
  name: string;
  value: string;
  descr?: string;
  bold?: boolean;
}

export type KeyFigureTypeMap = {
  keyFigureId: ApiKeyFigure;
  layerType: any; // (typeof KeyFigureLayer) leads to: Type "T" is not assignable to type "AnalysisResultCspPtcHceSchema"
  /**
   * applies to all subLayers if not overwritten
   */
  keyFigureInfo?: KeyFigureInfo;
  /**
   * URL query parameters
   */
  query?: GeoVisualQuery;
  /**
   * Leave color undefined to take the default color mapped to the key figure.
   */
  color?: KeyFigureColors;
  /**
   * If the layer has subLayers it will be handled as a group layer.
   */
  subLayers?: {
    keyFigureInfo?: SubKeyFigureInfo;
    /**
     * URL query parameters
     */
    query?: GeoVisualQuery;
    /**
     * Leave color undefined to take the default color mapped to the key figure.
     */
    color?: KeyFigureColors;
    /**
     * Optional condition, to define whether the PI should be displayed or not
     */
    displayCondition?: (anaysisResult: AnalysisResultDetailedSchema) => boolean;
  }[];
};
