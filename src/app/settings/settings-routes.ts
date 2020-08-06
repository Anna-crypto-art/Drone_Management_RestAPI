import AppUsers from "./users/users.vue";
import { RouteConfig } from "vue-router";
import { ApiRoles } from "../shared/services/volateq-api/api-roles";

const settingsRoutes: RouteConfig[] = [
  {
    path: "/settings/users",
    name: "Users",
    meta: {
      role: ApiRoles.SUPER_ADMIN
    },
    component: AppUsers
  }
];

export default settingsRoutes;
