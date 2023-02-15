import { FeatureProperties } from "@/app/plant/shared/visualization/types";
import { CspPtcKeyFigureLayer } from "../csp-ptc-key-figure-layer";
import { CompareClassKeyFigureMixin } from "./compare-class-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "./types";

export class CompareClassLimitsKeyFigureMixin 
extends CompareClassKeyFigureMixin<ICompareClassLimitsKeyFigureMixin> 
{
  public constructor(
    layer: CspPtcKeyFigureLayer<any> & ICompareClassLimitsKeyFigureMixin
  ) {
    super(layer);
  }

  public getFeaturePropertiesClassValue(properties: FeatureProperties): FeatureProperties {
    /*
     a: value of new analysis
     b: value of old analysis
     formula: c = a - b
    */
    
    const featureValue: number = properties.value! as number; // a
    const featureDiffValue: number = (properties.diff_value || 0) as number; // c
    const oldFeatureValue = featureValue - featureDiffValue; // b (= a - c)

    const classFeatureValue = this.getFeatureClassValue(featureValue);
    const oldClassFeatureValue = this.getFeatureClassValue(oldFeatureValue);
    const classFeatureDiffValue = classFeatureValue - oldClassFeatureValue; // c = a - b

    return {
      name: properties.name,
      value: classFeatureValue,
      diff_value: classFeatureDiffValue,
    };
  }

  private getFeatureClassValue(featureValue: number): number {
    const limitAt0 = this.layer.getClassLimits()[0];
    const limitAt1 = this.layer.getClassLimits()[1];

    featureValue = Math.abs(featureValue);

    if (featureValue < limitAt0) {
      return 1;
    } else if (featureValue >= limitAt0 && featureValue < limitAt1) {
      return 2;
    } else if (featureValue >= limitAt1) {
      return 3;
    }

    throw Error("featureValue exceeds class ranges")
  }
}