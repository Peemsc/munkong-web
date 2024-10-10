export default {
  fetchCategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/category/show/')
        .then((response) => {
          commit("FETCH_CATEGORY", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchWithSubcategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/category/with-subcategory')
        .then((response) => {
          commit("FETCH_WITH_SUBCATEGORY", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
