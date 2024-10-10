export default {
  fetchProvince ({ commit }) {
    return new Promise((resolve, reject) => {
      const baseUrl = window.location.origin
      this.$axios.$get(`${baseUrl}/address.json`)
        .then((response) => {
          commit("SET_PROVINCE", response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
