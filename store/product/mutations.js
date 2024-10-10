export default {
  GET_PRODUCT(state, data) {
    state.product = data
  },
  FETCH_ALL_PRODUCT (state, data) {
    state.allProducts = data
  },
  FETCH_PRODUCT(state, data) {
    state.products = data
  },
  SET_PAGINATION (state, data) {
    state.pagination.currentPage = data.currentPage
    state.pagination.pageSize = data.pageSize
    state.pagination.pageTotal = data.pageTotal
    state.pagination.totalItems = data.totalItems
  },
  SELECT_PRODUCT_MODAL (state, data) {
    state.modalProduct = data
  },
  FETCH_REVIEW (state, data) {
    state.review = data
  },
  FETCH_QUESTION (state, data) {
    state.question = data
  },
  ADD_QUESTION (state, data) {
    state.question.data.unshift(data)
  }
}
