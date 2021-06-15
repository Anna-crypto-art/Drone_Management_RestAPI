import AppAnalysis from "@/app/analysis/analysis.vue";
import AppNewAnalysis from "@/app/analysis/new-analysis/new-analysis.vue";
import { RouteConfig } from "vue-router";

const anaylsisRoutes: RouteConfig[] = [
  {
    name: "Analyses",
    path: "/analyses",
    component: AppAnalysis
  },
  {
    name: "AnalysisNew",
    path: "/analysis/new",
    component: AppNewAnalysis
  },
];

export default anaylsisRoutes;
