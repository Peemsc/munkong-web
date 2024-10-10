export default {
  FETCH_NOTIFICATION(state, data) {
    state.notifications = data
  },
  FETCH_NOTIFICATION_ALL(state, data) {
    state.notifications = data
  },
  SET_NOTIFICATION_STATUS(state, status) {
    state.notificationStatus = status
  }
}
