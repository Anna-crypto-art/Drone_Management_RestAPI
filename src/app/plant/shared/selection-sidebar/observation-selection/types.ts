import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { DateRange } from "../../observations/types";
import { ObservationSelectionService } from "./observation-selection-service";
import { SummerizedObservations } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";

export enum ObservationSelectionEvent {
  SELECTED = "observation_selected",
  SIDEBAR_ABSOLUTE = "sidebar_absolute",
}

export interface IObservationSelectionComponent {
  observationSelectionService: ObservationSelectionService;
  plant: PlantSchema;
  mounted(): Promise<void>;
  unmounted(): Promise<void>;
  onObservationSelected?(): Promise<void>;
}

export interface ObservRowItem {
  name: SummerizedObservations;
}