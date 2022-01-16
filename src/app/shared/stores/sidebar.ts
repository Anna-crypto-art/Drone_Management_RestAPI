import { MutationTree, Store } from "vuex";

interface SidebarStore {
  open: boolean;
}

const mutations: MutationTree<SidebarStore> = {
  set(storeState, sidebarState: "open" | "close") {
    storeState.open = sidebarState === "open";
  },
  toggle(state) {
    state.open = !state.open;
  }
};

const mapSidebar = new Store<SidebarStore>({
  state: { open: false },
  mutations
});
const analysisSidebar = new Store<SidebarStore>({
  state: { open: false },
  mutations
});

export { mapSidebar, analysisSidebar };
