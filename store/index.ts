export const state = () => ({
  user: {}
})

export const mutations = {
  user(state, user) {
    state.user = user
  },
  clearUser(state){
    state.user = {}
  }
}