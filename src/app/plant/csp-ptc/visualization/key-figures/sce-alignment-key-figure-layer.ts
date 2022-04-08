import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import { OrientationKeyFigureLayer } from "./shared/orientation-key-figure-layer";
import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";

export class SceAlignmentKeyFigureLayer extends OrientationKeyFigureLayer<AnalysisResultCspPtcSceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSce;

  protected showPcsZoomLevel = 18;

  protected getOrientationOffsetClassLimits() {
    return this.analysisResult.csp_ptc.sce_alignment_deviation_to_drive_class_limits;
  }

  protected getClassColor(classValue?: number): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 1) {
        return this.getColorWithAlpha(KeyFigureColors.green, 0.1);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.35);
      }
    }

    return super.getClassColor(classValue);
  }
}
