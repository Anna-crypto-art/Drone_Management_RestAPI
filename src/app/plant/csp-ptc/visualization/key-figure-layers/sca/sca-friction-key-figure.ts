import { FeatureInfos, Legend } from "@/app/plant/shared/visualization/types";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import { ScaKeyFigureLayer } from "./abstract/sca-key-figure-layer";

export class ScaFrictionKeyFigureLayer extends ScaKeyFigureLayer {
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureInfo.displayName || this.keyFigureId.toString(),
      entries: [
        {
          color: this.getColor(),
          name:
            this.getLegendEntryTransName(
              "sca-torsion-class",
              this.analysisResult.csp_ptc.sca_torsion_class_limits,
              this.query?.torsion_class,
              "°"
            ) + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: this.keyFigureId };
  }

  protected mapResultToFeatureInfos(result: AnalysisResultCspPtcScaSchema): FeatureInfos | undefined {
    const featureInfos = super.mapResultToFeatureInfos(result);

    if (result.torsion_banana_image_url && featureInfos) {
      featureInfos.images = [{ title: "Torsion image", url: result.torsion_banana_image_url }];
    }

    return featureInfos;
  }

  protected getColor(): string {
    return this.getClassColor(this.query?.torsion_class);
  }
}
