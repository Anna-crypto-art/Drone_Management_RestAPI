import { CompareClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/compare-class-key-figure-mixin";
import { SwivelKeyFigureLayer } from "./abstract/swivel-key-figure-layer";
import { ICompareClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/types";
import { FeatureInfos, FeatureProperties, Legend } from "@/app/plant/shared/map-view/types";
import { KeyFigureColorScheme, LayerColor } from "@/app/plant/shared/map-view/layers/types";
import { AnalysisResultCspPtcSwivelSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-swivel-schema";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { i18n } from "@/main";

export class SwivelRotationJointGrippingPotentialKeyFigureLayer extends SwivelKeyFigureLayer {
  private compareClassKeyFigureMixin!: CompareClassKeyFigureMixin<ICompareClassKeyFigureMixin>;

  protected created(): void {
    super.created();

    this.compareClassKeyFigureMixin = new CompareClassKeyFigureMixin(this);

    this.enableCompare = this.query!.rotation_joint_angle_gripping_potential_class! > 1;
  }

  public getQueryClass(): 1 | 2 | 3 | 4 | undefined {
    return this.query?.rotation_joint_angle_gripping_potential_class;
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.compareClassKeyFigureMixin.getDiffColor(featureProperties);
  }

  public getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    if (this.compareAnalysisResult) {
      return this.compareClassKeyFigureMixin.getDiffLegend();
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name: this.getLegendName() + this.getLegendEntryCount(this.geoJSON!.features.length),
        },
      ],
    };
  }

  public getDiffLegendName(): string {
    return this.getLegendName();
  }

  public getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: this.keyFigureId };
  }

  public modifyFeatureInfos(featureInfos: FeatureInfos, result: AnalysisResultCspPtcSwivelSchema) {
    if (result.rotation_joint_angle_image_url && featureInfos) {
      featureInfos.images = [{ 
        title: i18n.t("swivel-rotation-joint-angle").toString(), 
        url: result.rotation_joint_angle_image_url
      }];
    }
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  public getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (classValue === 3) {
        return this.getColorWithAlpha(this.color!, 0.7);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.3);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT && classValue === 4) {
      return LayerColor.red;
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT && classValue === 3) {
      return LayerColor.orange;
    }

    return super.getClassColor(classValue);
  }
}