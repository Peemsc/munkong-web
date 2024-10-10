export default {
  fetchHelpCenter ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/help-center/show/')
        .then((response) => {
          commit("FETCH_HELP_CENTER", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getHelpCenter ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/help-center/get/${payload}`)
        .then((response) => {
          commit("GET_HELP_CENTER", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
