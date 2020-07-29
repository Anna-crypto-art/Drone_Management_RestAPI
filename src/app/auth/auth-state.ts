import { appLocalStorage } from '@/app/shared/services/app-storage/app-storage'
import { AuthState } from '@/app/auth/types';
import { defineModule } from "direct-vuex"
import { moduleActionContext, moduleGetterContext } from '@/app/app-state'

const key = 'auth_token';


const authStore = defineModule({
  namespaced: true,
  state: (): AuthState => appLocalStorage.getItem(key) || { token: '' },
  getters: {
    isAuthenticated(...args): boolean {
      const { state, getters, rootState, rootGetters } = moduleGetterContext(args, authStore);

      return !!state.token
    }
  },
  mutations: {
    updateToken (state, newState: AuthState) {
      state.token = newState.token;
      appLocalStorage.setItem(key, newState);
    }
  },
  actions: {
    updateToken(context, payload: AuthState) {
      const { dispatch, commit, getters, state } =  moduleActionContext(context, authStore);

      commit.updateToken(payload);
    }
  }
});

export default authStore;