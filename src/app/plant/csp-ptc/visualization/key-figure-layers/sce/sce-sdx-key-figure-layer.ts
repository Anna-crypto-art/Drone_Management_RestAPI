import { Legend } from "@/app/plant/shared/visualization/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { SceKeyFigureLayer } from "./abstract/sce-key-figure-layer";

export class SceSdxKeyFigureLayer extends SceKeyFigureLayer {
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
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

  public getQueryClass(): number | undefined {
    return this.query?.sdx_class;
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }
}
