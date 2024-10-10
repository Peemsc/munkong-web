
export default {
  createView ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/count-view/create', payload)
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
      })
    })
  }
}
