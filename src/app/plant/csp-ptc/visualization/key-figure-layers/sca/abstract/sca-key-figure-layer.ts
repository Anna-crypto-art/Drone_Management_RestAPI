import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import analysisResultCspPtcMappingSca from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sca";
import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { Legend } from "@/app/plant/shared/visualization/types";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";

export abstract class ScaKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcScaSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSca;

  protected showPcsZoomLevel = 16;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.getColor(),
      }),
      text: this.showText(feature),
    });
  }

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
            this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getLegendEntryTransName(
    transClassName: string,
    classLimits: number[] | null,
    currentClass: 1 | 2 | 3 | undefined,
    unit: string
  ): string {
    if (!currentClass) {
      return this.vueComponent.$t(this.keyFigureInfo.displayName!).toString();
    }

    let limitRange = "";
    if (classLimits) {
      if (currentClass === 1) {
        limitRange = `0${unit} - ${classLimits[0]}${unit}: `;
      } else if (currentClass === 2) {
        limitRange = `${classLimits[0]}${unit} - ${classLimits[1]}${unit}: `;
      } else if (currentClass === 3) {
        limitRange = `${classLimits[1]}${unit} - &infin;${unit}: `;
      }
    }

    return limitRange + this.vueComponent.$t(transClassName + "-" + currentClass).toString();
  }

  protected abstract getColor(): string;

  protected getOrthoImageZIndex(): number {
    return 10;
  }
}
