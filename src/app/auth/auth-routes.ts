import { RouteConfig } from "vue-router";
import AppAuthLogin from "@/app/auth/login/login.vue";
const AppAuthRegister = () => import("@/app/auth/register/register.vue");
const AppRegisterSetupTotp = () => import("@/app/auth/register/register-setup-totp.vue");
const AppAuthForgotPassword = () => import("@/app/auth/reset-password/forgot-password.vue");
const AppAuthResetPassword = () => import("@/app/auth/reset-password/reset-password.vue");
const AppAuthConfirmMailLogin = () => import("@/app/auth/login/confirm-mail-login.vue");
const AppAuthConfirmTotpLogin = () => import("@/app/auth/login/confirm-totp-login.vue");

const authRoutes: RouteConfig[] = [
  {
    name: "Login",
    path: "/login",
    component: AppAuthLogin,
  },
  {
    name: "ConfirmMailLogin",
    path: "/confirm-mail-login/:confirmKey",
    component: AppAuthConfirmMailLogin,
  },
  {
    name: "ConfirmTOTPLogin",
    path: "/confirm-totp-login/:confirmKey",
    component: AppAuthConfirmTotpLogin,
  },
  {
    name: "Register",
    path: "/register/:confirmKey",
    component: AppAuthRegister,
  },
  {
    name: "RegisterTOTP",
    path: "/register-totp/:confirmKey",
    component: AppRegisterSetupTotp,
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
