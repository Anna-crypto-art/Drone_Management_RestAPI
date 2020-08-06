import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

import authRoutes from "@/app/auth/auth-routes";
import homeRoutes from "@/app/home/home-routes";
import settingsRoutes from "./settings/settings-routes";
import AppPageNotFound from "@/app/shared/components/page-not-found/page-not-found.vue";
import store from "@/app/app-state";
import { ApiRoles } from "./shared/services/volateq-api/api-roles";

Vue.use(Router);

const appRoutes: RouteConfig[] = [
  {
    path: "*",
    name: "page-not-found",
    component: AppPageNotFound
  }
];

const router = new Router({
  mode: "history",
  routes: [
    ...appRoutes, 
    ...authRoutes,
    ...homeRoutes,
    ...settingsRoutes
  ]
});

const nonAuthRoutes = ["Login"];

router.beforeEach((to, from, next) => {
  if (!store.getters.auth.isAuthenticated) {
    if (nonAuthRoutes.indexOf(to.name || "") === -1) {
      next({ name: "Login" });
      return;
    }
  } else {
    if (to.name === "Login") {
      next({ name: "Home" });
      return;
    }

    if (!store.getters.auth.isSuperAdmin && to.meta && to.meta.role && 
      (to.meta.role === ApiRoles.SUPER_ADMIN || 
        (to.meta.role === ApiRoles.CUSTOMER_ADMIN && !store.getters.auth.isCustomerAdmin))) 
    {
      next({ name: "Home" });
      return;
    }
  }

  next();
});

export default router;
