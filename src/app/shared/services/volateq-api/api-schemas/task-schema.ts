export interface TaskSchema {
    id: string;
    name: string;
    // https://docs.celeryproject.org/en/latest/userguide/tasks.html?highlight=Pending#std-state-PENDING
    state: 'PENDING' | 'STARTED' | 'SUCCESS' | 'RETRY' | 'REVOKED' | 'FAILURE';
    result: string;
}