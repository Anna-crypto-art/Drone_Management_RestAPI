import { AppEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { EventCallbackFunction } from "@/app/shared/services/app-event-service/types";
import { AnalysisResultEvent } from "./types";

class AnalysisResultEventService extends AppEventService<AnalysisResultEvent> {
  public on(analysisResultId: string, event: AnalysisResultEvent, func: EventCallbackFunction): void {
    super.on(analysisResultId, event, func);
  }
  public emit(analysisResultId: string, event: AnalysisResultEvent, ...args: any[]): boolean {
    return super.emit(analysisResultId, event, ...args);
  }
}

export const analysisResultEventService = new AnalysisResultEventService();