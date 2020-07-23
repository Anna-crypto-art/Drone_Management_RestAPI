import Vue from 'vue';
import Vuex from 'vuex';

import { default as authState } from './auth/auth-state';
// import { authState } from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authState
  }
});
