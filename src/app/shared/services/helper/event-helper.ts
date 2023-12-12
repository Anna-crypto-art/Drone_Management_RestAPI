import { EventEmitter } from "events";
import Vue from "vue";

export type EventCallbackFunction = (...args: any[]) => void;

export class EventHelper {
  private registeredEvents: Record<string, EventCallbackFunction> = {};

  public registerEvent(eventName: string, callbackFn: EventCallbackFunction) {
    this.registeredEvents[eventName] = callbackFn;

    return callbackFn;
  }

  public getEvent(eventName: string): EventCallbackFunction {
    return this.registeredEvents[eventName];
  }

  public unregisterAll(eventEmitter: EventEmitter | Vue) {
    if (eventEmitter instanceof EventEmitter) {
      for (const eventName in this.registeredEvents) {
        eventEmitter.off(eventName, this.registeredEvents[eventName]);
      }
    } else if (eventEmitter instanceof Vue) {
      for (const eventName in this.registeredEvents) {
        eventEmitter.$off(eventName, this.registeredEvents[eventName]);
      }
    }
  }
}