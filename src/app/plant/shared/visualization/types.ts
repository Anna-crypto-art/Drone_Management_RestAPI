import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { FeatureLike } from "ol/Feature";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureColors, KeyFigureInfo, SubKeyFigureInfo } from "./layers/types";

export interface LegendEntry {
  color: string;
  name: string;
  indent?: boolean;
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
  hideToast: () => void;
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
  actions?: FeatureActions;
}

export interface FeatureInfo {
  name: string;
  value: string;
  descr?: string;
  bold?: boolean;
}

export interface FeatureActions {
  buttonVariant: string;
  name: string;
  actions: FeatureAction[];
}

export interface FeatureAction {
  name: string;
  action: () => Promise<void>;
}

export type PropsFeature = FeatureLike & {
  properties: FeatureProperties;
}

export interface ComparedFeatures {
  /**
   * Features, that existed in the analysis before, but in the current analysis not anymore
   */
  goneFeatures: PropsFeature[];
  /**
   * Subset of "goneFeatures". Features, that have been fixed (class === 1)
   */
  goneFixedFeatures: PropsFeature[];
  /**
   * Subset of "goneFeatures". Features, that class decreased but is greater then 1, still
   */
  goneImprovedFeatures: PropsFeature[];
  /**
   * New features, that did not exist in the analysis before
   */
  newFeatures: PropsFeature[];
  /**
   * Subset of "newFeatures". Features in/with a lower class then before (diff_value < 0)
   */
  newImprovedFeatures: PropsFeature[];
  /**
   * Subset of "newFeatures". Features in/with a higher class then before (diff_value > 0)
   */
  newWorsenedFeatures: PropsFeature[];
}

export enum ComparedFeatureType {
  NO_CHANGE = 0,
  GONE_FIXED,
  GONE_IMPROVED,
  GONE_WORSENED,
  NEW_IMPROVED,
  NEW_WORSENED,
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
