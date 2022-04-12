
import Vue from "vue";
import { AnalysisSelectionEvent } from "./types";

class AnalysisSelectionBus extends Vue {
  emit(event: AnalysisSelectionEvent, args: any) {
    this.$emit(event, ...args);
  }
  on(event: AnalysisSelectionEvent, callbackFn: any) {
    this.$on(event, callbackFn);
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
}