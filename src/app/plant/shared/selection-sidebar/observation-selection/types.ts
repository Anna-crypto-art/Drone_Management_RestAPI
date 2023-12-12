import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ObservationSelectionService } from "./observation-selection-service";
import { SummerizedObservations } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";

export enum ObservationSelectionEvent {
  SELECTED = "observation_selected",
  REFRESH = "observation_selection_referesh",
}

export interface IObservationSelectionComponent {
  observationSelectionService: ObservationSelectionService | null;
  plant: PlantSchema;
  mounted(): Promise<void>;
  unmounted(): Promise<void>;
  onObservationSelected?(selectedByQueryRoute?: boolean): Promise<void>;
}

export interface ObservRowItem {
  name: SummerizedObservations;
}