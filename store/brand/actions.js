export default {
  getBrand ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/brand/get/${payload}`)
        .then((response) => {
          commit("GET_BRAND", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/brand/get-product/?brand=${payload.brandId}&page=${payload.page}&sort=${payload.sort}`)
        .then((response) => {
          commit("GET_PRODUCT_BRAND", response.data)
          commit("SET_PAGINATION", response)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchBrand ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/brand/show/')
        .then((response) => {
          commit("FETCH_BRAND", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showPriority ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/brand/show-priority')
        .then((response) => {
          commit("GET_PRIORITY_BRANDS", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
