// 设置变量 token 成功码
export default {
  state: {
    //全局变量中的success
    success: 200,
    token: null,
  },
  getters: {},
  mutations: {
    //设置token
    setToken(state, val) {
      state.token = val;
    },
  },
  actions: {},
  modules: {},
};
