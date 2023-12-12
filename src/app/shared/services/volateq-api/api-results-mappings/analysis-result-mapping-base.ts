import { AnalysisResultSchemaBase } from "../api-schemas/analysis-result-schema-base";
import { AnalysisResultMappings } from "./types";

const analysisResultMappingBase: AnalysisResultMappings<AnalysisResultSchemaBase> = [
  {
    getValue: r => r.fieldgeometry_component?.kks,
    transName: "pcs",
    transDescr: "pcs_expl",
  },
  {
    getValue: r => r.comment,
    transName: "comment",
    disableForTable: true,
    superAdminOnly: true,
  },
  {
    getValue: r => r.fieldgeometry_component?.dt_id,
    transName: "dt-id",
    disableForTable: true,
    superAdminOnly: true,
  }
];

export default analysisResultMappingBase;