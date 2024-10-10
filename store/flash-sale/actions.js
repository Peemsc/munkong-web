export default {
  fetchFlashSale ({ commit }) {
    return new Promise((resolve, reject) => {
      const timestamp = Date.now();
      this.$axios.$get(`/api/customer/flash-sale/show?timestamp=${timestamp}`)
        .then((response) => {
          resolve(response.data)
          commit("FETCH_FLASH_SALE", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getFlashSale ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/flash-sale/get/${payload}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
