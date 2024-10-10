import axios from "axios";

export default {
  fetchBox ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/website-box/show')
        .then((response) => {
          commit("FETCH_BOX", response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
