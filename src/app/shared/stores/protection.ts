import { moduleActionContext } from "@/app/app-state";
import { defineModule } from "direct-vuex";
import { appLocalStorage } from "../services/app-storage/app-storage";

const ProtectionModule = defineModule({
  namespaced: true,
  state: { botProtectionToken: appLocalStorage.getItem("botProtectionToken") },
  mutations: {
    updateBotProtectionToken(state, botProtectionToken: string) {
      appLocalStorage.setItem("botProtectionToken", botProtectionToken)

      state.botProtectionToken = botProtectionToken
    }
  },
  actions: {
    updateBotProtectionToken(context, botProtectionToken: string) {
      const { commit } = moduleActionContext(context, ProtectionModule);

      commit.updateBotProtectionToken(botProtectionToken);
    },
  }
});

export default ProtectionModule;
