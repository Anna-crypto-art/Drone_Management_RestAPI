import { ComparedFeatureType, FeatureInfos, FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { CompareClassLimitsKeyFigureMixin } from "../key-figure-mixins/compare-class-limits-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "../key-figure-mixins/types";
import { ScaKeyFigureLayer } from "./abstract/sca-key-figure-layer";

export class ScaFrictionKeyFigureLayer extends ScaKeyFigureLayer implements ICompareClassLimitsKeyFigureMixin {
  private compareClassLimitsKeyFigureMixin!: CompareClassLimitsKeyFigureMixin;

  protected created(): void {
    this.compareClassLimitsKeyFigureMixin = new CompareClassLimitsKeyFigureMixin(this)

    this.enableCompare = true;
  }

  public getStyle(feature: FeatureLike): Style {
    const style = super.getStyle(feature);

    if (this.enableCompare && this.compareAnalysisResult) {
      style.getFill().setColor(
        this.compareClassLimitsKeyFigureMixin.getDiffColor(
          this.getProperties(feature)
        )
      );
    }

    return style;
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

  protected getLegendName(): string {
    return this.getLegendEntryTransName(
      "sca-torsion-class",
      this.analysisResult.csp_ptc.sca_torsion_class_limits,
      this.query?.torsion_class,
      "°"
    )
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
    return this.getClassColor(this.getQueryClass());
  }

  public getDiffLegendName(): string {
    return this.getLegendName();
  }

  public getQueryClass(): number | undefined {
    return this.query?.torsion_class;
  }

  public getClassLimits(): number[] {
    return this.analysisResult.csp_ptc.sca_torsion_class_limits;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(
      this.compareClassLimitsKeyFigureMixin.getFeaturePropertiesClassValue(properties),
      currentClass
    );
  }
}
