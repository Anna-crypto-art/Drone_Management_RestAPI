import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";

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
  keyFigure: KeyFigureSchema;
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

export interface DiagramResultMappings {
  componentId: ApiComponent;
  resultMapping: AnalysisResultMappings<any>;
  tableFilter?: TableFilterRequest;
}