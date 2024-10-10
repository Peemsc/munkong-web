
export default {
  getBuyAgain ({ commit }, custId) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/buy-again/show/${custId}`)
        .then((response) => {
          resolve(response)
          commit("FETCH_BUY_AGAIN", response.data)
        })
        .catch((error) => {
          reject(error)
          console.log(error)
        })
    })
  },
}
