import { CCPDataType, DataTypeOptionInfo } from "../api-schemas/custom-component-property-schema";

export interface NumberRangeInfoRequest extends DataTypeOptionInfo {
  number_from: number;
  number_to: number;
}

export interface DataTypeNumberRangeRequest {
  number_from: number;
  number_to: number;
  infos?: NumberRangeInfoRequest[];
}

export interface ValueListInfoRequest extends DataTypeOptionInfo {
  option: string;
}

export interface DataTypeValueListRequest {
  options: string[];
  infos?: ValueListInfoRequest[]; 
}

export interface CustomComponentPropertyRequest {
  component_id: number;
  name: string;
  data_type: CCPDataType;
  data_type_value_list?: DataTypeValueListRequest;
  data_type_numer_range?: DataTypeNumberRangeRequest;
  color?: string;
  description?: string;
}