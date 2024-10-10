export default {
  fetchHighlight ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/highlight/show-priority/')
        .then((response) => {
          commit("FETCH_HIGHLIGHT", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showAllHighlight ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/highlight/show-by-createAt/')
        .then((response) => {
          commit("FETCH_HIGHLIGHT_All", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getHighlight ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/highlight/get/${payload}`)
        .then((response) => {
          commit("GET_HIGHLIGHT", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
