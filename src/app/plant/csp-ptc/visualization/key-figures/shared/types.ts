import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

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

export interface Legend {
  id: string;
  entries: { color: string, name: string }[];
}

/**
 * URL query parameters and color for a layer
 */
export interface QueryColor {
  query: GeoVisualQuery;
  color: string;
}

export interface KeyFigureInfo {
  /**
   * will translated (i18n)
   * unique name used as a (logical) id for a KeyFigureLayer
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

export enum KeyFigureColors {
  green = "green",
  yellow = "yellow",
  red = "red",
  grey = "grey",
}