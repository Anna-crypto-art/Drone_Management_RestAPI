import Vue from 'vue';

import App from './app/app.vue';

import './main.scss';
import router from './app/app-routes';
import store from './app/app-state';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
