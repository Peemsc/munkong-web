export default {
  createReview ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/review/create/', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
