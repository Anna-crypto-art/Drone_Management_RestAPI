import { AnalysisEventBus } from "./analysis-event-bus";
import { AnalysisEvent } from "./types";

export class AnalysisEventService {
  private static anaylsisEventBusses: Record<string, AnalysisEventBus> = {};

  private static getAnalysisEventBus(analysisId: string): AnalysisEventBus {
    if (!(analysisId in AnalysisEventService.anaylsisEventBusses)) {
      AnalysisEventService.anaylsisEventBusses[analysisId] = new AnalysisEventBus();
    }

    return AnalysisEventService.anaylsisEventBusses[analysisId];
  }
  
  public static on(analysisId: string, analysisEvent: AnalysisEvent, callbackFn: any) {
    AnalysisEventService.getAnalysisEventBus(analysisId).on(analysisEvent, callbackFn);
  }

  public static emit(analysisId: string, analysisEvent: AnalysisEvent, ...args: any[]) {
    AnalysisEventService.getAnalysisEventBus(analysisId).emit(analysisEvent, args);
  }
}