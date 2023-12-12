import { AppEventService, AppSeqEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { EventCallbackFunction } from "@/app/shared/services/app-event-service/types";
import { PlantViewEvent } from "./types";

class PlantViewEventService extends AppSeqEventService<PlantViewEvent> {
  public on(plantId: string, event: PlantViewEvent, func: EventCallbackFunction): void {
    super.on(plantId, event, func);
  }
  public emit(plantId: string, event: PlantViewEvent, ...args: any[]): Promise<boolean> {
    return super.emit(plantId, event, ...args);
  }
}

export const plantViewEventService = new PlantViewEventService();