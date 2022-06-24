import { OrientationKeyFigureLayer } from "./abstract/orientation-key-figure-layer";

export class ScaTrackingKeyFigureLayer extends OrientationKeyFigureLayer {
  protected getOrientationOffsetClassLimits() {
    return this.analysisResult.csp_ptc.sca_tracking_encoder_offset_class_limits;
  }
}
