import { RouteConfig } from "vue-router";
import { ApiRoles } from "../shared/services/volateq-api/api-roles";
const AppPlantView = () => import("@/app/plant/plant-view.vue");
const AppPlants = () => import("@/app/plant/plants.vue");

const docRoutes: RouteConfig[] = [
  {
    name: "DocFiles",
    path: "/doc/files",
    component: AppPlants,
    meta: {
      role: [ApiRoles.CUSTOMER_ADMIN, ApiRoles.PILOT],
    }
  },
  {
    name: "Plant",
    path: "/plant/:id",
    component: AppPlantView,
    meta: {
      role: ApiRoles.CUSTOMER_ADMIN,
    }
  },
];

export default docRoutes;
