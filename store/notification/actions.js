export default {
  fetchNotification ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/notification/get/${payload}`)
        .then((response) => {
          commit("FETCH_NOTIFICATION", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchNotificationAll ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/notification/get-all/${payload}`)
        .then((response) => {
          commit("FETCH_NOTIFICATION_ALL", response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async updateNotificationStatus({ commit }, payload) {
    try {
      const response = await this.$axios.post('/api/customer/notification/update', payload)
      commit('SET_NOTIFICATION_STATUS', response.data.status)
    } catch (error) {
      console.error(error)
    }
  }
}
