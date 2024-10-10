import jwt from 'jsonwebtoken'

const JWT_KET = 'a61b3ac2ade911ba93a3cb3b25d4889ff8e99e80b98fba4b0a9fb8b1b020033c80222972545c9d05dde2b9eed981981207dd8045fb1f98fc1d7326f71758fe87'
const CART_LOCALSTORAGE_NAME = "cart"

const DateTime = new Date()

export default {
  async UPDATE_CART (state, data) {
    try {
      state.cart.items = data
      const cartToken = await encodeCart(state.cart.items)
      localStorage.setItem(CART_LOCALSTORAGE_NAME, cartToken.toString())
    } catch (e) {
      console.log(error)
    }
  },

  async ADD_TO_CART(state, data) {
    if(state.cart.items.length > 0) {
      const product = state.cart.items.find(item => item.option.name === data.option.name && item.option.attribute === data.option.attribute && item.name === data.name)
      if(product) {
        product.amount += data.amount
      } else {
        state.cart.items.push(data)
      }
    } else {
      state.cart.items.push(data)
    }

    try {
      const cartToken = await encodeCart(state.cart.items)
      localStorage.setItem(CART_LOCALSTORAGE_NAME, cartToken.toString())
    } catch (e) {
      console.log(error)
    }
  },

  async REMOVE_OUT_OF_STOCK (state, data) {
    try {
      const cartToken = localStorage.getItem(CART_LOCALSTORAGE_NAME);
      if (cartToken) {
        const decodeItem = jwt.verify(cartToken, JWT_KET)
        const cartItem = decodeItem.cart.filter(item => data.indexOf(item.option.itemNo) === -1)

        const encodeCartItem = await encodeCart(cartItem)
        localStorage.setItem(CART_LOCALSTORAGE_NAME, encodeCartItem.toString())
      }
    } catch (e) {
      console.error(e.message)
    }
  },

  async GET_CART(state) {
    try {
      if (localStorage.getItem(CART_LOCALSTORAGE_NAME)) {
        const decodeItem = jwt.verify(localStorage.getItem(CART_LOCALSTORAGE_NAME), JWT_KET)
        const cartItem = decodeItem.cart
        if (cartItem) {
          state.cart.items = cartItem
          state.cart.items.map(item => {
            item.discount = item.option.discount
            item.bundleDiscount = 0
          })
        } else {
          state.cart.items = []
        }
      }
    } catch (e) {
      console.error(e.message)
    }
  },
  DELETE_ITEM(state, index) {
    state.cart.items.splice(index, 1)

    if(state.cart.items.length === 0) {
      state.cart.totalDiscount = 0
      state.cart.totalPrice = 0
      state.cart.totalBundle = 0
      state.cart.point = 0
      state.cart.pointCashback = 0
    }
  },
  async SAVE_CART (state) {
    state.cart.items.map(item => {
      item.discount = item.option.discount
      item.bundleDiscount = 0
    })

    try {
      const cartToken = await encodeCart(state.cart.items)
      localStorage.setItem(CART_LOCALSTORAGE_NAME, cartToken.toString())
    } catch (e) {
      console.log(error)
    }
  },
  SELECT_ALL_ITEM(state, checkAll) {
    if (state.cart.items.length !== 0) {
      state.cart.items.forEach((data) => {
        data.isCheck = !!checkAll;
      })
    }
  },
  UNDO_SELECT(state, index) {
    state.cart.items[index].isCheck = !state.cart.items[index].isCheck

  },
  MANAGE_AMOUNT(state, data) {
    if (state.cart.items[data.index].amount >= 1) {
      if (data.type === "+") {
        state.cart.items[data.index].amount += 1
      } else if(data.type === "-") {
        state.cart.items[data.index].amount -= 1
      } else if(data.type === "="){
        state.cart.items[data.index].amount = data.amount
      }
    }
    if (state.cart.items[data.index].amount < 1) {
      state.cart.items.splice(data.index, 1)
    }
  },
  REMOVE_SUCCESS_ITEM(state) {
    state.cart.items = state.cart.items.filter(item => item.isCheck === false)
    // state.cart.totalDiscount = 0
    // state.cart.totalPrice = 0
    // state.cart.totalBundle = 0
    // state.cart.point = 0
  },
  UPDATE_PRICE (state) {
    if(state.cart.items.length > 0) {
      state.cart.totalDiscount = 0
      state.cart.totalPrice = 0
      state.cart.totalBundle = 0

      const selectItem = state.cart.items.filter(item => item.isCheck)
      for (const item of selectItem) {
          state.cart.totalPrice += item.price * item.amount
          state.cart.totalDiscount += (item.discount * item.amount)
          state.cart.totalBundle += item.bundleDiscount || 0
      }
    }
  },
  UPDATE_PRICE_BUNDLE (state, bundles) {
    if (state.cart.items.length > 0) {
      let count = 0
      bundles?.map(bundle => {
        state.cart.items.map(item => {
          const index = bundle.subBundle.findIndex(product => product === item._id)
          if (index > -1) {
            count += item.amount
          }
          if (count === bundle.condition) {
            if (bundle.discountType === 'percent') {
              item.bundleDiscount = (item.price * bundle.condition) * (bundle.discountValue/100)
            } else {
              item.bundleDiscount = bundle.discountValue
            }
            count = 0
          }
        })
      })
    }
  },
  SET_COUPON_CASH_BACK(state, coupon) {
    let cashBack = 0
    let calCashBack = 0

    const products = state.cart.items.filter(item => item.isCheck)

    products.map(item => {
      if(coupon.cashBackType === 'baht') {
        calCashBack = coupon.cashBackValue
      } else {
        calCashBack = item.option.price * (coupon.cashBackValue/100)
      }

      if (coupon.checkboxProducts) {//Sale all products
        const index = coupon.excludeProducts.findIndex(id => item.option.id === id)
        if (index === -1) {
          cashBack += calCashBack
        }
      } else if (coupon.checkboxBrands) {//Sale all brand
        const index = coupon.excludeBrands.findIndex(id => item.brand === id)
        if (index === -1) {
          cashBack += calCashBack
        }
      } else if (coupon.checkboxCategories) {//Sale all category
        coupon.excludeCategories.map(id => {
          const index = item.listCategory.findIndex(singleItem => singleItem.itemCategory === id)
          if (index === -1) {
            cashBack += calCashBack
          }
        })

      } else if (coupon.products.length !== 0 && !coupon.checkboxProducts) {
        const index = coupon.products.findIndex(id => item.option.id === id)
        if (index !== -1) {
          cashBack += calCashBack
        }
      } else if (coupon.brands.length !== 0 && !coupon.checkboxBrands) {
        const index = coupon.brands.findIndex(id => item.brand === id)
        if (index !== -1) {
          cashBack += calCashBack
        }
      } else if (coupon.categories.length !== 0 && !coupon.checkboxCategories) {
        coupon.categories.map(id => {
          let index = item.listCategory.findIndex(singleItem => singleItem.itemCategory === id)
          if (index !== -1) {
            cashBack += item.option.price * (coupon.cashBackValue/100)
          }
        })
        // const index = coupon.categories.findIndex(id => item.category === id)
      }
    })

    if (coupon.cashBackType === 'percent' && cashBack > coupon.maxCashBack && coupon.maxCashBack !== 0) {
      cashBack = coupon.maxCashBack
    }
    state.cart.couponCashback = cashBack
  },
  // SET_COUPON_DISCOUNT(state, coupon) {
  //   state.cart.items.map(item => {
  //     let discount = 0
  //     if (coupon.discountType === 'baht') {
  //       discount = coupon.discountValue
  //     } else {
  //       discount = item.price * (coupon.discountValue / 100)
  //       if (discount > coupon.maxDiscount) {
  //         discount = coupon.maxDiscount
  //       }
  //     }
  //     if (coupon.checkboxProducts) {//Sale all products
  //       const index = coupon.excludeProducts.findIndex(id => item.option.id === id)
  //       if (index !== -1) {
  //         item.discount += discount
  //       }
  //     } else if (coupon.checkboxBrands) {//Sale all products
  //       const index = coupon.excludeBrands.findIndex(id => item.brand === id)
  //       if (index !== -1) {
  //         item.discount += discount
  //       }
  //     } else if (coupon.checkboxCategories) {//Sale all products
  //       const index = coupon.excludeCategories.findIndex(id => item.category === id)
  //       if (index !== -1) {
  //         item.discount += discount
  //       }
  //     } else if (coupon.products.length !== 0 && !coupon.checkboxProducts) {
  //       const index = coupon.products.findIndex(id => item.option.id === id)
  //       if (index !== -1) {
  //         item.discount += discount
  //       }
  //     } else if (coupon.brands.length !== 0 && !coupon.checkboxBrands) {
  //       const index = coupon.brands.findIndex(id => item.brand === id)
  //       if (index !== -1) {
  //         item.discount += discount
  //       }
  //     } else if (coupon.categories.length !== 0 && !coupon.checkboxCategories) {
  //       const index = coupon.categories.findIndex(id => item.category === id)
  //       if (index !== -1) {
  //         item.discount += discount
  //       }
  //     }
  //   })
  // },

  SET_COUPON_DISCOUNT(state, coupon) {
    let totalDiscount = 0
    let discount = 0

    const products = state.cart.items.filter(item => item.isCheck)

    products.map(item => {
      if (coupon.discountType === 'baht') {
        discount = coupon.discountValue
      } else {
        discount = (item.price - item.discount) * (coupon.discountValue / 100)
      }

      if (coupon.checkboxProducts) {//Sale all products
        const index = coupon.excludeProducts.findIndex(id => item.option.id === id)
        if (index === -1) {
          totalDiscount += discount
        }
      } else if (coupon.checkboxBrands) {//Sale all products
        const index = coupon.excludeBrands.findIndex(id => item.brand === id)
        if (index === -1) {
          totalDiscount += discount
        }
      } else if (coupon.checkboxCategories) {//Sale all products
        coupon.excludeCategories.map(id => {
          const index = item.listCategory.findIndex(singleItem => singleItem.itemCategory === id)
          if (index === -1) {
            totalDiscount += discount
          }
        })
        // const index = coupon.excludeCategories.findIndex(id => item.category === id)
      } else if (coupon.products.length !== 0 && !coupon.checkboxProducts) {
        const index = coupon.products.findIndex(id => item.option.id === id)
        if (index !== -1) {
          totalDiscount += discount
        }
      } else if (coupon.brands.length !== 0 && !coupon.checkboxBrands) {
        const index = coupon.brands.findIndex(id => item.brand === id)
        if (index !== -1) {
          totalDiscount += discount
        }
      } else if (coupon.categories.length !== 0 && !coupon.checkboxCategories) {
        coupon.categories.map(id => {
          let index = item.listCategory.findIndex(singleItem => singleItem.itemCategory === id)
          if (index !== -1) {
            totalDiscount += discount
          }
        })
      }
    })

    if (coupon.discountType === 'percent' && totalDiscount > coupon.maxDiscount && coupon.maxDiscount !== 0) {
      totalDiscount = coupon.maxDiscount
    }

    state.cart.couponDiscount = totalDiscount
  },

  CALCULATE_POINT (state, point) {
    // let point = data.pointCashback
    let totalPrice = state.cart.totalPrice - (state.cart.totalDiscount + state.cart.totalBundle + state.cart.couponDiscount)
    //check special point cashback
    if (point.startDate && point.endDate) {
      const startDate = new Date(point.startDate)
      const endDate = new Date(point.endDate)
      if(DateTime >= startDate && DateTime <= endDate && totalPrice > point.basePrice) {
        let cashBack = 0
        let products = [...state.cart.items]
        products = products.filter(item => item.isCheck)
        products.map(item => {
          if (point.checkboxProducts) {
            const index = point.excludeProducts.findIndex(id => item._id === id)
            if (index === -1) {
              cashBack += (item.price - item.discount) * (point.cashBackValue/100)
            }
          } else if (point.checkboxBrands) {
            const index = point.excludeBrands.findIndex(id => item.brand === id)
            if (index === -1) {
              cashBack += (item.price - item.discount) * (point.cashBackValue/100)
            }
          } else if (point.checkboxCategories) {
            let index = -1
            point.excludeCategories.map(id => {
              index = item.listCategory.findIndex(singleItem => singleItem.itemCategory === id)
            })
            // const index = point.excludeCategories.findIndex(id => item.category === id)
            if (index === -1) {
              cashBack += (item.price - item.discount) * (point.cashBackValue/100)
            }
          } else if (point.products.length !== 0 && !point.checkboxProducts) {
            const index = point.products.findIndex(id => item._id === id)
            if (index !== -1) {
              cashBack += (item.price - item.discount) * (point.cashBackValue/100)
            }
          } else if (point.brands.length !== 0 && !point.checkboxBrands) {
            const index = point.brands.findIndex(id => item.brand === id)
            if (index !== -1) {
              cashBack += totalPrice * (point.cashBackValue/100)
            }
          } else if (point.categories.length !== 0 && !point.checkboxCategories) {
            let index = -1
            point.categories.map(id => {
              index = item.listCategory.findIndex(singleItem => singleItem.itemCategory === id)
            })
            // const index = point.categories.findIndex(id => item.category === id)
            if (index !== -1) {
              cashBack += (item.price - item.discount) * (point.cashBackValue/100)
            }
          }
        })

        if(cashBack > point.maxCashBack) {
          cashBack = point.maxCashBack
        }

        state.cart.point = cashBack
        return 0;
      }
    }

    state.cart.point = totalPrice * (point.cashBack/100)
  },
  REMOVE_COUPON (state) {
    state.cart.couponDiscount = 0
  },
  //ลบพ้อยท์เงินคืน
  CAL_NEW_POINT_CASHBACK (state, data) {
    const calNewPoint = state.cart.point - (data/100)
    state.cart.point = Math.floor(calNewPoint)
  }
}

function encodeCart (data) {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign({
          cart: data,
        },
        JWT_KET, {
          expiresIn: "30d"
        })

      resolve(token)
    } catch (e) {
      reject(e.message)
    }
  })
}
