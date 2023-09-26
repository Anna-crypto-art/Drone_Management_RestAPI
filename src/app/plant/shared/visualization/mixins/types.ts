import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";

export interface IOrthoImageMixin {
  analysisResult: AnalysisResultDetailedSchema | null;
  orthoImages: OrthoImage[] | null;
  isOrthoImageAvailable(orthoImage: OrthoImage, componentId: ApiComponent): boolean;
}

export interface OrthoImage {
  keyFigureId: ApiKeyFigure;
  name: string;
  features?: Feature<Geometry>[];
  componentId?: ApiComponent;
}
