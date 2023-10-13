import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { FilterFieldValue } from "../../filter-fields/types";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";

export interface IAppRefMeasure {
  show(
    analysisId: string,
    pcs: string,
    componentId: ApiComponent,
    entry: RefMeasureEntry | null,
    keyFigures: RefMeasureEntryKeyFigureSchema[] | null,
  ): void;
}

export interface RefMeasureEntryModel {
  measureTime: string;
  notes: string | null;
  values: FilterFieldValue[];
}