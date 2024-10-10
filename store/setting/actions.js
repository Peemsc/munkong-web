export default {
  getSetting({ commit }, payload = "setting") {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/customer/setting/get?from=${payload}`)
        .then((response) => {
          commit("GET_SETTING", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // getOtherbox({commit}, payload) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.$get('/api/customer/setting/get-label')
  //       .then((response) => {
  //         commit('GET_OTHERBOX', response.data)
  //         resolve(response)
  //       }).catch((error) => {
  //         reject(error)
  //     })
  //   })
  // }
  subScribe ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/subscriber', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
};
