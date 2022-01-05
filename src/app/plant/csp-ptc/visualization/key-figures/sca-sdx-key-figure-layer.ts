import { FeatureInfos, Legend } from "@/app/plant/shared/visualization/types";
import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import { ScaKeyFigureLayer } from "./shared/sca-key-figure-layer";


export class ScaSdxKeyFigureLayer extends ScaKeyFigureLayer {
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureInfo.displayName || this.keyFigureId.toString(),
      entries: [
        {
          color: this.color!,
          name: this.getLegendEntryTransName(
            "slope-deviation-class",
            this.analysisResult.csp_ptc.sdx_rms_class_limits,
            this.query?.sdx_class,
            "[mrad]") + this.getLegendEntryCount(),
        }
      ]
    };
  }

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_SDX_ID };
  }

  protected mapResultToFeatureInfos(result: AnalysisResultCspPtcScaSchema): FeatureInfos | undefined {
    const featureInfos = super.mapResultToFeatureInfos(result);

    if (result.ortho_image_sdx_url && featureInfos) {
      featureInfos.images = [{ title: "SDX Image", url: result.ortho_image_sdx_url }];
    }

    return featureInfos;
  }

  protected getColor(): string {
    return this.getClassColor(this.query?.sdx_class);
  }
}