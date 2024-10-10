export default {
  fetchCoupon ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/coupon/show/')
        .then((response) => {
          resolve(response)
          commit("FETCH_COUPON", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  keepCoupon ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/my-coupon/keep/', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  myCoupon ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/my-coupon/show/${payload}`)
        .then((response) => {
          resolve(response)
          commit("FETCH_MY_COUPON", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getCoupon ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/coupon/get/${payload}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
