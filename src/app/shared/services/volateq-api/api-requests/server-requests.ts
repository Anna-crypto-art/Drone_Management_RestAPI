import { QFlyServerAction, ServerTag } from "../api-schemas/server-schemas"
import { ApiTasks } from "../api-tasks";

export interface QFlyServerActionRequest {
  action?: QFlyServerAction;
  start_task?: ApiTasks.runQFlyWizard | ApiTasks.validatePlantMetadata;
  tags?: ServerTag[];
}
