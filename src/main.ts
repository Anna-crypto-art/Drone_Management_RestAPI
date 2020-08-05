import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './main.scss';
import App from '@/app/app.vue';
import router from '@/app/app-routes';
import store from '@/app/app-state';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueI18n);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': require('./locales/en.json')
  }
});

new Vue({
  router,
  store: store.original,
  i18n,
  render: h => h(App)
}).$mount('#app');
