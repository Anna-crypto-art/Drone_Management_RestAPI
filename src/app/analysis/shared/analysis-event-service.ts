import { AppEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { EventCallbackFunction } from "@/app/shared/services/app-event-service/types";
import { AnalysisEvent } from "./types";

class AnalysisEventService extends AppEventService<AnalysisEvent> {
  public on(analysisId: string, event: AnalysisEvent, func: EventCallbackFunction): void {
    super.on(analysisId, event, func);
  }
  public emit(analysisId: string, event: AnalysisEvent, ...args: any[]): boolean {
    return super.emit(analysisId, event, ...args);
  }
}

export const analysisEventService = new AnalysisEventService();