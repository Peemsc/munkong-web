export default {
  filterOrder: state => status => state.orderList.filter((item) => {
    if(status === 'all' || item.status === status) {
      return true
    }
  })
}
