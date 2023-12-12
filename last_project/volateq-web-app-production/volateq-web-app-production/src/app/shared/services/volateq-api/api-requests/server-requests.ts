import { QFlyServerAction, ServerTag } from "../api-schemas/server-schemas"
import { ApiTasks } from "../api-tasks";

export interface AnalysisQFlyServerActionRequest {
  action?: QFlyServerAction;
  start_task?: ApiTasks.run_qfly_wizard | ApiTasks.download_analysis_files;
  tags?: ServerTag[];
}

export interface QFlyServerUpdateRequest {
  instance_id: string;
  server_name?: string;
  analysis_name?: string;
  new_tags?: ServerTag[];
  action?: QFlyServerAction;
  task?: ApiTasks.run_qfly_wizard | ApiTasks.download_analysis_files;
}
