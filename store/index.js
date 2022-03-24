export const state = () => ({
  lightMode: false,
  loading: false
})

export const mutations = {
  lightMode (state, val) {
    state.lightMode = val
  },
  loading (state, val) {
    state.loading = val
  }
}
