import axios from "axios";

export default {
  generateToken ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/payment/gen-token', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  generateKBankToken ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/payment/gen-token-kbank', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
