export default {
  fetchBannerFlashsale ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/banner-flashsale/show/')
        .then((response) => {
          resolve(response)
          commit("FETCH_BANNER", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showPriority ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/banner-flashsale/show-priority/`)
        .then((response) => {
          resolve(response)
          commit("FETCH_PRIORITY_BANNER", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
