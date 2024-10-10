export default {
  getPointCashback ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/point-cashback/get/')
        .then((response) => {
          resolve(response.data)
          commit("GET_POINT_CASHBACK", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
