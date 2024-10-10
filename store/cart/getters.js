export default {
  getCart: state => state.cart,
  getCheckProduct: state => state.cart.items.filter((item) => item.isCheck === true)
}
