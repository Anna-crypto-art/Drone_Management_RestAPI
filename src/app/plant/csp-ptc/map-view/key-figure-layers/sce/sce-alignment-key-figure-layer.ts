import { LayerColor, KeyFigureColorScheme, ComparedFeatureType } from "@/app/plant/shared/map-view/layers/types";
import { SceKeyFigureLayer } from "./abstract/sce-key-figure-layer";
import { OffsetClassKeyFigureMixin } from "@/app/plant/shared/map-view/layers/key-figure-mixins/offset-class-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "@/app/plant/shared/map-view/layers/key-figure-mixins/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { FeatureProperties, Legend } from "@/app/plant/shared/map-view/types";

export class SceAlignmentKeyFigureLayer extends SceKeyFigureLayer implements ICompareClassLimitsKeyFigureMixin {
  private offsetClassKeyFigureMixin!: OffsetClassKeyFigureMixin;

  protected created(): void {
    super.created();

    this.offsetClassKeyFigureMixin = new OffsetClassKeyFigureMixin(this);
  }

  public getStyle(feature: FeatureLike): Style {
    const style = super.getStyle(feature);

    style.getFill().setColor(this.offsetClassKeyFigureMixin.getColor(feature));

    return style;
  }

  public getLegend(): Legend | undefined {
    return this.offsetClassKeyFigureMixin.getLegend();
  }

  public getClassLimits() {
    return this.analysisResult.csp_ptc!.sce_alignment_deviation_to_drive_class_limits;
  }

  public getQueryClass(): number | undefined {
    return this.query?.orientation_offset_class;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(
      this.offsetClassKeyFigureMixin.getFeaturePropertiesClassValue(properties),
      currentClass
    );
  }

  public getClassColor(classValue?: number): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 1) {
        return this.getColorWithAlpha(LayerColor.green, 0.1);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.35);
      }
    }

    return super.getClassColor(classValue);
  }

  public getDiffLegendName(): string {
    return this.offsetClassKeyFigureMixin.getDiffLegendName();
  }
  
  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  public getDisplayName(): string {
    return this.getLimitsDisplayName(
      this.getQueryClass(),
      this.getClassLimits(),
      "°"
    );
  }
}
