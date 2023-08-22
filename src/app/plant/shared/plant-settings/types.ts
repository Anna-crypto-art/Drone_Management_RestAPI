import { CCPDataType, CCPDataTypeValueRange } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";

export interface CCPModel {
  modalTitle: string;
  modalOkTitle: string;
  id: string | null;
  componentId: number | null;
  name: string;
  dataType: CCPDataType | null;
  dataTypeValueRange?: CCPDataTypeValueRange;
  color?: string;
  description?: string;
}