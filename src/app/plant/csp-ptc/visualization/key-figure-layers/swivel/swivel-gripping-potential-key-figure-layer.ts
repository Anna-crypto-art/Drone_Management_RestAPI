import { ComparedFeatureType, FeatureInfos, FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultCspPtcSwivelSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-swivel-schema";
import { CompareClassLimitsKeyFigureMixin } from "../key-figure-mixins/compare-class-limits-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "../key-figure-mixins/types";
import { ClassSwivelKeyFigureLayer } from "./abstract/class-swivel-key-figure-layer";

export class SwivelGrippingPotentialKeyFigureLayer extends ClassSwivelKeyFigureLayer implements ICompareClassLimitsKeyFigureMixin {
  private compareClassLimitsKeyFigureMixin!: CompareClassLimitsKeyFigureMixin;

  protected created(): void {
    super.created();
    this.compareClassLimitsKeyFigureMixin = new CompareClassLimitsKeyFigureMixin(this)

    this.enableCompare = true;
  }

  public getClassLimits(): number[] {
    return this.analysisResult.csp_ptc!.swivel_gripping_potential_class_limits;
  }
  
  public getQueryClass(): number | undefined {
    return this.query?.gripping_potential_class;
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    if (this.enableCompare && this.compareAnalysisResult) {
      return this.compareClassLimitsKeyFigureMixin.getDiffLegend();
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name: this.getLegendName() + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.compareClassLimitsKeyFigureMixin.getDiffColor(featureProperties);
  }
 
  protected getLegendName(): string {
    return this.getLegendEntryTransName(
      "rotation-joint-gripping-potential-class",
      this.getClassLimits(),
      this.query?.gripping_potential_class,
      "mm"
    )
  }

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: this.keyFigureId };
  }

  protected mapResultToFeatureInfos(result: AnalysisResultCspPtcSwivelSchema): FeatureInfos | undefined {
    const featureInfos = super.mapResultToFeatureInfos(result);

    if (result.gripping_risk_image_url && featureInfos) {
      featureInfos.images = [{ title: "Gripping risk image", url: result.gripping_risk_image_url }];
    }

    return featureInfos;
  }

  public getDiffLegendName(): string {
    return this.getLegendName();
  }
}
