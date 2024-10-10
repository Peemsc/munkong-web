export default {
  filterCoupon: state => status => state.myCoupons.filter(item => item.isUse === status),
  searchCoupon: state => (code, status= false) => state.myCoupons.filter(item =>
    code === 'all' || item.coupon.name.toLowerCase().indexOf(code.toLowerCase()) > -1  || item.coupon.code.toLowerCase().indexOf(code.toLowerCase()) > -1 && item.isUse === status)
}
