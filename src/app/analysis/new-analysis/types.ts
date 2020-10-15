import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { RouteSchema } from "@/app/shared/services/volateq-api/api-schemas/route-schema";
import { SelectOption } from "@/app/shared/types/select-option";

export interface CheckListItems {
  videoFiles: boolean;
  droneMetaFile: boolean;
  plantMetaFile: boolean;
}

export interface IAppNewAnalysisFetched {
  customers: CustomerSchema[] | undefined;
  customerOptions: SelectOption[];
  routes: RouteSchema[];
  routesOptions: SelectOption[];
  newAnalysis: NewAnalysis;
  analysis: { id: string } | undefined;
  fileNames: string[];
}