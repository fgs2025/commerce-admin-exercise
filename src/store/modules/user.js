export default {
  namespaced: true,
  state: {
    user: "123",
    password: "123",
    active: false,
  },
  mutations: {
    setAdmin(state, val) {
      if (val.account == state.user && val.password == state.password) {
        state.active = true;
      }
    },
    Logout(state) {
      state.active = false;
    },
  },
  actions: {
    setAdmin({ commit }, val) {
      commit("setAdmin", val);
    },
    Logout({ commit }) {
      commit("Logout");
    },
  },
};
