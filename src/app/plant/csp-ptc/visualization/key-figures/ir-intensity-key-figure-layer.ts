import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import { FeatureInfos } from "./shared/types";

const IR_INTENSITY_CLASS_COLORS = {"1": "blue", "2": "green" ,"3": "yellow", "4": "red"};

export class IrIntensityKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcIrIntensitySchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.IR_INTENSITY_ID;
  public readonly name = "ir-intensity";

  protected getOnClickInfo(feature: FeatureLike): FeatureInfos {
    const resultSchema = this.getProperties(feature)!;

    return {
      title: resultSchema.fieldgeometry_component.kks,
      records: [
        {
          name: "absorber-temperature",
          value: resultSchema.absorber_temperature.toString(),
        }, 
        {
          name: "ir-intensity",
          descr: "ir-intensity_expl",
          value: resultSchema.ir_intensity.toString(),
        },
        {
          name: "class-subfield",
          descr: "class-sca_expl",
          value: resultSchema.class_subfield.toString(),
          bold: true,
        }
      ]
    };
  }

  public getStyle(feature: FeatureLike): Style {
    const classification = this.getProperties(feature)?.class_subfield;
    const color = classification && IR_INTENSITY_CLASS_COLORS[classification];

    return new Style({
      stroke: color && new Stroke({
        color: color,
        width: 3,
      }),
      text: this.showText(feature),
    });
  }
}