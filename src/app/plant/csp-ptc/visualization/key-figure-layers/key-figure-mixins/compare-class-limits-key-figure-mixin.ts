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
    const featureValue: number = properties.value! as number;
    const featureDiffValue: number = (properties.diff_value || 0) as number;
    // featureDiffValue *= -1;

    // // if (featureDiffValue < 0) {
    // // }

    const classFeatureValue = this.getFeatureClassValue(featureValue);
    let classFeatureDiffValue = this.getFeatureClassValue(featureValue - featureDiffValue) - classFeatureValue;

    // keep the diff direction
    if (classFeatureDiffValue < 0 && featureDiffValue > 0 || classFeatureDiffValue > 0 && featureDiffValue < 0) {
      classFeatureDiffValue *= -1;
    }

    console.log(properties)
    console.log({
      name: properties.name,
      value: classFeatureValue,
      diff_value: classFeatureDiffValue,
    })
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