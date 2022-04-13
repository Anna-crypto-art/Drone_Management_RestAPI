export interface GroupedAnalysisResult {
  kks: string;
  [column: string]: number | string;
}

export interface BarChartData {
  labels: string[];
  datasets: { data: number[] }[];
}