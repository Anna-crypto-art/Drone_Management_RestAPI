const AppAnalysis = () => import("@/app/analysis/analysis.vue");
const AppNewAnalysis = () => import("@/app/analysis/new-analysis/new-analysis.vue");
const AppEditAnalysis = () => import("@/app/analysis/edit-analysis/edit-analysis.vue");
const AppAnalysisMonitoring = () => import("@/app/analysis/monitoring/monitoring.vue");
import { RouteConfig } from "vue-router";
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

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
    component: AppEditAnalysis,
  },
  {
    name: "AnalysisMonitoring",
    path: "/analysis-monitoring",
    component: AppAnalysisMonitoring,
    meta: {
      role: ApiRoles.SUPER_ADMIN,
      title: "monitoring",
      subtitle: "analysis_monitoring",
    },
  },
];

export default anaylsisRoutes;
