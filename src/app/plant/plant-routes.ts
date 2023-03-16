import { RouteConfig } from "vue-router";
import { ApiRoles } from "../shared/services/volateq-api/api-roles";
const AppPlantView = () => import("@/app/plant/plant-view.vue");
const AppPlants = () => import("@/app/plant/plants.vue");

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
];

export default plantRoutes;
