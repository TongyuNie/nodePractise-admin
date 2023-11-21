import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: true,
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value){
      state.isGetterRouter = value
    },
    changeCollapsed(state){
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed"] 
  })]
})
