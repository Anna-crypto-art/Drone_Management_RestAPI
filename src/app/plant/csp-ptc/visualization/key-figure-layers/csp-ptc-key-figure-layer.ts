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
  ) {
    super(vueComponent, analysisResult, keyFigureId, keyFigureInfo, query, initColor);
  }

  protected created(): void {
    super.created();

    this.orthoImages = [
      { name: "RGB_ONLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID, available: false },
      { name: "RGB_OFFLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID, available: false },
      { name: "IR", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID, available: false },
      { name: "SDX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID, available: false },
    ];

    this.setOrthoImageAvailable();
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
      case ComparedFeatureType.GONE_FIXED:
        return KeyFigureColors.green;
      
      case ComparedFeatureType.GONE_IMPROVED:
        return this.getColorWithAlpha(KeyFigureColors.green, 0.5)
      
      case ComparedFeatureType.NEW_WORSENED:
        return KeyFigureColors.red;

      case ComparedFeatureType.NEW_IMPROVED:
        return KeyFigureColors.grey;

      case ComparedFeatureType.NO_CHANGE:
        return KeyFigureColors.black;
      
      case ComparedFeatureType.GONE_WORSENED:
        return KeyFigureColors.blue;
    }
  }

  public getComparedFeatures(currentClass: number): ComparedFeatures {
    const comparedFeatures: ComparedFeatures = {
      goneFeatures: [],
      goneFixedFeatures: [],
      goneImprovedFeatures: [],
      newFeatures: [],
      newImprovedFeatures: [],
      newWorsenedFeatures: [],
    };

    for (const propFeature of this.geoJSON!.features) {
      const comparedFeatureType = this.getComparedFeatureType(propFeature.properties, currentClass);
      if (comparedFeatureType === ComparedFeatureType.GONE_FIXED) {
        comparedFeatures.goneFeatures.push(propFeature);
        comparedFeatures.goneFixedFeatures.push(propFeature);
      } 
      else if (comparedFeatureType === ComparedFeatureType.GONE_IMPROVED) {
        comparedFeatures.goneFeatures.push(propFeature);
        comparedFeatures.goneImprovedFeatures.push(propFeature);
      }
      else if (comparedFeatureType === ComparedFeatureType.GONE_WORSENED) {
        comparedFeatures.goneFeatures.push(propFeature);
      }
      else if (comparedFeatureType === ComparedFeatureType.NEW_WORSENED) {
        comparedFeatures.newFeatures.push(propFeature);
        comparedFeatures.newWorsenedFeatures.push(propFeature);
      } 
      else if (comparedFeatureType === ComparedFeatureType.NEW_IMPROVED) {
        comparedFeatures.newFeatures.push(propFeature);
        comparedFeatures.newImprovedFeatures.push(propFeature);
      }
    }

    return comparedFeatures;
  }

  public getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    const featureValue: number = properties.value! as number;
    const featureDiffValue: number = properties.diff_value! as number;

    if (featureDiffValue === 0) {
      return ComparedFeatureType.NO_CHANGE;
    }

    if (featureValue !== currentClass) {
      if (featureDiffValue > 0) {
        return ComparedFeatureType.GONE_WORSENED;
      }

      if (featureValue === 1) {
        return ComparedFeatureType.GONE_FIXED;
      }
      
      return ComparedFeatureType.GONE_IMPROVED;
    } 
    
    if (featureValue > 0) {
      return ComparedFeatureType.NEW_WORSENED;
    } 
    
    return ComparedFeatureType.NEW_IMPROVED;
  }
}
