export default {
  getProduct({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/product/get/${payload}`)
        .then((response) => {
          resolve(response.data)
          commit("GET_PRODUCT", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchAllProduct({commit}) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/product/all')
        .then((response) => {
          commit("FETCH_ALL_PRODUCT", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchProduct({commit}, query) {
    if (query) {
      return new Promise((resolve, reject) => {
        this.$axios.$get(`/api/customer/product/show/?${query}`)
          .then((response) => {
            commit("FETCH_PRODUCT", response.data)
            commit("SET_PAGINATION", response)
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  randomProduct({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/product/random/${payload}`)
        .then((response) => {
          resolve(response.data)
          // commit("GET_PRODUCT", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  askQuestion({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/question/create', payload)
        .then((response) => {
          // commit("ADD_QUESTION", response.data)
          resolve(response.data)
          // commit("GET_PRODUCT", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showReview({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/product/show-review/?id=${payload.id}&reviewPage=${payload.reviewPage}`)
        .then((response) => {
          resolve(response.data)
          commit("FETCH_REVIEW", response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showQuestion({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/product/show-question/?id=${payload.id}&questionPage=${payload.questionPage}`)
        .then((response) => {
          resolve(response.data)
          commit("FETCH_QUESTION", response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  checkPreOrder ({ commit }, productId) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/product/preorder-stock/${productId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
