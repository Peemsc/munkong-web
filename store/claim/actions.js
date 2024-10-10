
export default {
  createClaim ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/claim/create', payload)
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
      })
    })
  },
  fetchClaim ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/claim/show/${payload}`)
        .then(response => {
          commit('SET_CLAIMS', response.data)
          resolve()
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  }

}
