export const state = () => ({
  lightMode: false
})

export const mutations = {
  lightMode (state, val) {
    state.lightMode = val
  }
}
