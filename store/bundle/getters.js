export default {
  getCart: state => state.cart,
  getCheckProduct: state => state.cart.filter((item) => item.isCheck === true)
}
