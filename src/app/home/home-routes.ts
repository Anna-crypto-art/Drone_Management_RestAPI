import AppHome from "@/app/home/home.vue";
import { RouteConfig } from "vue-router";

const homeRoutes: RouteConfig[] = [
  {
    name: "Home",
    path: "/",
    component: AppHome
  }
];

export default homeRoutes;
