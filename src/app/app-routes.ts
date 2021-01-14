import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

import authRoutes from "@/app/auth/auth-routes";
import analysisRoutes from "@/app/analysis/analysis-routes";
import settingsRoutes from "@/app/settings/settings-routes";
import AppPageNotFound from "@/app/shared/components/page-not-found/page-not-found.vue";
import store from "@/app/app-state";
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

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
    ...analysisRoutes,
    ...settingsRoutes
  ]
});

// well... I admit this naming is confusing!
// authRoutes are necessery for the authoriation. There are not auth protected!
const nonAuthProtectRoutes = authRoutes.map(a => a.name);

router.beforeEach((to, from, next) => {
  if (!store.getters.auth.isAuthenticated) {
    if (nonAuthProtectRoutes.indexOf(to.name || "") === -1) {
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
      next({ name: "page-not-found" });
      return;
    }
  }

  next();
});

export default router;
