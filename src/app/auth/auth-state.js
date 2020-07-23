import createPersistedState from 'vuex-persistedstate'

const getDefaultState = () => {
  return {
    token: '',
    time: 0
  }
};

export default {
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  mutations: {
    updateToken: (state, token, time) => {
      if (state.time < time) {
        state.token = token;
        state.time = time;
      }
    }
  },
  actions: {
    updateToken: ({ commit }, { token, time }) => {
      commit('updateToken', token, time);

      // Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
}