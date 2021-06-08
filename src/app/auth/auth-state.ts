import { defineModule } from "direct-vuex"
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage"
import { AuthState } from "@/app/auth/types";
import { moduleActionContext, moduleGetterContext } from "@/app/app-state"
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";

const key = "auth_token";

const authStore = defineModule({
  namespaced: true,
  state: (): AuthState => appLocalStorage.getItem(key) || { token: "" },
  getters: {
    isAuthenticated(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return !!state.token
    },
    isSuperAdmin(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return state.role === ApiRoles.SUPER_ADMIN
    },
    isCustomerAdmin(...args): boolean {
      const { state} = moduleGetterContext(args, authStore);

      return state.role === ApiRoles.CUSTOMER_ADMIN
    }
  },
  mutations: {
    updateToken (state, newState: AuthState) {
      state.token = newState.token;
      state.role = newState.role;
      state.customer_id = newState.customer_id;

      appLocalStorage.setItem(key, newState);
    }
  },
  actions: {
    updateToken(context, payload: AuthState) {
      const { commit } =  moduleActionContext(context, authStore);

      commit.updateToken(payload);
    }
  }
});

export default authStore;