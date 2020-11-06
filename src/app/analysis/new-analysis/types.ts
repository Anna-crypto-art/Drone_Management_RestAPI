import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { PlantBlockSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-block-schema";
import { RouteSchema } from "@/app/shared/services/volateq-api/api-schemas/route-schema";
import { BFormSelectOption, BFormSelectOptionGroup } from "bootstrap-vue";

export interface CheckListItems {
  videoFiles: boolean;
  droneMetaFile: boolean;
  plantMetaFile: boolean;
}

export interface IAppNewAnalysisFetched {
  customers: CustomerSchema[] | undefined;
  customerOptions: Array<any>;
  routes: RouteSchema[];
  plantBlocks: PlantBlockSchema[];
  routesOptions: Array<any>;
  newAnalysis: NewAnalysis;
  analysis: { id: string } | undefined;
  fileNames: string[];
}

export interface IAnalysisId {
  id: string;
}