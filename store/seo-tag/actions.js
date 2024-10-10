export default {
  fetchSeoTag ({ commit }, query) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/seo-tag/show`)
        .then((response) => {
          commit("FETCH_SEO_TAG", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // getSeoTag ({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.$get(`/api/customer/seo-tag/get/${payload}`)
  //       .then((response) => {
  //         commit("GET_SEO_TAG", response.data)
  //         resolve(response.data)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // randomSeoTag ({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.$get('/api/customer/seo-tag/random/')
  //       .then((response) => {
  //         commit("GET_RANDOM_SEO_TAG", response.data)
  //         resolve(response.data)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  // showPriority ({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.$get('/api/customer/seo-tag/show-priority')
  //       .then((response) => {
  //         commit("GET_PRIORITY_SEO_TAG", response.data)
  //         resolve(response.data)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
}
