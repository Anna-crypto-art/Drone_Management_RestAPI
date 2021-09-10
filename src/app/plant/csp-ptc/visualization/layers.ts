import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { AbsorberComponentLayer } from "./components/absorber-component-layer";
import { LoopComponentLayer } from "./components/loop-component-layer";
import { MirrorComponentLayer } from "./components/mirror-component-layer";
import { ScaComponentLayer } from "./components/sca-component-layer";
import { SceComponentLayer } from "./components/sce-component-layer";
import { ComponentLayer } from "./components/shared/component-layer";
import { CoatingDegratedKeyFigureLayer } from "./key-figures/coating-degrated-key-figure-layer";
import { GlassTubeTemperatureKeyFigureLayer } from "./key-figures/glass-tube-temperature-key-figure-layer";
import { H2ConcentrationKeyFigureLayer } from "./key-figures/h2-concentration-key-figure-layer";
import { IrIntensityKeyFigureLayer } from "./key-figures/ir-intensity-key-figure-layer";
import { MissingGhrKeyFigureLayer } from "./key-figures/missing-ghr-key-figure-layer";
import { RecommendedActionKeyFigureLayer } from "./key-figures/recommended-action-key-figure-layer";
import { ScaSdxImageKeyFigureLayer } from "./key-figures/sca-sdx-image-key-figure-layer";
import { SceAngleKeyFigureLayer } from "./key-figures/sce-angle-key-figure-layer";
import { KeyFigureLayer } from "./key-figures/shared/key-figure-layer";

export const COMPONENT_LAYERS: (typeof ComponentLayer)[] = [
  AbsorberComponentLayer,
  LoopComponentLayer,
  MirrorComponentLayer,
  ScaComponentLayer,
  SceComponentLayer,
];

type KeyFigureTypeMap = {
  keyFigureId: AnalysisResultKeyFigure,
  layerType: any, // (typeof KeyFigureLayer) leads to: Type 'T' is not assignable to type 'AnalysisResultCspPtcHceSchema'
};

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap[] = [
  { keyFigureId: AnalysisResultKeyFigure.COATING_DEGRADATION_ID, layerType: CoatingDegratedKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID, layerType: GlassTubeTemperatureKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID, layerType: H2ConcentrationKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID, layerType: IrIntensityKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_TUBE_ID, layerType: MissingGhrKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID, layerType: RecommendedActionKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.SCA_SDX_IMAGE_ID, layerType: ScaSdxImageKeyFigureLayer },
  { keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID, layerType: SceAngleKeyFigureLayer },
]