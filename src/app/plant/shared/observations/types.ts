import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { CustomComponentPropertySchema, DataTypeOptionInfo } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";

export type CcpDataTypeValueListOption = MultiselectOption & DataTypeOptionInfo;

export interface IAppObservationModal {
  show(fieldgeometryComponent: FieldgeometryComponentSchema): Promise<void>;
}

export interface CCPValue {
  ccp: CustomComponentPropertySchema;
  value: string;
}

export interface ObservationModel {
  observedAt: string;
  notes?: string;
  ticketId?: string;
}