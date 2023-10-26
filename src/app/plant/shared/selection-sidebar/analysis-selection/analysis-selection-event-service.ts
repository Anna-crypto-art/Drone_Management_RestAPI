
import { AppEventServiceBase } from "@/app/shared/services/app-event-service/app-event-service";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { EventCallbackFunction } from "@/app/shared/services/app-event-service/types";

import { AnalysisSelectionEvent } from "./types";

class AnalysisSelectionEventEmitter extends SequentialEventEmitter {
  lastEvent: AnalysisSelectionEvent | null = null;
  lastArgs: any | null = null;

  async emit(event: AnalysisSelectionEvent, ...args: any[]): Promise<boolean> {
    this.lastEvent = event;
    this.lastArgs = args;

    return await super.emit(event, ...args);
  }
  
  on(event: AnalysisSelectionEvent, func: EventCallbackFunction, id?: string) {
    super.on(event, func, id);
  }

  async reemit() {
    if (this.lastEvent !== null) {
      await this.emit(this.lastEvent, ...this.lastArgs);
    }
  }
}

class AnalysisSelectionEventService extends AppEventServiceBase<AnalysisSelectionEvent, AnalysisSelectionEventEmitter> {
  protected createEventEmitter(): AnalysisSelectionEventEmitter {
    return new AnalysisSelectionEventEmitter();
  }

  public on(plantId: string, event: AnalysisSelectionEvent, func: EventCallbackFunction, id?: string): void {
    this.getEventEmitter(plantId).on(event, func, id)
  }

  public async emit(plantId: string, event: AnalysisSelectionEvent, ...args: any[]): Promise<boolean> {
    return await this.getEventEmitter(plantId).emit(event, ...args);
  }

  public async reemit(plantId: string): Promise<void> {
    await this.getEventEmitter(plantId).reemit();
  }
}

export const analysisSelectEventService = new AnalysisSelectionEventService();