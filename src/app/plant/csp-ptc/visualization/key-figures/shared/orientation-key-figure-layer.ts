import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { OffsetClassKeyFigureLayer } from "./offset-class-key-figure-layer";

export abstract class OrientationKeyFigureLayer<T extends AnalysisResultSchemaBase> extends OffsetClassKeyFigureLayer<T> {
  protected abstract getOrientationOffsetClassLimits(): number[];

  protected getOffsetClassLimits(): number[] {
    return this.getOrientationOffsetClassLimits();
  }

  protected getQueryOffsetClass(): number | undefined {
    return this.query?.orientation_offset_class;
  }
}
