import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";

export interface TableRequest {
  limit?: number;
  page?: number;
  order_by?: string | null;
  order_direction?: "asc" | "desc";
  filter?: string;
  filter_mode?: "contains" | "equals";
  key_figure_image_url?: AnalysisResultKeyFigure;
}
