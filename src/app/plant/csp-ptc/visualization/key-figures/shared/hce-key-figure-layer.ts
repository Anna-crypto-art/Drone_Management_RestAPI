import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { FeatureActions, FeatureInfos, Legend } from "@/app/plant/shared/visualization/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { transformWithProjections } from "ol/proj";
import { Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export class HceKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;

  protected readonly stokeWidth = 5;
  protected showPcsZoomLevel = 19;

  protected hasOrthoImage: { rgb: boolean, ir: boolean, sdx: boolean } | undefined;

  protected created(): void {
    this.hasOrthoImage = { rgb: false, ir: false, sdx: false };

    for (const keyFigure of this.analysisResult.key_figures) {
      if (keyFigure.id === ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ID) {
        this.hasOrthoImage.rgb = true;
      } else if (keyFigure.id === ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID) {
        this.hasOrthoImage.ir = true;
      } else if (keyFigure.id === ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID) {
        this.hasOrthoImage.sdx = true;
      }
    }
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getDiffColor(feature),
        width: this.stokeWidth,
      }),
      text: this.showText(feature),
    });
  }

  protected getDiffColor(feature: FeatureLike): string {
    return this.getColor();
  }

  protected getColor(): string {
    return this.color!;
  }

  public async onClick(features: FeatureLike[]): Promise<FeatureInfos | undefined> {
    const featureInfos = await super.onClick(features);

    if (featureInfos && this.hasOrthoImage && (this.hasOrthoImage.ir || this.hasOrthoImage.rgb || this.hasOrthoImage.sdx)) {
      const actions: FeatureActions = {
        buttonVariant: 'secondary',
        name: this.vueComponent.$t("show-ortho-image").toString(),
        actions: [],
      }
      
      if (this.hasOrthoImage.rgb) {
        actions.actions.push({
          name: "RGB",
          action: async () => {
            console.log("blub rgb");
          }
        });
      }
      if (this.hasOrthoImage.ir) {
        actions.actions.push({
          name: "IR",
          action: async () => {
            console.log("blub ir");
          }
        });
      }
      if (this.hasOrthoImage.sdx) {
        actions.actions.push({
          name: "SDX",
          action: async () => {
            console.log("blub sdx");
          }
        });
      }

      featureInfos.actions = actions;
    }

    return featureInfos;
  }
}
