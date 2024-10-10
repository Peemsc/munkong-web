export default {
  filterCoupon: state => status => state.myCoupons.filter(item => item.isUse === status),
  typeBanner: state => state.typeBanner,
  priorityBanner: state => state.priorityBanner,
  typeBanner: state => state.typeCreateAtBanner,
}
