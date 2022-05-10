import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";

export interface GroupedAnalysisResult {
  kks: string;
  [column: string]: number | string;
}

export interface AnalysisHistoryResult {
  flown_at: string;
  [column: string]: number | string;
}

export interface BarChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

export interface DiagramNumberBox {
  keyFigureId: ApiKeyFigure;
  keyFigureName: string;
  num: number | string;
  diff: number | string | null;
  unit: string | null;
  variant: string | null;
  active: boolean;
}

export interface DiagramNumberBoxComponentGroup {
  componentName: string;
  numberBoxes: DiagramNumberBox[];
}