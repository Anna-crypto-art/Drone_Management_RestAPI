import { CompareClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/compare-class-key-figure-mixin";
import { SwivelKeyFigureLayer } from "./abstract/swivel-key-figure-layer";
import { ICompareClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/types";
import { FeatureInfos, FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { AnalysisResultCspPtcSwivelSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-swivel-schema";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";

export class SwivelRotationJointGrippingPotentialKeyFigureLayer extends SwivelKeyFigureLayer {
  private compareClassKeyFigureMixin!: CompareClassKeyFigureMixin<ICompareClassKeyFigureMixin>;

  protected created(): void {
    super.created();

    this.compareClassKeyFigureMixin = new CompareClassKeyFigureMixin(this);

    this.enableCompare = this.query!.rotation_joint_angle_gripping_potential_class! > 1;
  }

  public getQueryClass(): 1 | 2 | 3 | undefined {
    return this.query?.rotation_joint_angle_gripping_potential_class;
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.compareClassKeyFigureMixin.getDiffColor(featureProperties);
  }

  protected getLegend(): Legend | undefined {
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

  protected getLegendName(): string {
    return this.getLegendEntryTransName(
      "swivel-rotation-joint-angle-gripping-potential-class",
      this.analysisResult.csp_ptc!.rotation_joint_gripping_potential_class_limits,
      this.getQueryClass(),
      "°"
    );
  }

  protected getMoreSpecificAnalysisResultParams(): TableRequest {
    return { key_figure_image_url: this.keyFigureId };
  }

  protected mapResultToFeatureInfos(result: AnalysisResultCspPtcSwivelSchema): FeatureInfos | undefined {
    const featureInfos = super.mapResultToFeatureInfos(result);

    if (result.rotation_joint_angle_image_url && featureInfos) {
      featureInfos.images = [{ 
        title: this.vueComponent.$t("swivel-rotation-joint-angle").toString(), 
        url: result.rotation_joint_angle_image_url 
      }];
    }

    return featureInfos;
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }
}