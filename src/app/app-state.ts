import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { RootState } from '@/app/types';

import { default as authState } from '@/app/auth/auth-state';


Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authState
  }
}

export default new Vuex.Store<RootState>(store);
