import { RouteConfig } from "vue-router";
import AppAuthLogin from "@/app/auth/login/login.vue";
import AppAuthRegister from "@/app/auth/register/register.vue";
import AppAuthForgotPassword from "@/app/auth/reset-password/forgot-password.vue";
import AppAuthResetPassword from "@/app/auth/reset-password/reset-password.vue";
import AppAuthConfirmLogin from "@/app/auth/login/confirm-login.vue";

const authRoutes: RouteConfig[] = [
  {
    name: "Login",
    path: "/login",
    component: AppAuthLogin
  },
  {
    name: "ConfirmLogin",
    path: "/confirm-login/:confirmKey",
    component: AppAuthConfirmLogin,
  },
  {
    name: "Register",
    path: "/confirm/:confirmKey",
    component: AppAuthRegister
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: AppAuthForgotPassword
  },
  {
    name: "ResetPassword",
    path: "/reset-password/:confirmKey",
    component: AppAuthResetPassword
  }
];

export default authRoutes;
