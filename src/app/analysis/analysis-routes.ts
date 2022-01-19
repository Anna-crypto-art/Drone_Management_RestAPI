const AppAnalysis = () => import("@/app/analysis/analysis.vue");
const AppNewAnalysis = () => import("@/app/analysis/new-analysis/new-analysis.vue");
const AppEditAnalysis = () => import("@/app/analysis/edit-analysis.vue");
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
  {
    name: "EditAnalysis",
    path: "/analysis/:id",
    component: AppEditAnalysis
  }
];

export default anaylsisRoutes;
