export default {
  createCart ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/cart/create', payload)
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },
  recheckPrice ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/cart/recheck', payload)
        .then((response) => {
          commit("UPDATE_CART", response.data.items)
          resolve(response)
        }).catch((error) => {
        reject(error)
      })
    })
  },
}
