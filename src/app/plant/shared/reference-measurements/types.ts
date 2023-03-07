import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";
import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { FilterFieldValue } from "../filter-fields/types";

export interface IAppRefMeasure {
  show(
    analysisId: string,
    fieldgeometryComponent: FieldgeometryComponentSchema,
    entry: RefMeasureEntry | null,
    keyFigures: RefMeasureEntryKeyFigureSchema[] | null,
  ): void;
}

export interface RefMeasureEntryModel {
  measureTime: string;
  notes: string | null;
  values: FilterFieldValue[];
}