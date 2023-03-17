import { ComparedFeatureType, FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { CompareClassLimitsKeyFigureMixin } from "../key-figure-mixins/compare-class-limits-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "../key-figure-mixins/types";
import { ScaKeyFigureLayer } from "./abstract/sca-key-figure-layer";

export class ScaSdxKeyFigureLayer extends ScaKeyFigureLayer implements ICompareClassLimitsKeyFigureMixin {
  private compareClassLimitsKeyFigureMixin!: CompareClassLimitsKeyFigureMixin;
  
  protected created(): void {
    this.compareClassLimitsKeyFigureMixin = new CompareClassLimitsKeyFigureMixin(this);

    this.enableCompare = (this.query?.sdx_class || -1) > 1 || false;
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

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID };
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  public getClassLimits(): number[] {
    return this.analysisResult.csp_ptc!.sdx_rms_class_limits;
  }

  public getQueryClass(): 1 | 2 | 3 | undefined {
    return this.query?.sdx_class
  }

  public getDiffLegendName(): string {
    return this.getLegendName();
  }

  protected getLegendName(): string {
    return this.getLegendEntryTransName(
      "slope-deviation-class",
      this.getClassLimits(),
      this.getQueryClass(),
      "[mrad]"
    );
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(
      this.compareClassLimitsKeyFigureMixin.getFeaturePropertiesClassValue(properties),
      currentClass
    );
  }
}
