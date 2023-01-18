
import { AppEventServiceBase } from "@/app/shared/services/app-event-service/app-event-service";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { EventCallbackFunction } from "@/app/shared/services/app-event-service/types";

import { AnalysisSelectionEvent } from "./types";

const invisibleAnalysisSelectionEvents = [AnalysisSelectionEvent.SIDEBAR_ABSOLUTE];

class AnalysisSelectionEventEmitter extends SequentialEventEmitter {
  lastEvent: AnalysisSelectionEvent | null = null;
  lastArgs: any | null = null;

  async emit(event: AnalysisSelectionEvent, ...args: any[]): Promise<boolean> {
    if (!invisibleAnalysisSelectionEvents.includes(event)) {
      this.lastEvent = event;
      this.lastArgs = args;
    }

    return await super.emit(event, ...args);
  }
  
  on(event: AnalysisSelectionEvent, func: EventCallbackFunction) {
    super.on(event, func);
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

  public on(plantId: string, event: AnalysisSelectionEvent, func: EventCallbackFunction): void {
    super.on(plantId, event, func);
  }

  public async emit(plantId: string, event: AnalysisSelectionEvent, ...args: any[]): Promise<boolean> {
    return await this.getEventEmitter(plantId).emit(event, ...args);
  }

  /**
   * Do you know this kind of person, that joins a meeting too late and has no idea what is going on?
   * So the person asks: "Whazzzzuuuup!?" 
   * 
   * Re-emits last emitted event for latecomers
   * @param plantId 
   */
  public async whazzup(plantId: string) {
    await this.getEventEmitter(plantId).reemit();
  }
}

export const analysisSelectEventService = new AnalysisSelectionEventService();