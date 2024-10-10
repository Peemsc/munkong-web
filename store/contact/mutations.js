import cart from "~/pages/cart";

const CART_LOCALSTORAGE_NAME = "cart"
export default {
  ADD_TO_CART(state, data) {
    state.cart.push(data)
    localStorage.setItem(CART_LOCALSTORAGE_NAME, JSON.stringify(state.cart))
  },
  GET_CART(state) {
    const cartItems = localStorage.getItem(CART_LOCALSTORAGE_NAME)
    if(cartItems) {
      state.cart = JSON.parse(cartItems)
    } else {
      state.cart = []
    }
  },
  DELETE_ITEM(state, id) {
    const index = state.cart.findIndex(item => item.id === id)
    state.cart.splice(index, 1)
    localStorage.setItem(CART_LOCALSTORAGE_NAME, JSON.stringify(state.cart))
  },
  SELECT_ALL_ITEM(state, checkAll) {
    if(state.cart.length != 0) {
      state.cart.forEach((data) => {
        if(checkAll) {
          data.isCheck = true
        } else {
          data.isCheck = false
        }
      })
    }
    localStorage.setItem(CART_LOCALSTORAGE_NAME, JSON.stringify(state.cart))
  },
  UNDO_SELECT (state, index) {
    state.cart[index].isCheck = !state.cart[index].isCheck
    localStorage.setItem(CART_LOCALSTORAGE_NAME, JSON.stringify(state.cart))
  },
  MANAGE_AMOUNT (state, data) {
    if(state.cart[data.index].amount >= 1) {
      if(data.type === "+") {
        state.cart[data.index].amount += 1
        state.cart[data.index].sumPrice += state.cart[data.index].price
      } else {
        state.cart[data.index].amount -= 1
        state.cart[data.index].sumPrice -= state.cart[data.index].price
      }
    }
    if(state.cart[data.index].amount < 1){
      state.cart.splice(data.index, 1)
    }
    localStorage.setItem(CART_LOCALSTORAGE_NAME, JSON.stringify(state.cart))
  }
}
