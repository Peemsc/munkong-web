import axios from "axios";

export default {
  updateProfile ({ commit }, payload) {
    let updateType = "general"
    if (payload.updateType === "social") {
      updateType = payload.updateType
    }
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/api/customer/manage/update/${payload.custId}?from=website&update=${updateType}`, payload)
        .then((response) => {
          commit('UPDATE_PROFILE', payload)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  resetPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put(`/api/customer/manage/reset-password/${payload.custId}`, payload)
        .then((response) => {
          // commit('UPDATE_PROFILE', payload)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }


}
