import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

import authRoutes from "@/app/auth/auth-routes";
import analysisRoutes from "@/app/analysis/analysis-routes";
import settingsRoutes from "@/app/settings/settings-routes";
import plantRoutes from "@/app/plant/plant-routes";
import docRoutes from "@/app/doc/doc-routes";
import AppPageNotFound from "@/app/shared/components/page-not-found/page-not-found.vue";
import AppHome from "@/app/home.vue";
import store from "@/app/app-state";
import noAuthRoutes from "@/app/no-auth/no-auth-routes";

Vue.use(Router);

const appRoutes: RouteConfig[] = [
  {
    path: "*",
    name: "page-not-found",
    component: AppPageNotFound,
  },
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
];

const router = new Router({
  mode: "history",
  routes: [
    ...appRoutes,
    ...authRoutes,
    ...analysisRoutes,
    ...settingsRoutes,
    ...plantRoutes,
    ...docRoutes,
    ...noAuthRoutes,
  ],
});

// well... I admit this naming is confusing!
// authRoutes are necessery for the authoriation. There are not auth protected!
const nonAuthProtectRoutes = [...authRoutes.map(a => a.name), ...noAuthRoutes.map(a => a.name)];

router.beforeEach((to, from, next) => {
  if (!store.getters.auth.isAuthenticated) {
    if (nonAuthProtectRoutes.indexOf(to.name || "") === -1) {
      next({ name: "Login", query: { dest: to.fullPath }});
      return;
    }
  } else {
    if (to.name === "Login") {
      next({ name: "Home" });
      return;
    }

    if (to.meta?.role && !store.getters.auth.isSuperAdmin) {
      const roles: number[] = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role];
      if (!roles.includes(store.state.auth.role!)) {
        next({ name: "page-not-found" });
        return;
      }
    }
  }

  next();
});

export default router;
