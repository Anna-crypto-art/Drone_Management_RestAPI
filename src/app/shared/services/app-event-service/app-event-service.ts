import { EventEmitter } from "./event-emitter";
import { SequentialEventEmitter } from "./sequential-event-emitter";
import { EventCallbackFunction, IEventEmitter, Event } from "./types";

export abstract class AppEventServiceBase<E extends Event, T extends IEventEmitter> {
  protected eventEmitters: Record<Event, T> = {};

  protected abstract createEventEmitter(): T;

  public getEventEmitter(id: Event): T {
    if (!(id in this.eventEmitters)) {
      this.eventEmitters[id] = this.createEventEmitter();
    }

    return this.eventEmitters[id];
  }

  public on(id: string, event: E, func: EventCallbackFunction): void {
    this.getEventEmitter(id).on(event, func);
  }

  public getListeners(id: string, event: E): EventCallbackFunction[] {
    return this.getEventEmitter(id).getListeners(event);
  }

  public abstract emit(id: string, event: E, ...args: any[]): boolean | Promise<boolean>;
}

export class AppEventService<E extends Event> extends AppEventServiceBase<E, EventEmitter> {
  protected createEventEmitter(): EventEmitter {
    return new EventEmitter();
  }

  public emit(id: string, event: E, ...args: any[]): boolean {
    return this.getEventEmitter(id).emit(event, ...args)
  }
}

export class AppSeqEventService<E extends Event> extends AppEventServiceBase<E, SequentialEventEmitter> {
  protected createEventEmitter(): SequentialEventEmitter {
    return new SequentialEventEmitter();
  }

  public emit(id: string, event: E, ...args: any[]): Promise<boolean> {
    return this.getEventEmitter(id).emit(event, ...args)
  }
}