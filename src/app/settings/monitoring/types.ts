import { ServerSchema, QFlyServerState, QFlyServerAction, ServerTag } from "@/app/shared/services/volateq-api/api-schemas/server-schemas";

export interface QFlyServerSchemaItem {
  name: string;
  server: ServerSchema;
  analysis_name: string;
  state: QFlyServerState;
  instance_type: string;
  volume_size: number;
  tags: ServerTag[];
  git_branch: string;
  git_pull_on_startup: string;
  start_worker_on_startup: string;
  actions: QFlyServerAction[];
  instance_id: string;
  notes: string;
}
