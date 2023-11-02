import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { AnalysisResultMappingEntryWithPiFieldName } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { CustomComponentPropertySchema, DataTypeOptionInfo } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { ObservationSchema } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";

export type CcpDataTypeValueListOption = MultiselectOption & DataTypeOptionInfo;

export interface IAppObservationModal {
  show(fieldgeometryComponent: FieldgeometryComponentSchema, observation?: ObservationSchema): Promise<void>;
}

export interface CCPValue {
  ccp: CustomComponentPropertySchema;
  value: string;
}

export interface PIValue {
  entry: AnalysisResultMappingEntryWithPiFieldName;
  value: string;
}

export interface ObservationModel {
  id?: string;
  observedAt: string;
  notes?: string;
  ticketId?: string;
}

export interface DateRange {
  from: string;
  to: string;
}