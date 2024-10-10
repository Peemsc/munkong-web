export default {
  FETCH_BUNDLE(state, data){
    state.bundles = data
  },
  GET_BUNDLE(state, data){
    state.bundle = data
  },
  SET_ITEM_BUNDLE(state, data) {
    state.selectItem = data
  }
}
