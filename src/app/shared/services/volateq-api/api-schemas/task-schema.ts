export interface TaskSchema {
  id: string;
  name: string;
  state: "READY" | "RUNNING" | "FAILED" | "SUCCESSFUL";
  output?: {
    step?: number;
    max_steps?: number;
    infos?: string[];
    error?: string;
  };
  analysis_id?: string;
}
