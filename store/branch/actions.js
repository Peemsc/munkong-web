export default {
  fetchBranch ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/branch/show/')
        .then((response) => {
          commit("FETCH_BRANCH", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  viewBranch ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/branch/get/${payload}`)
        .then((response) => {
          commit("GET_BRANCH", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
