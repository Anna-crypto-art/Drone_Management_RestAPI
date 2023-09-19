import { AppEventServiceBase, AppSeqEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";

export enum SelectionSidebarEvent {
  SIDEBAR_ABSOLUTE = "sidebar_absolute",
}

export const selectionSidebarEventService = new AppSeqEventService<SelectionSidebarEvent>();