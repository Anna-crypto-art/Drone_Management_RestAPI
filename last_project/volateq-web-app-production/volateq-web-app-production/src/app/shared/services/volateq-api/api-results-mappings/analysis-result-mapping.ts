import { allCspPtcMappings } from "./csp_ptc/analysis-result-csp-ptc-mapping";
import { allPvMappings } from "./pv/analysis-result-pv-mapping";
import { ComponentResultMappings } from "./types";

export const allMappings: ComponentResultMappings[] = [
  ...allCspPtcMappings,
  ...allPvMappings,
]