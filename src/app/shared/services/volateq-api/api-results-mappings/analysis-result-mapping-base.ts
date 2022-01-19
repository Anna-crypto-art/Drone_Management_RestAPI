import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { AnalysisResultMappings } from "./types";

const analysisResultMappingBase: AnalysisResultMappings<AnalysisResultSchemaBase> = [
  {
    getValue: r => r.fieldgeometry_component.kks,
    transName: "pcs",
    transDescr: "pcs_expl",
  },
];

export default analysisResultMappingBase;
