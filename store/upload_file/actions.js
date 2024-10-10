export default {
  uploadFile (_, file) {
    return new Promise((resolve, reject) => {
      const baseUrl = window.location.origin
      this.$axios.$post('/api/upload/image-only-url', file)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
