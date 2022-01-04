export interface TaskSchema {
    id: string;
    name: string;
    // https://docs.celeryproject.org/en/latest/userguide/tasks.html?highlight=Pending#std-state-PENDING
    state: 'PENDING' | 'STARTED' | 'PROGRESS' | 'SUCCESS' | 'RETRY' | 'REVOKED' | 'FAILURE';
    result: string;
    info: {
        current_step: number,
        max_steps: number,
        infos: string[],
    }
}