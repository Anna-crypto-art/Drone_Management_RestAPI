import { RouteConfig } from "vue-router";
import AppPlantView from "@/app/plant/plant-view.vue";
import AppPlants from "@/app/plant/plants.vue";

const plantRoutes: RouteConfig[] = [
  {
    name: "Plants",
    path: "/plants",
    component: AppPlants
  },
  {
    name: "Plant",
    path: "/plant/:id",
    component: AppPlantView
  },
];

export default plantRoutes;
