const AppAnalysis = () => import("@/app/analysis/analysis.vue");
const AppNewAnalysis = () => import("@/app/analysis/new-analysis/new-analysis.vue");
import { RouteConfig } from "vue-router";

const anaylsisRoutes: RouteConfig[] = [
  {
    name: "Analyses",
    path: "/analyses",
    component: AppAnalysis,
  },
  {
    name: "AnalysisNew",
    path: "/analysis/new",
    component: AppNewAnalysis,
  },
];

export default anaylsisRoutes;
