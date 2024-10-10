import axios from "axios";

export default {
  fetchCatalog ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/show-catalog/get')
        .then((response) => {
          commit("FETCH_CATALOG", response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
