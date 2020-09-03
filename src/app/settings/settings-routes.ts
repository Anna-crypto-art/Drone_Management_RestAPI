import { RouteConfig } from "vue-router";
import AppSettingsUsers from "@/app/settings/users/users.vue";
import AppSettings from "@/app/settings/settings.vue";
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
