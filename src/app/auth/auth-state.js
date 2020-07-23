import createPersistedState from 'vuex-persistedstate'

const getDefaultState = () => {
  return {
    token: '',
    time: 0
  }
};

export default {
  strict: true,
  namespaced: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  mutations: {
    updateToken: (state, newState) => {
      if (state.time < newState.time) {
        state.token = newState.token;
        state.time = newState.time;
      }
    }
  },
  actions: {
    updateToken: ({ commit }, { token, time }) => {
      commit('updateToken', { token, time });
    }
  }
}