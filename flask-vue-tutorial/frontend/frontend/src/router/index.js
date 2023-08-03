import Vue from "vue";
import VueRouter from "vue-router";
import Shark from "../components/Shark.vue";
import Drones from "../components/Drones.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/link",
    name: "Shark-shark",
    component: Shark,
  },
  {
    path: "/drones",
    name: "Drones",
    component: Drones,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
