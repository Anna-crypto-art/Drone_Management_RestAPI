import { AppAlertEventBus, AppAlertEvents } from "../../services/app-alert/app-alert";
import { ApiException } from "../../services/volateq-api/api-errors";

export class AppContentEventService {
  private static appContentEventBusses: Record<string, AppAlertEventBus> = {};

  private static getAppContentEventBus(id: string): AppAlertEventBus {
    if (!(id in AppContentEventService.appContentEventBusses)) {
        AppContentEventService.appContentEventBusses[id] = new AppAlertEventBus();
    }

    return AppContentEventService.appContentEventBusses[id];
  }
  
  public static on(id: string, alertEvent: AppAlertEvents, callbackFn: any) {
    AppContentEventService.getAppContentEventBus(id).on(alertEvent, callbackFn);
  }

  public static emit(id: string, alertEvent: AppAlertEvents, ...args: any[]) {
    AppContentEventService.getAppContentEventBus(id).emit(alertEvent, args);
  }

  public static showError(id: string, error: ApiException) {
    AppContentEventService.getAppContentEventBus(id).showError(error);
  }

  public static showInfo(id: string, msg: string) {
    AppContentEventService.getAppContentEventBus(id).showInfoAlert(msg);
  }

  public static showSuccess(id: string, msg: string) {
    AppContentEventService.getAppContentEventBus(id).showSuccessAlert(msg);
  }
}