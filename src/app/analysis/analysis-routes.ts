import AppAnalysis from "@/app/analysis/analysis.vue";
import AppNewAnalysis from "@/app/analysis/new-analysis/new-analysis.vue";
import { RouteConfig } from "vue-router";

const anaylsisRoutes: RouteConfig[] = [
  {
    name: "Home",
    path: "/",
    component: AppAnalysis
  },
  {
    name: "Analysis-New",
    path: "/analysis/new",
    component: AppNewAnalysis
  },
];

export default anaylsisRoutes;
