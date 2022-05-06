
import Vue from "vue";
import { AnalysisSelectionEvent } from "./types";

class AnalysisSelectionBus extends Vue {
  lastEvent: AnalysisSelectionEvent | null = null;
  lastArgs: any | null = null;

  emit(event: AnalysisSelectionEvent, args: any) {
    this.lastEvent = event;
    this.lastArgs = args;

    this.$emit(event, ...args);
  }
  on(event: AnalysisSelectionEvent, callbackFn: any) {
    this.$on(event, callbackFn);
  }

  reemit() {
    if (this.lastEvent !== null) {
      this.$emit(this.lastEvent, ...this.lastArgs);
    }
  }
}

export class AnalysisSelectionService {
  private static anaylsisSelectionBusses: Record<string, AnalysisSelectionBus> = {};

  private static getAnalysisSelectionEventBus(plantId: string): AnalysisSelectionBus {
    if (!(plantId in AnalysisSelectionService.anaylsisSelectionBusses)) {
      AnalysisSelectionService.anaylsisSelectionBusses[plantId] = new AnalysisSelectionBus();
    }

    return AnalysisSelectionService.anaylsisSelectionBusses[plantId];
  }
  
  public static on(plantId: string, analysisSelectionEvent: AnalysisSelectionEvent, callbackFn: any) {
    AnalysisSelectionService.getAnalysisSelectionEventBus(plantId).on(analysisSelectionEvent, callbackFn);
  }

  public static emit(plantId: string, analysisSelectionEvent: AnalysisSelectionEvent, ...args: any[]) {
    AnalysisSelectionService.getAnalysisSelectionEventBus(plantId).emit(analysisSelectionEvent, args);
  }

  /**
   * Do you know this kind of person, that joins a meeting too late and has no idea what is going on?
   * So the person asks: "Whazzzzuuuup!?" 
   * 
   * Re-emits last emitted event for latecomers
   * @param plantId 
   */
  public static whazzup(plantId: string) {
    AnalysisSelectionService.getAnalysisSelectionEventBus(plantId).reemit();
  }
}