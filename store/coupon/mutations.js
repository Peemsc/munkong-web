export default {
  FETCH_COUPON (state, data) {
    state.couponList = data
  },
  FETCH_MY_COUPON (state, data) {
    const nowDate = new Date().setHours(0, 0, 0, 0)
    state.myCoupons = data.filter((item) => nowDate < new Date(item.coupon.endDate))
  }
}
