import { createStore } from 'vuex'

export default createStore({
  state: {
    room: null
  },
  mutations: {
    setRoom (state, room) {
      state.room = room
    }
  },
  actions: {
  },
  modules: {
  }
})
