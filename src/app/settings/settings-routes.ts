import { RouteConfig } from "vue-router";
const AppSettingsUsers = () => import("@/app/settings/users/users.vue");
const AppSettings = () =>  import("@/app/settings/settings.vue");
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

const settingsRoutes: RouteConfig[] = [
  {
    path: "/settings/",
    component: AppSettings,
    children: [
      { 
        path: "users", 
        name: "Users",
        component: AppSettingsUsers,
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
