export default {
  fetchPromotion ({ commit }, page) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/promotion/show/?page=${page}`)
        .then((response) => {
          resolve(response)
          commit("FETCH_PROMOTION", response.data)
          commit("SET_PAGINATION", response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getPromotion ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/promotion/get/${payload}`)
        .then((response) => {
          resolve(response)
          commit("GET_PROMOTION", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  randomPromotion ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/promotion/random/')
        .then((response) => {
          resolve(response)
          commit("FETCH_RANDOM_PROMOTION", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showPriority ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/promotion/show-priority/')
        .then((response) => {
          resolve(response)
          commit("FETCH_PRIORITY_PROMOTION", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getPromotionDiscount ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/promotion/check-product-discount/${payload}`)
        .then((response) => {
          resolve(response)
          commit("GET_PROMOTION_DISCOUNT", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
