
import { AppEventServiceBase } from "@/app/shared/services/app-event-service/app-event-service";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { EventCallbackFunction } from "@/app/shared/services/app-event-service/types";

import { ObservationSelectionEvent } from "./types";

class ObservationSelectionEventEmitter extends SequentialEventEmitter {
  lastEvent: ObservationSelectionEvent | null = null;
  lastArgs: any | null = null;

  async emit(event: ObservationSelectionEvent, ...args: any[]): Promise<boolean> {
    this.lastEvent = event;
    this.lastArgs = args;

    return await super.emit(event, ...args);
  }
  
  on(event: ObservationSelectionEvent, func: EventCallbackFunction, id?: string) {
    super.on(event, func, id);
  }

  async reemit() {
    if (this.lastEvent !== null) {
      await this.emit(this.lastEvent, ...this.lastArgs);
    }
  }
}

class ObservationSelectionEventService extends AppEventServiceBase<ObservationSelectionEvent, ObservationSelectionEventEmitter> {
  protected createEventEmitter(): ObservationSelectionEventEmitter {
    return new ObservationSelectionEventEmitter();
  }

  public on(plantId: string, event: ObservationSelectionEvent, func: EventCallbackFunction, id?: string): void {
    this.getEventEmitter(plantId).on(event, func, id)
  }

  public async emit(plantId: string, event: ObservationSelectionEvent, ...args: any[]): Promise<boolean> {
    return await this.getEventEmitter(plantId).emit(event, ...args);
  }

  public async reemit(plantId: string): Promise<void> {
    await this.getEventEmitter(plantId).reemit();
  }
}

export const observationSelectEventService = new ObservationSelectionEventService();