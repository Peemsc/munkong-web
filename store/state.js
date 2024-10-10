export default () => ({
  isMobile: false
})

export const mutations = {
  setDevice(state, value){
    state.isMobile = value
  }
}
