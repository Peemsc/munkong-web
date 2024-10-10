export default {
  showPriority ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/payment-method/show-priority/`)
        .then((response) => {
          resolve(response)
          commit("FETCH_PRIORITY_PAYMENT", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
