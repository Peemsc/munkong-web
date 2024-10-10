import axios from "axios";

export default {
  checkOut ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/customer/order/checkout/online', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchOrder ({ commit }, custId) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/order/show/${custId}`)
        .then((response) => {
          resolve(response)
          commit("FETCH_ORDER", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  changeStatus ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/api/customer/order/change-status/${payload.status}/${payload.orderId}`)
        .then((response) => {
          resolve(response)
          if (payload.type !== 'single') {
            commit("UPDATE_ORDER", payload)
          }
        })
        .catch((error) => {
          reject(error)
          console.log(error)
        })
    })
  },
  checkStatusOrder ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/order/check-status/${payload}`)
        .then((response) => {
          resolve(response)
          // commit("UPDATE_ORDER", payload)
        })
        .catch((error) => {
          reject(error)
          console.log(error)
        })
    })
  },
  getOrder ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/order/get/${payload}`)
        .then((response) => {
          resolve(response)
          // commit("UPDATE_ORDER", payload)
        })
        .catch((error) => {
          reject(error)
          console.log(error)
        })
    })
  },
  getOrderId ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/order/getOrderId')
        .then((response) => {
          resolve(response)
          // commit("UPDATE_ORDER", payload)
        })
        .catch((error) => {
          reject(error)
          console.log(error)
        })
    })
  },
  updateOrder ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/api/customer/order/update/${payload.id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
