import { GeoJSON } from "@/app/shared/components/app-map/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PropsFeature } from "../types";
import { KeyFigureLayer } from "./key-figure-layer";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";

/**
 * Inspired by https://htmlcolorcodes.com/color-picker/
 *
 * We use TRIADIC color ranges:
 * RED - #AF0000
 * GREEN - #00AF00
 * BLUE - #0000AF
 *
 * Then we take any NEUTRAL color for each color range
 *
 * All names of the colors defined via https://colornames.org/
 */
export enum LayerColor {
  RED_retroBerry = "#af0000",
  RED_laveniumRed = "#af2c00",
  RED_coffeeWithChili = "#af5800",
  RED_solluxCaptor = "#af8300",
  RED_pizs = "#afaf00",
  RED_bebel = "#83af00",

  GREEN_theGreenOfLime = "#00af00",
  GREEN_toxicCoconut = "#00af2c",
  GREEN_dirtyLuigi = "#00af58",
  GREEN_frozenKermit = "#00af83",
  GREEN_minecraftStevesTShirt = "#00afaf",
  GREEN_boldWater = "#0083af",

  BLUE_jeopardyBlue = "#0000af",
  BLUE_midnightDarkRoyalBlue = "#2c00af",
  BLUE_gafaw = "#5800af",
  BLUE_iurple = "#8300af",
  BLUE_berryLover = "#af00af",
  BLUE_liturgicalTemptation = "#af0083",

  green = "green",
  strongGreen = "#00d400",
  yellow = "#ffff00",
  darkYellow = "#888800",
  red = "#ff0000",
  darkRed = "#880000",
  grey = "#666666",
  middleLightGrey = "#aaaaaa",
  lightGrey = "#cccccc",
  darkGrey = "#888888",
  black = "#000000",
  orange = "#ef7700",
  blue = "#0000ff",
  white = "#ffffff",

  metallicBlue = "#c2cfff",
  romanticRain = "#8491D1",

  diagramYellow = "#d4b504",
  diagramRed = "#b50e02",

  diagramBad = "#dc3545",
  diagramGood = "#28a745",

  volateqBlue = "#066be2",
}

interface CommonKeyFigureLayerOptions {
  /**
   * will be translated (i18n)
   * If the displayed name differs from keyName define displayName. If undefined, keyName will be used
   */
  displayName?: string;
  /**
   * will be translated (i18n)
   * description, shown with app-explanation
   */
  description?: string;
  /**
   * Overlay order of the layers. KeyFigureLayer start from 9.
   */
  zIndex?: number;
}

export interface KeyFigureLayerOptions extends CommonKeyFigureLayerOptions {
  /**
   * will be translated (i18n)
   * unique name used as a (logical) id for a KeyFigureLayer and used for mapping to the value property
   */
  keyName?: string; 
}

export enum KeyFigureColorScheme {
  TRAFFIC_LIGHT = 0,
  RAINBOW = 1,
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
  layerOptions?: KeyFigureLayerOptions;
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
    layerOptions?: CommonKeyFigureLayerOptions;
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

export type KeyFigureGeoJSON = GeoJSON<PropsFeature> & {
  custom: { components_total_count: number; mirrors_per_sce?: number };
}

export type ObservationGeoJSON = GeoJSON<PropsFeature>;

export type ComparedFeatures = Record<ComparedFeatureType, PropsFeature[]>;

export enum ComparedFeatureType {
  NO_CHANGE = 0,
  GONE_IMPROVED,
  GONE_WORSENED,
  NEW_IMPROVED,
  NEW_WORSENED,
  UNDEFINED,
}

export enum LayerEvent {
  ON_SELECTED = "ON_SELECTED",
  ON_KEY_FIGURE_SELECTED = "ON_KEY_FIGURE_SELECTED",
  ON_INV_AUTO_SELECT_SELECTED = "ON_INV_AUTO_SELECT_SELECTED",
  ON_SHOW_COULD_NOT_BE_MEASURED_CHANGED = "ON_SHOW_COULD_NOT_BE_MEASURED_CHANGED",
}

export type KeyFigureBaseLayer = KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>;

export interface LayerSettings {
  multiSelection: boolean;
  showCouldNotBeMeasured: boolean;
}

export interface OrthoImage {
  keyFigureId: ApiKeyFigure;
  name: string;
}