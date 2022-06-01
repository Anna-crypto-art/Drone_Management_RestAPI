import { DiagramResultMappings } from "@/app/plant/shared/diagram/types";
import { ApiComponent } from "../../api-components/api-components";
import analysisResultCspPtcMappingHce from "./analysis-result-csp-ptc-mapping-hce";
import analysisResultCspPtcMappingMirror from "./analysis-result-csp-ptc-mapping-mirror";
import analysisResultCspPtcMappingSca from "./analysis-result-csp-ptc-mapping-sca";
import analysisResultCspPtcMappingSce from "./analysis-result-csp-ptc-mapping-sce";

export const allCspPtcMappings: DiagramResultMappings[] = [
  { componentId: ApiComponent.CSP_PTC_ABSORBER, resultMapping: analysisResultCspPtcMappingHce },
  { componentId: ApiComponent.CSP_PTC_MIRROR, resultMapping: analysisResultCspPtcMappingMirror },
  { componentId: ApiComponent.CSP_PTC_SCA, resultMapping: analysisResultCspPtcMappingSca },
  { componentId: ApiComponent.CSP_PTC_SCE, resultMapping: analysisResultCspPtcMappingSce },
];