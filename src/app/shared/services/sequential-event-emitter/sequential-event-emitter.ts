export type SeqEventCallbackFunction = (...args: any[]) => Promise<void>;

export class SequentialEventEmitter {
  private registeredEvents: Record<string, SeqEventCallbackFunction[]> = {};

  public on(event: string, func: SeqEventCallbackFunction) {
    if (!this.registeredEvents[event]) {
      this.registeredEvents[event] = [];
    }

    this.registeredEvents[event].push(func);
  }

  public async emit(event: string, ...args: any[]) {
    if (this.registeredEvents[event]) {
      for (const func of this.registeredEvents[event]) {
        await func(...args);
      }
    }
  }
}