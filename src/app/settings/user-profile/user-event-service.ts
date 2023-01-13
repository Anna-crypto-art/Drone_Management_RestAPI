import { EventEmitter } from "events";

export enum UserEvent {
  CHANGED = 'CHANGED',
}

export class UserEventService {
  private static userEventBusses: Record<string, EventEmitter> = {};

  private static getEventBus(userId: string): EventEmitter {
    if (!(userId in UserEventService.userEventBusses)) {
      UserEventService.userEventBusses[userId] = new EventEmitter();
    }

    return UserEventService.userEventBusses[userId];
  }
  
  public static on(userId: string, userEvent: UserEvent, callbackFn: any) {
    UserEventService.getEventBus(userId).on(userEvent, callbackFn);
  }

  public static emit(userId: string, userEvent: UserEvent, ...args: any[]) {
    UserEventService.getEventBus(userId).emit(userEvent, args);
  }
}