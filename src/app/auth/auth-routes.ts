import { RouteConfig } from "vue-router";
import AppAuthLogin from "@/app/auth/login/login.vue";
import AppAuthRegister from "@/app/auth/register/register.vue";

const authRoutes: RouteConfig[] = [
  {
    name: "Login",
    path: "/login",
    component: AppAuthLogin
  },
  {
    name: "Register",
    path: "/confirm/:confirmKey",
    component: AppAuthRegister
  }
];

export default authRoutes;
