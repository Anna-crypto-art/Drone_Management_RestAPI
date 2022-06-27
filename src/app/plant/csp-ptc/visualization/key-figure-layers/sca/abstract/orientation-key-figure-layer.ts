import { ComparedFeatureType, FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { OffsetClassKeyFigureMixin } from "../../key-figure-mixins/offset-class-key-figure-mixin";
import { IOffsetClassKeyFigureMixin } from "../../key-figure-mixins/types";
import { ScaKeyFigureLayer } from "./sca-key-figure-layer";

export abstract class OrientationKeyFigureLayer extends ScaKeyFigureLayer implements IOffsetClassKeyFigureMixin {
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

  protected getLegend(): Legend | undefined {
    return this.offsetClassKeyFigureMixin.getLegend();
  }
   
  protected abstract getOrientationOffsetClassLimits(): number[];

  public getOffsetClassLimits(): number[] {
    return this.getOrientationOffsetClassLimits();
  }

  public getQueryOffsetClass(): number | undefined {
    return this.query?.orientation_offset_class;
  }

  protected getColor(): string {
    return this.color;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(
      this.offsetClassKeyFigureMixin.getFeaturePropertiesClassValue(properties),
      currentClass
    );
  }
}
