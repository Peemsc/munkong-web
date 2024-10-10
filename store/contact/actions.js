
export default {
  createContact ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/contact/create', payload)
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
      })
    })
  }
}
