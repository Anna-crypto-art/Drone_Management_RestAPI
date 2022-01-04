import { RouteConfig } from "vue-router";
const AppPlantView = () => import("@/app/plant/plant-view.vue");
const AppPlants = () => import("@/app/plant/plants.vue");

const plantRoutes: RouteConfig[] = [
  {
    name: "Plants",
    path: "/plants",
    component: AppPlants,
  },
  {
    name: "Plant",
    path: "/plant/:id",
    component: AppPlantView,
  },
];

export default plantRoutes;
