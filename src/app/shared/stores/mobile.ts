import AppStore from "@/app/app-state";
import { defineModule } from "direct-vuex";

const query = window.matchMedia("screen and (max-width: 1000px)");

const MobileModule = defineModule({
  state: { mobile: query.matches },
  mutations: {
    setMobile_DONTINVOKETHISMANUALLY(state, newState: boolean) {
      state.mobile = newState;
    },
  },
  namespaced: true,
});

query.addEventListener("change", e => AppStore.commit.mobile.setMobile_DONTINVOKETHISMANUALLY(e.matches));

export default MobileModule;
