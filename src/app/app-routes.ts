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
  console.log('to: ' + to.name);
  console.log('authenticated: ' + store.getters.auth.isAuthenticated);

  if (store.getters.auth.isAuthenticated) {
    if (to.name === 'Login') {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else if (nonAuthRoutes.indexOf(to.name || '') === -1) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
