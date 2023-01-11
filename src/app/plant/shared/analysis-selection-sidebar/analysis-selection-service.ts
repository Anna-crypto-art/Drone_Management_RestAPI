
import { SeqEventCallbackFunction, SequentialEventEmitter } from "@/app/shared/services/sequential-event-emitter/sequential-event-emitter";
import { AnalysisSelectionEvent } from "./types";

const invisibleAnalysisSelectionEvents = [AnalysisSelectionEvent.SIDEBAR_ABSOLUTE];

class AnalysisSelectionBus extends SequentialEventEmitter {
  lastEvent: AnalysisSelectionEvent | null = null;
  lastArgs: any | null = null;

  async emit(event: AnalysisSelectionEvent, ...args: any[]) {
    if (!invisibleAnalysisSelectionEvents.includes(event)) {
      this.lastEvent = event;
      this.lastArgs = args;
    }

    await super.emit(event, ...args);
  }
  
  on(event: AnalysisSelectionEvent, func: SeqEventCallbackFunction) {
    super.on(event, func);
  }

  async reemit() {
    if (this.lastEvent !== null) {
      await this.emit(this.lastEvent, ...this.lastArgs);
    }
  }
}

export class AnalysisSelectionService {
  private static anaylsisSelectionBusses: Record<string, AnalysisSelectionBus> = {};

  public static getAnalysisSelectionEventBus(plantId: string): AnalysisSelectionBus {
    if (!(plantId in AnalysisSelectionService.anaylsisSelectionBusses)) {
      AnalysisSelectionService.anaylsisSelectionBusses[plantId] = new AnalysisSelectionBus();
    }

    return AnalysisSelectionService.anaylsisSelectionBusses[plantId];
  }
  
  public static on(
    plantId: string,
    analysisSelectionEvent: AnalysisSelectionEvent,
    callbackFn: SeqEventCallbackFunction
  ) {
    AnalysisSelectionService.getAnalysisSelectionEventBus(plantId).on(analysisSelectionEvent, callbackFn);
  }

  public static async emit(plantId: string, analysisSelectionEvent: AnalysisSelectionEvent, ...args: any[]) {
    await AnalysisSelectionService.getAnalysisSelectionEventBus(plantId).emit(analysisSelectionEvent, ...args);
  }

  /**
   * Do you know this kind of person, that joins a meeting too late and has no idea what is going on?
   * So the person asks: "Whazzzzuuuup!?" 
   * 
   * Re-emits last emitted event for latecomers
   * @param plantId 
   */
  public static async whazzup(plantId: string) {
    await AnalysisSelectionService.getAnalysisSelectionEventBus(plantId).reemit();
  }
}