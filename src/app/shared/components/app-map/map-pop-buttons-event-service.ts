import { AppEventService } from "../../services/app-event-service/app-event-service";

export enum MapPopButtonsEvent {
  POPUP = "popup",
}

export class MapPopButtonsEventService extends AppEventService<MapPopButtonsEvent> {}

export const mapPopButtonsEventService = new MapPopButtonsEventService();