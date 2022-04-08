import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export interface KeyFigureInfo {
  /**
   * will translated (i18n)
   * unique name used as a (logical) id for a KeyFigureLayer and used for mapping to the value property
   */
  keyName?: string;
  /**
   * Define this name as a reference within template of visual-csp-tpc -> app-geovisualization
   */
  templateName?: string;
  /**
   * will translated (i18n)
   * If the displayed name differs from keyName define displayName. If undefined, keyName will be used
   */
  displayName?: string;
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
export enum KeyFigureColors {
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
  black = "#000000",
  orange = "#ef7700",
}
