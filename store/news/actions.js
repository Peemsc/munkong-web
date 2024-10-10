export default {
  fetchNews ({ commit }, query) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/news/show/?page=${query.page}&type=${query.type}`)
        .then((response) => {
          commit("FETCH_NEWS", response.data)
          commit("SET_PAGINATION", response)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getNews ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/news/get/${payload}`)
        .then((response) => {
          commit("GET_NEWS", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  randomNews ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/news/random/')
        .then((response) => {
          commit("GET_RANDOM_NEWS", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showPriority ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/news/show-priority')
        .then((response) => {
          commit("GET_PRIORITY_NEWS", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
