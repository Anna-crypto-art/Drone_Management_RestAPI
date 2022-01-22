import { defineModule } from "direct-vuex";

const sidebars = ["analysis", "layer-switcher"] as const;
type SidebarNames = typeof sidebars[number];

export type ISidebarModule = { [k in SidebarNames]: boolean };

const SidebarModule = defineModule({
  state: sidebars.reduce((acc, name) => ({ ...acc, [name]: false }), {}) as ISidebarModule,
  getters: sidebars.reduce(
    (acc, name) => ({
      ...acc,
      [name]: state => {
        return state[name];
      },
    }),
    {}
  ) as { [name in SidebarNames]: (ISidebarModule) => boolean },
  mutations: {
    toggle(state, { name }: { name: SidebarNames }) {
      state[name] = !state[name];
    },
    set(state, { name, state: sidebarState }: { name: SidebarNames; state: boolean }) {
      state[name] = sidebarState;
    },
  },
  namespaced: true,
});

export default SidebarModule;
