import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { AnalysisResultCspPtcSceAngleSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-angle-schema";
import { FeatureInfos } from "./shared/types";


const SCE_ANGLE_OFFSET_COLOR_RANGES = [0.01, 0.15, 0.3];
const SCE_ANGLE_OFFSET_COLORS = [undefined, 'green', 'yellow', 'red'];


export class SceAngleKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcSceAngleSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.SCE_ANGLE_ID;
  public readonly name = "sce-alignment-offset";

  protected getOnClickInfo(feature: FeatureLike): FeatureInfos {
    const resultSchema = this.getProperties(feature)!;
    
    return {
      title: resultSchema.fieldgeometry_component.kks,
      records: [
        { name: "set-angle", value: resultSchema.set_angle.toString() },
        { name: "angle-value", descr: "angle-value_expl", value: resultSchema.angle_value.toString() },
        { name: "actual-angle", descr: "actual-angle_expl", value: resultSchema.actual_angle.toString() },
        { name: "angle-deviation", descr: "angle-deviation_expl", value: resultSchema.angle_deviation.toString(), bold: true },
        { name: "uncertainty", descr: "uncertainty_expl", value: resultSchema.uncertainty.toString() },
        { name: "deviation-to-drive", descr: "deviation-to-drive_expl", value: resultSchema.deviation_to_drive.toString() },
      ]
    };
  }

  public getStyle(feature: FeatureLike): Style {
    const offsetColor = this.getOffsetColor(feature.get('value'));

    return new Style({
      fill: offsetColor && new Fill({
        color: offsetColor,
      }) || undefined,
      text: this.showText(feature),
    });
  }

  private getOffsetColor(offsetValue?: number) {
    if (!offsetValue) {
      return undefined;
    }
    offsetValue = offsetValue < 0 ? offsetValue * -1 : offsetValue;

    let i = 0;
    while (i < SCE_ANGLE_OFFSET_COLOR_RANGES.length) {
      if (offsetValue < SCE_ANGLE_OFFSET_COLOR_RANGES[i]) {
        return SCE_ANGLE_OFFSET_COLORS[i];
      }
      i++;
    }
    return SCE_ANGLE_OFFSET_COLORS[i];
  }
  
}