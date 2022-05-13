import { IPlantVisualization, Legend } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { KeyFigureLayer } from "@/app/plant/shared/visualization/layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureColorScheme, KeyFigureInfo } from "@/app/plant/shared/visualization/layers/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { cspPtcKeyFigureRainbowColors } from "../../../csp-ptc-key-figure-colors";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";

export abstract class CspPtcKeyFigureLayer<T extends AnalysisResultSchemaBase> extends KeyFigureLayer<T> {
  constructor(
    vueComponent: Vue & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    protected readonly keyFigureId: ApiKeyFigure,
    public readonly keyFigureInfo: KeyFigureInfo,
    public readonly query?: GeoVisualQuery,
    protected readonly initColor?: KeyFigureColors,
  ) {
    super(vueComponent, analysisResult, keyFigureId, keyFigureInfo, query, initColor);
  }

  protected created(): void {
    super.created();

    this.orthoImages = [
      { name: "RGB", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ID, available: false },
      { name: "IR", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID, available: false },
      { name: "SDX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID, available: false },
    ];

    this.setOrthoImageAvailable();
  }

  protected get color(): string {
    if (this.initColor) {
      return this.initColor;
    }

    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      return cspPtcKeyFigureRainbowColors[this.keyFigureId];
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      return KeyFigureColors.red;
    }

    throw new Error("Unexpected colorScheme: " + this.colorScheme);
  }

  protected getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 1) {
        return this.getColorWithAlpha(KeyFigureColors.green, 0.3);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.5);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      if (classValue === 1) {
        return KeyFigureColors.green;
      }
      
      if (classValue === 2) {
        return KeyFigureColors.yellow;
      }
    }

    return this.color!;
  }
}
