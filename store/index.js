export const state = () => ({
  lightMode: false,
  loading: true,
  networks: [
    { icon: 'TwitterIcon', url: 'https://twitter.com/tenzastudio' },
    { icon: 'InstagramIcon', url: 'https://instagram.com/tenza.inc' },
    { icon: 'LinkedInIcon', url: 'https://linkedin.com/company/tenza-inc' },
    { icon: 'EmailIcon', url: 'mailto:anton@tenza.us' }
  ]
})

export const mutations = {
  lightMode (state, val) {
    state.lightMode = val
  },
  loading (state, val) {
    state.loading = val
  }
}
