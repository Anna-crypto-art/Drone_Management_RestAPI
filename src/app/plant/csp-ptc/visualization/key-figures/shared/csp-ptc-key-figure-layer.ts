import { IPlantVisualization, Legend } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { KeyFigureLayer } from "@/app/plant/shared/visualization/layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureInfo } from "@/app/plant/shared/visualization/layers/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { cspPtcKeyFigureColors } from "../../../csp-ptc-key-figure-colors";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export abstract class CspPtcKeyFigureLayer<T extends AnalysisResultSchemaBase> extends KeyFigureLayer<T> {
  constructor(
    vueComponent: Vue & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    protected readonly keyFigureId: ApiKeyFigure,
    public readonly keyFigureInfo: KeyFigureInfo,
    public readonly query?: GeoVisualQuery,
    protected readonly color?: KeyFigureColors
  ) {
    super(vueComponent, analysisResult, keyFigureId, keyFigureInfo, query, color);

    if (!this.color) {
      this.color = cspPtcKeyFigureColors[this.keyFigureId];
    }
  }

  protected getClassColor(classValue: number | undefined): string {
    if (classValue === 1) {
      return this.getColorWithAlpha(KeyFigureColors.green, 0.3);
    }

    if (classValue === 2) {
      return this.getColorWithAlpha(this.color!, 0.5);
    }

    return this.color!;
  }
}
