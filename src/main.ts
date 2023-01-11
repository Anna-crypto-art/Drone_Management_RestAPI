import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "./main.scss";
import App from "@/app/app.vue";
import router from "@/app/app-routes";
import store from "@/app/app-state";
import DateHelper from "@/app/shared/services/helper/date-helper";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueI18n);
Vue.use(Vuex);

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    ...DateHelper,
  },
});

export const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: require("./locales/en.json"),
  },
});

new Vue({
  router,
  store: store.original,
  i18n,
  render: h => h(App),
}).$mount("#app");
