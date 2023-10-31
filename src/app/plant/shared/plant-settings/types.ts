import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { NumberRangeInfoRequest, ValueListInfoRequest } from "@/app/shared/services/volateq-api/api-requests/custom-component-property-request";
import { CCPDataType } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";

export interface CCPModel {
  modalTitle: string;
  modalOkTitle: string;
  modalCancelTitle: string;
  id: string | null;
  componentId: number | null;
  name: string;
  dataType: CCPDataType | null;
  valueListInfos?: ValueListInfoRequest[];
  numberRangeInfos?: NumberRangeInfoRequest[];
  color?: string;
  description?: string;
}

export interface PiField {
  id: string;
  keyFigureId: ApiKeyFigure;
  piFieldName: string;
  enabled_pi_field_id?: string;
}

export interface ComponentEnabledPiFields {
  componentName: string;
  options: MultiselectOption[];
  selected: string[];
  piFields: PiField[];
}