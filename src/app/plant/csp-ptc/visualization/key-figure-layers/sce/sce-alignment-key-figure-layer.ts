import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { SceKeyFigureLayer } from "./abstract/sce-key-figure-layer";
import { OffsetClassKeyFigureMixin } from "../key-figure-mixins/offset-class-key-figure-mixin";
import { IOffsetClassKeyFigureMixin } from "../key-figure-mixins/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { ComparedFeatureType, FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";

export class SceAlignmentKeyFigureLayer extends SceKeyFigureLayer implements IOffsetClassKeyFigureMixin {
  private offsetClassKeyFigureMixin!: OffsetClassKeyFigureMixin;

  protected created(): void {
    this.offsetClassKeyFigureMixin = new OffsetClassKeyFigureMixin(this);
  }

  public getStyle(feature: FeatureLike): Style {
    const style = super.getStyle(feature);

    style.getFill().setColor(this.offsetClassKeyFigureMixin.getColor(feature));

    return style;
  }

  protected getLegend(): Legend | undefined {
    return this.offsetClassKeyFigureMixin.getLegend();
  }

  public getOffsetClassLimits() {
    return this.analysisResult.csp_ptc.sce_alignment_deviation_to_drive_class_limits;
  }

  public getQueryOffsetClass(): number | undefined {
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
        return this.getColorWithAlpha(KeyFigureColors.green, 0.1);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.35);
      }
    }

    return super.getClassColor(classValue);
  }
}
