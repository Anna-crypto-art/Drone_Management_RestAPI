import { Event, EventCallbackFunction, IEventEmitter, IdEventCallbackFunction } from "./types";

export class SequentialEventEmitter implements IEventEmitter {
  private registeredEvents: Record<Event, IdEventCallbackFunction[]> = {};

  public on(event: Event, func: EventCallbackFunction, id?: string) {
    if (!this.registeredEvents[event]) {
      this.registeredEvents[event] = [];
    }

    this.registeredEvents[event].push({ id, func });
  }

  public async emit(event: Event, ...args: any[]) {
    if (this.registeredEvents[event]) {
      for (const func of this.registeredEvents[event]) {
        await func.func(...args);
      }

      return true;
    }

    return false;
  }

  public getListeners(event: string): EventCallbackFunction[] {
    return this.registeredEvents[event].map(f => f.func);
  }

  public removeListener(event: Event, listener: EventCallbackFunction): IEventEmitter {
    const funcIndex = this.registeredEvents[event].map(f => f.func).findIndex(listener);
    if (funcIndex != -1) {
      this.registeredEvents[event].splice(funcIndex, 1);
    }

    return this;
  }

  public removeListenerById(event: Event, id: string): IEventEmitter {
    const funcIndex = this.registeredEvents[event]?.findIndex(f => f.id === id);

    if (funcIndex !== undefined && funcIndex != -1) {
      this.registeredEvents[event].splice(funcIndex, 1);
    }

    return this;
  }


}