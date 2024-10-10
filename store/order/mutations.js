export default {
  FETCH_ORDER (state, data) {
    state.orderList = data
  },
  UPDATE_ORDER (state, data) {
    const index = state.orderList.findIndex(item => item.orderId === data.orderId)
    state.orderList[index].status = data.status
  },
}
