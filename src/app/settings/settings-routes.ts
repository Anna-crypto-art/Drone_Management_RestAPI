import { RouteConfig } from "vue-router";
const AppSettingsUsers = () => import("@/app/settings/users/users.vue");
const AppSettingsCustomers = () => import("@/app/settings/customers/customers.vue");
const AppSettingsProductPackages = () => import("@/app/settings/product-packages/product-packages.vue");
const AppSettingsOrders = () => import("@/app/settings/orders/orders.vue");
const AppSettingsDrones = () => import("@/app/settings/drones/drones.vue");
const AppSettingsMonitoring = () => import("@/app/settings/monitoring/monitoring.vue")
const AppSettings = () => import("@/app/settings/settings.vue");
const AppUserProfile = () => import("@/app/settings/user-profile/user-profile.vue");
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
        path: "product-packages",
        name: "ProductPackages",
        component: AppSettingsProductPackages,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "product-packages",
          subtitle: "product-packages_descr",
        },
      },
      {
        path: "orders",
        name: "orders",
        component: AppSettingsOrders,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "orders",
        }
      },
      {
        path: "drones",
        name: "drones",
        component: AppSettingsDrones,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "drones",
        }
      },
      {
        path: "analysis-monitoring",
        name: "AnalysisMonitoring",
        component: AppSettingsMonitoring,
        meta: {
          role: ApiRoles.SUPER_ADMIN,
          title: "qfly-operations-monitoring",
          subtitle: "qfly-operations-monitoring_expl",
        },
      },
      {
        path: "user-profile",
        name: "UserProfile",
        component: AppUserProfile,
        meta: {
          title: "user-profile",
        }
      }
    ],
  },
];

export default settingsRoutes;
