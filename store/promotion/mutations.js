export default {
  FETCH_PROMOTION (state, data) {
    state.promotions = data
  },
  FETCH_RANDOM_PROMOTION (state, data) {
    state.random = data
  },
  GET_PROMOTION (state, data) {
    state.promotion = data
  },
  FETCH_PRIORITY_PROMOTION (state, data) {
    state.listPriority = data
  },
  SET_PAGINATION (state, data) {
    state.pagination.currentPage = data.currentPage
    state.pagination.pageSize = data.pageSize
    state.pagination.pageTotal = data.pageTotal
  },
  GET_PROMOTION_DISCOUNT (state, data){
    state.promotion = data
  }
}
