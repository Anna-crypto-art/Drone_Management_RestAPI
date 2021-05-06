import { RouteConfig } from "vue-router";
import AppPlantView from "@/app/plant/plant-view.vue";

const plantRoutes: RouteConfig[] = [
  {
    name: "Plant",
    path: "/plant/:id",
    component: AppPlantView
  },
];

export default plantRoutes;
