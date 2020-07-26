import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import authRoutes from '@/app/auth/auth-routes';
import homeRoutes from '@/app/home/home-routes';
import AppPageNotFound from '@/app/shared/components/page-not-found/page-not-found.vue';
import store from '@/app/app-state';

Vue.use(Router);

const appRoutes: RouteConfig[] = [
  {
    path: '*',
    name: 'page-not-found',
    component: AppPageNotFound
  }
];

const router = new Router({
  mode: 'history',
  routes: [
    ...appRoutes, 
    ...authRoutes,
    ...homeRoutes
  ]
});

const nonAuthRoutes = ['Login'];

router.beforeEach((to, from, next) => {
  if (nonAuthRoutes.indexOf(to.name || '') === -1 && !store.state.auth.token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
