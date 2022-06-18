export type AnalysisMonitoringStates = "REGISTERED" | "LAUNCHED" | "RUNNING" | "HOLDING" | "CRASHED" | "FINISHED";

export interface AnalysisMonitoring {
  [k: string]: {
    [k: string]: {
      state: AnalysisMonitoringStates;
      current_action: string;
    };
  };
}
