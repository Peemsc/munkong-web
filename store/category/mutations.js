export default {
  FETCH_CATEGORY(state, data) {
    state.categories = data
  },
  FETCH_WITH_SUBCATEGORY (state, data) {
    state.cateWithSubCate = data
  }
}
