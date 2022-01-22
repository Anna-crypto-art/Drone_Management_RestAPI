import { defineModule, WithOptionalState } from "direct-vuex";

const sidebars = ["analysis", "layer-switcher"] as const;
type SidebarNames = typeof sidebars[number];

export type ISidebarModule = { [k in SidebarNames]: boolean };

const SidebarModule = defineModule<WithOptionalState, ISidebarModule>({
  state: sidebars.reduce(
    (acc, name) => ({ ...acc, [name]: false }),
    {}
  ) as ISidebarModule,
  mutations: {
    toggle(state, { name }: { name: SidebarNames }) {
      state[name] = !state[name];
    },
    set(
      state,
      { name, state: sidebarState }: { name: SidebarNames; state: boolean }
    ) {
      state[name] = sidebarState;
    }
  }
});

export default SidebarModule;
