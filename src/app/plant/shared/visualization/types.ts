import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ReferenceMeasurementValueSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { FeatureLike } from "ol/Feature";
import { ComponentLayer } from "./layers/component-layer";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureColors, KeyFigureInfo, SubKeyFigureInfo } from "./layers/types";
import { PILayersHierarchy } from "./pi-layers-hierarchy";

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
  onLayerSelected(selected: boolean, legend: Legend | undefined): Promise<void>;
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
  unit?: string;
  bold?: boolean;
  superAdminOnly?: boolean;
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

export type ComparedFeatures = Record<ComparedFeatureType, PropsFeature[]>;

export enum ComparedFeatureType {
  NO_CHANGE = 0,
  GONE_IMPROVED,
  GONE_WORSENED,
  NEW_IMPROVED,
  NEW_WORSENED,
}

export type KeyFigureTypeMap = {
  keyFigureId: ApiKeyFigure;
  /**
   * (typeof KeyFigureLayer) leads to: Type "T" is not assignable to type "AnalysisResultCspPtcHceSchema"
   */
  layerType: any; // 
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
    /**
     * Invisble layer that will be selected, if any sibling is selected
     */
    invisibleAutoSelection?: boolean;
  }[];
};



export interface InvisibleAutoSelectionLayer {
  layer: KeyFigureLayer<AnalysisResultSchemaBase>,
  hasSelectedSiblings: boolean,
}