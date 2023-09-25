import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

export interface IImageMixin {
  analysisResult: AnalysisResultDetailedSchema | null;
}

export interface IOrthoImageMixin extends IImageMixin {
  orthoImages: OrthoImage[] | null;
  isOrthoImageAvailable(orthoImage: OrthoImage): boolean;
}

export interface IActionImageMixin extends IImageMixin {
  actionImages: ActionImage[] | null;
}

export interface MixinImage {
  keyFigureId: ApiKeyFigure;
}

export interface OrthoImage extends MixinImage {
  name: string;
  features?: Feature<Geometry>[];
}

export interface ActionImage extends MixinImage {
  actionName: string;
}
