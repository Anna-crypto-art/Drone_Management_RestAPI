import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";

import authState from "@/app/auth/auth-state";

Vue.use(Vuex);

const { store, rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext } = createDirectStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authState,
  },
});

// Export the direct-store instead of the classic Vuex store.
export default store;
export { rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext }; // The following lines enable types in the injected store "$store".
export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
