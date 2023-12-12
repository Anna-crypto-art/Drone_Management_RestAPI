import { TaskSchema } from "./task-schema";

export interface AnalysisMonitoring {
  [analysis_name: string]: TaskSchema;
}
