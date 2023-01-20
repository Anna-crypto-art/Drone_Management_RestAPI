import { ApiComponent } from "../../api-components/api-components";
import { ComponentResultMappings } from "../types";
import analysisResultPvMappingModule from "./analysis-result-pv-mapping-module";
import analysisResultPvMappingTracker from "./analysis-result-pv-mapping-tracker";

export const allPvMappings: ComponentResultMappings[] = [
  { componentId: ApiComponent.PV_MODULE, resultMapping: analysisResultPvMappingModule },
  { componentId: ApiComponent.PV_TRACKER, resultMapping: analysisResultPvMappingTracker },
];