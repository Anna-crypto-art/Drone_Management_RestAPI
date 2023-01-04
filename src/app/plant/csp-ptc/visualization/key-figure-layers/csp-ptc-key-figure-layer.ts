import { ComparedFeatures, ComparedFeatureType, FeatureProperties, IPlantVisualization } from "@/app/plant/shared/visualization/types";
import { KeyFigureLayer } from "@/app/plant/shared/visualization/layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { KeyFigureColors, KeyFigureColorScheme, KeyFigureInfo } from "@/app/plant/shared/visualization/layers/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { cspPtcKeyFigureRainbowColors } from "../../csp-ptc-key-figure-colors";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";

export abstract class CspPtcKeyFigureLayer<T extends AnalysisResultSchemaBase> extends KeyFigureLayer<T> {
  constructor(
    vueComponent: BaseAuthComponent & IPlantVisualization,
    public readonly analysisResult: AnalysisResultDetailedSchema,
    public readonly keyFigureId: ApiKeyFigure,
    public readonly keyFigureInfo: KeyFigureInfo,
    public readonly query?: GeoVisualQuery,
    protected readonly initColor?: KeyFigureColors,
    public readonly invisibleAutoSelection?: boolean,
  ) {
    super(vueComponent, analysisResult, keyFigureId, keyFigureInfo, query, initColor);
  }

  protected get color(): string {
    if (this.initColor) {
      return this.initColor;
    }

    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      return cspPtcKeyFigureRainbowColors[this.keyFigureId];
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      return KeyFigureColors.red;
    }

    throw new Error("Unexpected colorScheme: " + this.colorScheme);
  }

  public getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 1) {
        return this.getColorWithAlpha(KeyFigureColors.green, 0.3);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.5);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
      if (classValue === 1) {
        return KeyFigureColors.green;
      }
      
      if (classValue === 2) {
        return KeyFigureColors.yellow;
      }
    }

    return this.color!;
  }

  public getDiffColorByComparedFeatureType(comparedFeatureType: ComparedFeatureType): string {
    switch (comparedFeatureType) {
      case ComparedFeatureType.NO_CHANGE:
        return KeyFigureColors.black;

      case ComparedFeatureType.GONE_IMPROVED:
        return KeyFigureColors.green;

      case ComparedFeatureType.NEW_WORSENED:
        return KeyFigureColors.red;

      case ComparedFeatureType.GONE_WORSENED:
      case ComparedFeatureType.NEW_IMPROVED:
        return this.getColorWithAlpha('#fff', 0); // transparent -> invisible
    }
  }

  public getComparedFeatures(currentClass: number): ComparedFeatures {
    const comparedFeatures: ComparedFeatures = {
      [ComparedFeatureType.NO_CHANGE]: [],
      [ComparedFeatureType.GONE_IMPROVED]: [],
      [ComparedFeatureType.GONE_WORSENED]: [],
      [ComparedFeatureType.NEW_IMPROVED]: [],
      [ComparedFeatureType.NEW_WORSENED]: [],
    };

    for (const propFeature of this.geoJSON!.features) {
      const comparedFeatureType = this.getComparedFeatureType(propFeature.properties, currentClass);
      comparedFeatures[comparedFeatureType].push(propFeature);
    }

    return comparedFeatures;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    const featureValue: number = properties.value! as number;
    const featureDiffValue: number = properties.diff_value! as number;

    if (featureValue !== currentClass) {
      // featureValue is now (new analysis) in another class than the current class,
      // but was before (old analysis) in the current class.

      if (featureValue < currentClass) {
        // featureValue is now in a lower class than the current class.
        return ComparedFeatureType.GONE_IMPROVED;
      }

      if (featureValue > currentClass) {
        // featureValue is now in a higher class than the current class.
        // case goes under the radar for simplicity
        return ComparedFeatureType.GONE_WORSENED;
      }
    } 
    if (featureValue === currentClass && featureDiffValue !== 0) {
      // featureValue is now in the same class as the current class,
      // but was before (old analysis) in another class.
      
      if (featureDiffValue > 0) {
        // class before was lower than the current class
        return ComparedFeatureType.NEW_WORSENED
      }

      if (featureDiffValue < 0) {
        // class before was higher than the current class
        // case goes under the radar for simplicity
        return ComparedFeatureType.NEW_IMPROVED
      }
    }

    return ComparedFeatureType.NO_CHANGE;
  }
}
