import { TaskSchema } from "./task-schema";

export type AnalysisMonitoringStates = "REGISTERED" | "LAUNCHED" | "RUNNING" | "HOLDING" | "CRASHED" | "FINISHED";

export interface AnalysisMonitoring {
  [analysis_name: string]: TaskSchema & {
    projects: {
      [project_name: string]: {
          state: AnalysisMonitoringStates
          current_action: string
      }
    }
  };
}
