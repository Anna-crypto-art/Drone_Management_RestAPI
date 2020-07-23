import Vue from 'vue';
import Router from 'vue-router';

import { authRoutes } from '@/app/auth';
import { homeRoutes } from '@/app/home';
import { AppPageNotFound } from '@/app/shared/components';
import store from '@/app/app-state';

Vue.use(Router);

const appRoutes = [
  {
    path: '*',
    name: 'page-not-found',
    component: AppPageNotFound
  }
];

const routes = [...appRoutes, ...authRoutes, ...homeRoutes];
const router = new Router({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.auth.token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
