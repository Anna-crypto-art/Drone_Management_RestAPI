import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { DataTypeOptionInfo } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";

export type CcpDataTypeValueListOption = MultiselectOption & DataTypeOptionInfo;

export interface IAppObservationModal {
  show(fieldgeometryComponent: FieldgeometryComponentSchema): Promise<void>;
}