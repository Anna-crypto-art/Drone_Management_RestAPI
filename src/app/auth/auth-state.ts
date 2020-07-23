import { Module } from 'vuex'

import { appLocalStorage } from '@/app/shared/services/app-storage/app-storage'
import { RootState } from '@/app/types';
import { AuthState } from '@/app/auth/types';

const key = 'auth_token';
const getDefaultState = () => {
  const state = appLocalStorage.getItem(key) || { token: '', time: 0 };
  
  return state;
};

const authStore: Module<AuthState, RootState> = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    updateToken: (state, newState) => {
      if (state.time < newState.time) {
        state.token = newState.token;
        state.time = newState.time;

        appLocalStorage.setItem(key, state);
      }
    }
  },
  actions: {
    updateToken: ({ commit }, { token, time }) => {
      commit('updateToken', { token, time });
    }
  }
}

export default authStore;