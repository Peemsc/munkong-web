export default {
  fetchHowToPoint ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/how-to-point/show/')
        .then((response) => {
          commit("FETCH_HOW_TO_POINT", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getHowToPoint ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/how-to-point/get/${payload}`)
        .then((response) => {
          commit("GET_HOW_TO_POINT", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
