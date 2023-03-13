import { GeoJSON } from "@/app/shared/components/app-geovisualization/types/layers";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { PropsFeature } from "../types";

export interface KeyFigureInfo {
  /**
   * will be translated (i18n)
   * unique name used as a (logical) id for a KeyFigureLayer and used for mapping to the value property
   */
  keyName?: string;
  /**
   * Define this name as a reference within template of visual(-csp-ptc/-pv) -> app-geovisualization
   */
  templateName?: string;
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

export interface SubKeyFigureInfo {
  /**
   * Define this name as a reference within template of visual-csp-tpc -> app-geovisualization
   */
  templateName?: string;
  /**
   * will translated (i18n) in legend and should be unique within the sublayers
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

export enum KeyFigureColorScheme {
  TRAFFIC_LIGHT = 0,
  RAINBOW = 1,
}

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

  metallicBlue = "#c2cfff",

  diagramYellow = "#d4b504",
  diagramRed = "#b50e02",

  diagramBad = "#dc3545",
  diagramGood = "#28a745",

  volateqBlue = "#066be2",
}

export interface OrthoImage {
   name: string,
   keyFigureId: ApiKeyFigure,
   available: boolean,
   features?: Feature<Geometry>[]
}

export type KeyFigureGeoJSON = GeoJSON<PropsFeature> & {
  custom: { components_total_count: number; mirrors_per_sce?: number };
}