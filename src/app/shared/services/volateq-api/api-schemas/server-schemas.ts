export enum QFlyServerState {
  UNALLOCATED = 'UNALLOCATED',
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
}

export enum QFlyServerAction {
  // For state == UNALLOCATED
  ALLOCATE = 'ALLOCATE',
  ALLOCATE_AND_START = 'ALLOCATE_AND_START',

  // For state == STOPPED
  START = 'START',
  RELEASE = 'RELEASE', // also allowed for RUNNING
  SET_SERVER_SIZE_SMALL = 'SET_SERVER_SIZE_SMALL', // corresponds to AWS EC2 c6a.2xlarge
  SET_SERVER_SIZE_MEDIUM = 'SET_SERVER_SIZE_MEDIUM', // corresponds to AWS EC2 c6a.8xlarge
  SET_SERVER_SIZE_LARGE = 'SET_SERVER_SIZE_LARGE', // corresponds to AWS EC2 c6a.12xlarge
  
  // For state == RUNNING
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
  instance_type: string;
  volume_size: number;
}

export interface QFlyServerSchema {
  server?: ServerSchema;
  analysis_name: string;
  state: QFlyServerState;
  actions: QFlyServerAction[];
  servers_available?: number;
}
