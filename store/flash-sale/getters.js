export default {
  getFlashSales: state => state.flashSales,
  filterFlashSale: state => state.flashSales.filter(item => {
    const nowDate = new Date()
    if (nowDate > new Date(item.startDate) && nowDate < new Date(item.endDate)) {
      return true
    }
    return false
  })
}
