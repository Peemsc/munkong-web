export default {
  fetchPromotion({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/customer/banner/show/')
        .then((response) => {
          resolve(response)
          commit("FETCH_BANNER", response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showAllBanner({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/banner/show-by-createAt/`)
        .then((response) => {
          resolve(response)
          let data = response.data.filter(item => item.type === 'video')
          let type = 'video'
          if (!data.length) {
            data = response.data.filter(item => item.type === 'image')
            type = 'image'
          }
          commit("FETCH_CREATEAT_BANNER", data)
          commit("TYPE_BANNER_CREATEDAT_BANNER", type)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  showPriority({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`/api/customer/banner/show-priority/`)
        .then((response) => {
          resolve(response)
              // commit("FETCH_PRIORITY_BANNER", response.data)
          let data = response.data.filter(item => item.type === 'video')
          let type = 'video'
          if (!data.length) {
            data = response.data.filter(item => item.type === 'image')
            type = 'image'
          }
          commit("FETCH_PRIORITY_BANNER", data)
          commit("TYPE_BANNER", type)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

}
