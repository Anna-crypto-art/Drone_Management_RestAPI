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

export interface ITabBarHeight {
  tabBarHeight?: number;
}

export type ISidebarModule = { [k in AllSidebarNames]: boolean; } & ILastActiveSidebarName & ITabBarHeight;

export interface ISidebarEvent extends ITabBarHeight {
  name?: AllSidebarNames;
  state?: boolean;
}

const SidebarModule = defineModule({
  state: {
    ...([...sidebars, ...mapSidebars].reduce((acc, name) => ({ ...acc, [name]: false }), {}) as ISidebarModule),
    tabBarHeight: 0,
  },
  mutations: {
    toggle(state, { name }: { name: AllSidebarNames }) {
      SidebarModule.mutations.set(state, { name, state: !state[name] });
    },
    set(state, event: ISidebarEvent) {
      if (event.name !== undefined && event.state !== undefined ) {
        state[event.name] = event.state;

        // TS forced me to write this...
        if (sidebars.includes(event.name as SidebarNames)) {
          state.lastActiveSidebarName = event.state ? undefined : event.name as SidebarNames;
        }

        emit(event.name, event.state);
      }
      if (event.tabBarHeight !== undefined) {
        state.tabBarHeight = event.tabBarHeight;
      }
    },
    setAll(state, sidebarState: boolean) {
      for (const sidebarName of sidebars) {
        SidebarModule.mutations.set(state, { name: sidebarName, state: sidebarState });
      }
    },
    restore(state, oldState: ISidebarModule) {
      state = { ...oldState, tabBarHeight: oldState.tabBarHeight || 0 };
      SidebarEvents.$emit("restore", oldState);
    },
  },
  namespaced: true,
});

export const SidebarEvents = new Vue();
const emit = (name: AllSidebarNames, state: boolean) => SidebarEvents.$emit("change", { name, state } as ISidebarEvent);

export default SidebarModule;
