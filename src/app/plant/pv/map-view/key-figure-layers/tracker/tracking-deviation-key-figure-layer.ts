import { OffsetClassKeyFigureMixin } from "@/app/plant/shared/map-view/layers/key-figure-mixins/offset-class-key-figure-mixin";
import { FeatureProperties, Legend } from "@/app/plant/shared/map-view/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { TrackerKeyFigureLayer } from "./abstract/tracker-key-figure-layer";
import { ComparedFeatureType } from "@/app/plant/shared/map-view/layers/types";

export class TrackingDeviationKeyFigureLayer extends TrackerKeyFigureLayer {
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

  protected getColor(): string {
    return this.color;
  }

  public getClassLimits(): number[] {
    return this.analysisResult.pv!.tracker_deviation_class_limits;
  }

  public getQueryClass(): 1 | 2 | 3 | undefined {
    return this.query?.tracker_deviation_class
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(
      this.offsetClassKeyFigureMixin.getFeaturePropertiesClassValue(properties),
      currentClass
    );
  }

  public getLegend(): Legend | undefined {
    return this.offsetClassKeyFigureMixin.getLegend();
  }

  public getDiffLegendName(): string {
    return this.offsetClassKeyFigureMixin.getDiffLegendName();
  }
  
  public getDisplayName(): string {
    return this.getLimitsDisplayName(
      this.getQueryClass(),
      this.getClassLimits(),
      "°"
    );
  }
}