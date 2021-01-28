import AppAnalysis from "@/app/analysis/analysis.vue";
import AppNewAnalysis from "@/app/analysis/new-analysis/new-analysis.vue";
import AppAnalysisResult from "@/app/analysis/analysis-result/analysis-result.vue";
import { RouteConfig } from "vue-router";

const anaylsisRoutes: RouteConfig[] = [
  {
    name: "Home",
    path: "/",
    component: AppAnalysis
  },
  {
    name: "AnalysisNew",
    path: "/analysis/new",
    component: AppNewAnalysis
  },
  {
    name: "AnalysisResults",
    path: "/analysis/results",
    component: AppAnalysisResult
  }
];

export default anaylsisRoutes;
