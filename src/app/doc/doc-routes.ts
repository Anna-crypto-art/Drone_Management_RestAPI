import { RouteConfig } from "vue-router";
import { ApiRoles } from "../shared/services/volateq-api/api-roles";
const AppDocFiles = () => import("@/app/doc/doc-files.vue");

const docRoutes: RouteConfig[] = [
  {
    name: "DocFiles",
    path: "/doc/files",
    component: AppDocFiles,
    meta: {
      role: [ApiRoles.CUSTOMER_ADMIN, ApiRoles.PILOT, ApiRoles.ASSISTANT],
    }
  },
];

export default docRoutes;
