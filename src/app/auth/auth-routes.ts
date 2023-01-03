import { RouteConfig } from "vue-router";
import AppAuthLogin from "@/app/auth/login/login.vue";
// const AppAuthLogin = () => import("@/app/auth/login/login.vue");
const AppAuthRegister = () => import("@/app/auth/register/register.vue");
const AppAuthForgotPassword = () => import("@/app/auth/reset-password/forgot-password.vue");
const AppAuthResetPassword = () => import("@/app/auth/reset-password/reset-password.vue");
const AppAuthConfirmLogin = () => import("@/app/auth/login/confirm-login.vue");

const authRoutes: RouteConfig[] = [
  {
    name: "Login",
    path: "/login",
    component: AppAuthLogin,
  },
  {
    name: "ConfirmLogin",
    path: "/confirm-login/:confirmKey",
    component: AppAuthConfirmLogin,
  },
  {
    name: "Register",
    path: "/register/:confirmKey",
    component: AppAuthRegister,
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: AppAuthForgotPassword,
  },
  {
    name: "ResetPassword",
    path: "/reset-password/:confirmKey",
    component: AppAuthResetPassword,
  },
];

export default authRoutes;
