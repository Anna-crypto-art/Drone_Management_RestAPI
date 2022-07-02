import { QFlyServerAction, ServerTag } from "../api-schemas/server-schemas"
import { ApiTasks } from "../api-tasks";

export interface QFlyServerActionRequest {
  action?: QFlyServerAction;
  start_task?: ApiTasks.run_qfly_wizard | ApiTasks.validate_plant_metadata;
  tags?: ServerTag[];
}
