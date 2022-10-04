import { RouteConfig } from "vue-router";
const AppSettingsUsers = () => import("@/app/settings/users/users.vue");
const AppSettingsCustomers = () => import("@/app/settings/customers/customers.vue");
const AppSettingsOrders = () => import("@/app/settings/orders/orders.vue");
const AppSettings = () => import("@/app/settings/settings.vue");
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
          subtitle: "users_descr",
        },
      },
      {
        path: "customers",
        name: "Customers",
        component: AppSettingsCustomers,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "customers",
          subtitle: "customers_descr",
        }
      },
      {
        path: "orders",
        name: "orders",
        component: AppSettingsOrders,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "orders",
        }
      }
    ],
  },
];

export default settingsRoutes;
