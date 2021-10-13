import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export interface FeatureProperties {
  name: string;
  value: number | boolean;
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

export interface QueryColor {
  query: GeoVisualQuery;
  color: string;
}

export interface KeyFigureInfo {
  keyName?: string;
  templateName?: string;
  // if displayName is undefined, keyName will be used
  displayName?: string;
}