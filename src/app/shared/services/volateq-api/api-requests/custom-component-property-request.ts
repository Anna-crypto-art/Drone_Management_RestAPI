import { CCPDataType, CCPDataTypeValueRange } from "../api-schemas/custom-component-property-schema";

export interface CustomComponentPropertyRequest {
  component_id: number;
  name: string;
  data_type: CCPDataType;
  data_type_value_range?: CCPDataTypeValueRange;
  color?: string;
  description?: string;
}