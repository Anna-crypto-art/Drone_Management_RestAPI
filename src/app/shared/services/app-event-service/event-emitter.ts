import { EventEmitter as EventsEventEmitter } from "events";
import { EventCallbackFunction, IEventEmitter } from "./types";

export class EventEmitter extends EventsEventEmitter implements IEventEmitter {
  getListeners(event: string): EventCallbackFunction[] {
    return this.listeners(event) as EventCallbackFunction[];
  }
}