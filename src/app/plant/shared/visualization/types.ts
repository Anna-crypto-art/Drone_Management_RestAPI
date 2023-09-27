import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ReferenceMeasurementEntriesSchema, RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { FeatureLike } from "ol/Feature";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { LayerColor, KeyFigureInfo, SubKeyFigureInfo } from "./layers/types";
import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { ObservationCcpLayer } from "./layers/observation-ccp-layer";
import { ComponentLayer } from "./layers/component-layer";

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

export interface GroupKPILayer {
  componentId?: ApiComponent;
  groupLayer: GroupLayer;
  subGroupLayers?: GroupKPILayer[];
  keyFigureLayers: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>[];
}

export interface ValueRangeGroupObservLayer {
  ccp: CustomComponentPropertySchema;
  groupLayer: GroupLayer;
  childLayers: ObservationCcpLayer[];
}

export interface ComponentGroupObservLayer {
  componentId: ApiComponent;
  componentLayer: ComponentLayer;
  groupLayer: GroupLayer;
  childLayers: (ValueRangeGroupObservLayer | ObservationCcpLayer)[];
}

export interface IPlantVisualization {
  plant: PlantSchema;
  openLayers: IOpenLayersComponent | undefined;
  onLayerSelected(selected: boolean, legend: Legend | undefined): Promise<void>;
  hideToast: () => void;
  enableResultsModification: boolean;
  showRefMeasureModal(
    fieldgeometryComponent: FieldgeometryComponentSchema,
    myRefMeasureEntry: RefMeasureEntry | null,
    myRefMeasureEntryKeyFigures: RefMeasureEntryKeyFigureSchema[] | null,
  ): void;
  showObservModal(
    fieldgeometryComponent: FieldgeometryComponentSchema
  ): Promise<void>;
  refMeasuredPcsCodes: string[];
  setLoading(loading: boolean): void;
  piToastInfo: FeatureInfos;
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

export type PropsFeature = {
  properties: FeatureProperties;
}

export type ComparedFeatures = Record<ComparedFeatureType, PropsFeature[]>;

export enum ComparedFeatureType {
  NO_CHANGE = 0,
  GONE_IMPROVED,
  GONE_WORSENED,
  NEW_IMPROVED,
  NEW_WORSENED,
  UNDEFINED,
}

export type KeyFigureTypeMap<T extends GeoVisualQuery> = {
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
  query?: T;
  /**
   * Leave color undefined to take the default color mapped to the key figure.
   */
  color?: LayerColor;
  /**
   * If the layer has subLayers it will be handled as a group layer.
   */
  subLayers?: {
    keyFigureInfo?: SubKeyFigureInfo;
    /**
     * URL query parameters
     */
    query?: T;
    /**
     * Leave color undefined to take the default color mapped to the key figure.
     */
    color?: LayerColor;
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
  layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>,
  hasSelectedSiblings: boolean,
}