import { defineModule } from "direct-vuex";
import Vue from "vue";

export const sidebars = ["analyses", "observations"] as const;
export type SidebarNames = typeof sidebars[number];

export const mapSidebars = ["analysesSelection", "observationsSelection"] as const;
export type MapSidebarNames = typeof mapSidebars[number];

export type AllSidebarNames = SidebarNames | MapSidebarNames;

export interface ILastActiveSidebarName {
  lastActiveSidebarName?: SidebarNames;
}

export type ISidebarModule = { [k in AllSidebarNames]: boolean; } & ILastActiveSidebarName;

export interface ISidebarEvent {
  name: AllSidebarNames;
  state: boolean;
}

const SidebarModule = defineModule({
  state: [...sidebars, ...mapSidebars].reduce((acc, name) => ({ ...acc, [name]: false }), {}) as ISidebarModule,
  mutations: {
    toggle(state, { name }: { name: AllSidebarNames }) {
      SidebarModule.mutations.set(state, { name, state: !state[name] });
    },
    set(state, { name, state: sidebarState }: ISidebarEvent) {
      state[name] = sidebarState;

      // TS forced me to write this...
      if (sidebars.includes(name as SidebarNames)) {
        state.lastActiveSidebarName = sidebarState ? undefined : name as SidebarNames;
      }

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
const emit = (name: AllSidebarNames, state: boolean) => SidebarEvents.$emit("change", { name, state } as ISidebarEvent);

export default SidebarModule;
