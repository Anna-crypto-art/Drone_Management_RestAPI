import AppLogin from '@/app/auth/login.vue';
import { RouteConfig } from 'vue-router';

const authRoutes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    component: AppLogin
  }
];

export default authRoutes;
