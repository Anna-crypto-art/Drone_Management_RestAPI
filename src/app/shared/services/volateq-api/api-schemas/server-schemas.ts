export enum QFlyServerState {
  UNALLOCATED = 'UNALLOCATED',
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
}

export enum QFlyServerAction {
  // # For state == UNALLOCATED
  ALLOCATE_AND_START = 'ALLOCATE_AND_START',

  // # For state == STOPPED
  START = 'START',
  RELEASE = 'RELEASE',

  // # for state == RUNNING
  STOP = 'STOP',
  STOP_AND_RELEASE = 'STOP_AND_RELEASE',
}

export interface ServerTag {
  Key: string;
  Value: string;
}

export interface ServerSchema {
  name: string;
  tags: ServerTag[];
}

export interface QFlyServerSchema {
  server?: ServerSchema;
  analysis_name: string;
  state: QFlyServerState;
  actions: QFlyServerAction[];
  servers_available?: number;
}
