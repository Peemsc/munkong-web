import axios from "axios";

export default {
  fetchBundle ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/bundle/show')
        .then((response) => {
          commit('FETCH_BUNDLE', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
      })
    })
  },
  getBundle ({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/bundle/get/${payload}`)
        .then((response) => {
          commit('GET_BUNDLE', response.data)
          resolve(response)
        }).catch((error) => {
        reject(error)
      })
    })
  }
}
