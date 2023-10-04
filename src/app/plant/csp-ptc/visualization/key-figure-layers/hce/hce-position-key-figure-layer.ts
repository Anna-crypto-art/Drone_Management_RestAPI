import { ComparedFeatureType, FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { HceKeyFigureLayer } from "./abstract/hce-key-figure-layer";
import { OffsetClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/offset-class-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/types";
import { i18n } from "@/main";

abstract class HcePositionKeyFigureLayer extends HceKeyFigureLayer implements ICompareClassLimitsKeyFigureMixin {
  private offsetClassKeyFigureMixin!: OffsetClassKeyFigureMixin;

  protected abstract getHcePositionOffsetClass(): number | undefined;

  protected created(): void {
    super.created();

    this.offsetClassKeyFigureMixin = new OffsetClassKeyFigureMixin(this);
  }

  public getClassLimits(): number[] {
    return this.analysisResult.csp_ptc!.hce_position_total_class_limits;
  }

  public getQueryClass(): number | undefined {
    return this.getHcePositionOffsetClass();
  }

  public getLegend(): Legend | undefined {
    return this.offsetClassKeyFigureMixin.getLegend();
  }

  public getStyle(feature: FeatureLike): Style {
    const style = super.getStyle(feature);
    
    style.getStroke().setColor(this.offsetClassKeyFigureMixin.getColor(feature));

    return style;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(
      this.offsetClassKeyFigureMixin.getFeaturePropertiesClassValue(properties),
      currentClass
    );
  }

  public getUnit(): string {
    return "[mm]";
  }

  public getDiffLegendName(): string {
    return this.offsetClassKeyFigureMixin.getDiffLegendName();
  }

  public getDisplayName(): string {
    return this.getLimitsDisplayName(
      this.getHcePositionOffsetClass(),
      this.getClassLimits(),
      "[mm]"
    );
  }
}

export class HcePositionSupportKeyFigureLayer extends HcePositionKeyFigureLayer {
  protected getHcePositionOffsetClass(): number | undefined {
    return this.query?.hce_position_support_offset_class;
  }
}

export class HcePositionCenterKeyFigureLayer extends HcePositionKeyFigureLayer {
  protected getHcePositionOffsetClass(): number | undefined {
    return this.query?.hce_position_center_offset_class;
  }
}