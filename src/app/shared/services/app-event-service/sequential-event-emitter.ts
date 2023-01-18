import { Event, EventCallbackFunction, IEventEmitter } from "./types";

export class SequentialEventEmitter implements IEventEmitter {
  private registeredEvents: Record<Event, EventCallbackFunction[]> = {};

  public on(event: Event, func: EventCallbackFunction) {
    if (!this.registeredEvents[event]) {
      this.registeredEvents[event] = [];
    }

    this.registeredEvents[event].push(func);
  }

  public async emit(event: Event, ...args: any[]) {
    if (this.registeredEvents[event]) {
      for (const func of this.registeredEvents[event]) {
        await func(...args);
      }

      return true;
    }

    return false;
  }

  public getListeners(event: string): EventCallbackFunction[] {
    return this.registeredEvents[event];
  }
}