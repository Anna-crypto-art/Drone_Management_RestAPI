import { defineModule } from "direct-vuex";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { AuthState } from "@/app/auth/types";
import { moduleActionContext, moduleGetterContext } from "@/app/app-state";
import { ApiRoles } from "@/app/shared/services/volateq-api/api-roles";
import { CustomerNameSchema } from "../shared/services/volateq-api/api-schemas/customer-schemas";

const key = "auth_token";

const authStore = defineModule({
  namespaced: true,
  state: (): AuthState => appLocalStorage.getItem(key) || { token: "" },
  getters: {
    isAuthenticated(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return !!state.token;
    },
    isSuperAdmin(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return state.role === ApiRoles.SUPER_ADMIN;
    },
    isCustomerAdmin(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return state.role === ApiRoles.CUSTOMER_ADMIN;
    },
    isPilot(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return state.role === ApiRoles.PILOT;
    },
    isAssistant(...args): boolean {
      const { state } = moduleGetterContext(args, authStore);

      return state.role === ApiRoles.ASSISTANT;
    }
  },
  mutations: {
    updateToken(state, newState: AuthState) {
      state.token = newState.token;
      state.role = newState.role;
      state.customer = newState.customer;

      appLocalStorage.setItem(key, newState);
    },
    updateCustomer(state, customer: CustomerNameSchema | undefined) {
      state.customer = customer;

      appLocalStorage.setItem(key, state)
    }
  },
  actions: {
    updateToken(context, payload: AuthState) {
      const { commit } = moduleActionContext(context, authStore);

      commit.updateToken(payload);
    },
    updateCustomer(context, payload: CustomerNameSchema | undefined) {
      const { commit } = moduleActionContext(context, authStore);

      commit.updateCustomer(payload);
    }
  },
});

export default authStore;
