export default {
  FETCH_BRAND(state, data) {
    state.brands = data
  },
  GET_BRAND(state, data) {
    state.brand = data
  },
  GET_PRODUCT_BRAND (state, data) {
    state.product = data
  },
  GET_PRIORITY_BRANDS (state, data) {
    state.brandListPriority = data
  },
  SET_PAGINATION (state, data) {
    state.pagination.currentPage = data.currentPage
    state.pagination.pageSize = data.pageSize
    state.pagination.pageTotal = data.pageTotal
  },

}
