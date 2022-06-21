import { Legend } from "@/app/plant/shared/visualization/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
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
          color: this.getColor(),
          name:
            this.getLegendEntryTransName(
              "slope-deviation-class",
              this.analysisResult.csp_ptc.sdx_rms_class_limits,
              this.query?.sdx_class,
              "[mrad]"
            ) + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID };
  }

  protected getColor(): string {
    return this.getClassColor(this.query?.sdx_class);
  }
}
