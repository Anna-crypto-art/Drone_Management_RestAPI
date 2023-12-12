import { OrientationKeyFigureLayer } from "./abstract/orientation-key-figure-layer";

export class ScaAverageTrackingKeyFigureLayer extends OrientationKeyFigureLayer {
  protected getOrientationOffsetClassLimits() {
    return this.analysisResult.csp_ptc!.sca_average_tracking_offset_class_limits;
  }
}
