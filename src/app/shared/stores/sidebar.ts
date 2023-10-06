import { defineModule } from "direct-vuex";
import Vue from "vue";

export const sidebars = ["analyses", "layer-switcher", "observations"] as const;
type SidebarNames = typeof sidebars[number];

export type ISidebarModule = { [k in SidebarNames]: boolean };
export interface ISidebarEvent {
  name: SidebarNames;
  state: boolean;
}

const SidebarModule = defineModule({
  state: sidebars.reduce((acc, name) => ({ ...acc, [name]: false }), {}) as ISidebarModule,
  mutations: {
    toggle(state, { name }: { name: SidebarNames }) {
      SidebarModule.mutations.set(state, { name, state: !state[name] });
    },
    set(state, { name, state: sidebarState }: { name: SidebarNames; state: boolean }) {

      state[name] = sidebarState;
      emit(name, sidebarState);
    },
    setAll(state, sidebarState: boolean) {
      for (const sidebarName of sidebars) {
        SidebarModule.mutations.set(state, { name: sidebarName, state: sidebarState });
      }
    },
    restore(state, oldState: ISidebarModule) {
      state = oldState;
      SidebarEvents.$emit("restore", oldState);
    },
  },
  namespaced: true,
});

export const SidebarEvents = new Vue();
const emit = (name: SidebarNames, state: boolean) => SidebarEvents.$emit("change", { name, state } as ISidebarEvent);

export default SidebarModule;
