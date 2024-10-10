export default {
  FETCH_NEWS(state, data) {
    state.newsList = data
  },
  GET_NEWS(state, data) {
    state.news = data
  },
  GET_RANDOM_NEWS (state, data) {
    state.random = data
  },
  GET_PRIORITY_NEWS (state, data) {
    state.newsListPriority = data
  },
  SET_PAGINATION (state, data) {
    state.pagination.currentPage = data.currentPage
    state.pagination.pageSize = data.pageSize
    state.pagination.pageTotal = data.pageTotal
  },
}
