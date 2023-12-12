export type EventCallbackFunction = (...args: any[]) => void | Promise<void>;

export type Event = string;

export interface IEventEmitter {
  on(event: Event, func: EventCallbackFunction): void;
  emit(event: Event, ...args: any[]): boolean | Promise<boolean>;
  getListeners(event: Event): EventCallbackFunction[];
  removeListener(event: Event, listener: EventCallbackFunction): IEventEmitter;
}

export interface IdEventCallbackFunction {
  id?: string;
  func: EventCallbackFunction
}