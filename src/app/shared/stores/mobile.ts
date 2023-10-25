import AppStore from "@/app/app-state";
import { defineModule } from "direct-vuex";


export interface IMobileModule {
  isMobile: boolean;
}

const query = window.matchMedia("screen and (max-width: 1000px)");
query.addEventListener("change", (ev: MediaQueryListEvent) => {
  AppStore.commit.mobile.setMobile_DONTINVOKETHISMANUALLY(ev.matches);
});

const MobileModule = defineModule({
  state: { isMobile: query.matches } as IMobileModule,
  mutations: {
    setMobile_DONTINVOKETHISMANUALLY(state, newState: boolean) {
      state.isMobile = newState;
    },
  },
  namespaced: true,
});

query.addEventListener("change", e => AppStore.commit.mobile.setMobile_DONTINVOKETHISMANUALLY(e.matches));

export default MobileModule;
