import AppUsers from "./users/users.vue";
import AppSettings from "./settings.vue";
import { RouteConfig } from "vue-router";
import { ApiRoles } from "../shared/services/volateq-api/api-roles";

const settingsRoutes: RouteConfig[] = [
  {
    path: "/settings/",
    component: AppSettings,
    children: [
      { 
        path: 'users', 
        name: "Users",
        component: AppUsers,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "users",
          subtitle: "users_descr"
        },
      }
    ]
  }
];

export default settingsRoutes;
