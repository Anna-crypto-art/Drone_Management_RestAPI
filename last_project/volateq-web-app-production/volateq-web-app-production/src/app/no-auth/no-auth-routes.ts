import { RouteConfig } from "vue-router";
import AppVolaflyDownload from "@/app/no-auth/volafly-download.vue";

const noAuthRoutes: RouteConfig[] = [
  {
    name: "DownloadVolafly",
    path: "/download-volafly",
    component: AppVolaflyDownload,
  },
];

export default noAuthRoutes;
