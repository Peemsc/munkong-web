export default {
  SET_PROVINCE(state, data) {
    state.province = data
  },
  UPDATE_PROFILE(state, data) {
    this.$auth.setUser(data)
  }
}
