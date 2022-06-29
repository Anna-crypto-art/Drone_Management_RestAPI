export type QFlyWizardProjectStates = "REGISTERED" | "LAUNCHED" | "RUNNING" | "HOLDING" | "CRASHED" | "FINISHED";

export interface TaskSchema {
  id: string;
  name: string;
  state: "READY" | "RUNNING" | "FAILED" | "SUCCESSFUL";
  output?: {
    step?: number;
    max_steps?: number;
    infos?: string[];
    error?: string;
    projects?: {
      [project_name: string]: {
        state: QFlyWizardProjectStates,
        current_action: string,
      }
    } 
  };
  analysis_id?: string;
}
