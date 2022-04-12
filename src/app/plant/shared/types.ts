import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";

export interface IActiveComponent {
  componentId: ApiComponent;
  mapping: AnalysisResultMappings<AnalysisResultSchemaBase>;
  label: string;
  descr?: string;
}

export interface IActiveTabComponent extends IActiveComponent {
  tabIndex: number;
}
