export default {
  filterCoupon: state => status => state.myCoupons.filter(item => item.isUse === status)
}
