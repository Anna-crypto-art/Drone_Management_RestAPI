import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueHtmlToPaper from "vue-html-to-paper";

import "./main.scss";
import App from "@/app/app.vue";
import router from "@/app/app-routes";
import store from "@/app/app-state";
import DateHelper from "@/app/shared/services/helper/date-helper";

const VueHtmlToPaperOptions = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 100, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(VueHtmlToPaper, VueHtmlToPaperOptions);

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
