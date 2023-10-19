import { RouteConfig } from "vue-router";
import { ApiRoles } from "../shared/services/volateq-api/api-roles";
const AppPlantView = () => import("@/app/plant/plant-view.vue");
const AppPlants = () => import("@/app/plant/plants.vue");
const AppPlantSettings = () => import("@/app/plant/shared/plant-settings/plant-settings.vue");

const plantRoutes: RouteConfig[] = [
  {
    name: "Plants",
    path: "/plants",
    component: AppPlants,
    meta: {
      role: [ApiRoles.CUSTOMER_ADMIN, ApiRoles.ASSISTANT, ApiRoles.PILOT],
    }
  },
  {
    name: "Plant",
    path: "/plant/:id",
    component: AppPlantView,
    meta: {
      role: [ApiRoles.CUSTOMER_ADMIN, ApiRoles.ASSISTANT, ApiRoles.PILOT],
    }
  },
  {
    name: "PlantSettings",
    path: "/plant/:id/settings",
    component: AppPlantSettings,
    meta: {
      role: [ApiRoles.CUSTOMER_ADMIN],
    }
  },
];

export default plantRoutes;
