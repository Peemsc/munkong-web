export default {
  FETCH_BANNER (state, data) {
    state.banners = data
  },
  FETCH_PRIORITY_BANNER (state, data) {
    state.listPriority = data
  },
  TYPE_BANNER (state, type) {
    state.typeBanner = type
  },
  FETCH_CREATEAT_BANNER( state, data) {
    state.allBanner = data
  },
  TYPE_BANNER_CREATEDAT_BANNER (state, type) {
    state.typeCreateAtBanner = type
  },
}
