import { RefMeasureEntryValue } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";

export interface IAppRefMeasure {
  show(): void;
}

export interface RefMeasureEntryModel {
  measureTime: string;
  notes: string | null;
  values: Record<string, RefMeasureEntryValue> | null;
}