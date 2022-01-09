export const state = () => ({
  user: {}
})

export const mutations = {
  user(state:any, user:any) {
    state.user = user
  },
  clearUser(state:any){
    state.user = {}
  }
}