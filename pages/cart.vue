<template>
  <div class="section-setting" style="background-color: #f5f5f5">

    <div class="container">
      <div class="container-inner mw-1200" style="background-color: #f5f5f5">
        <div class="setting-content">
          <div class="bgroup mt-2 d-flex align-items-center">
            <h3 class="title-24">
              <img class="w-24 mr-2" src="../assets/img/icons/icon-bag-2.svg" alt="" />
              {{ $t("cart") }} <br /><span class="note kanit f-16 d-none d-md-flex">{{ $t("have") }} {{ cart.items.length
              }}
                {{ $t("listProduct") }}</span>
            </h3>
          </div>
          <!--bgroup-->

          <div class="position-relative">
            <div class="checkbox-group cart-check-all">
              <input id="a1" type="checkbox" name="a" :value="isSelectAll" @click="selectAll()" />
              <label for="a1" class="kanit pr-0">{{
                /*$t("selectAll")*/
                $t('detailProduct')
              }}</label>
            </div>
          </div>

          <div class="order-box">
            <hr class="mt-0 mt-md-5 mb-0" />
            <!--เริ่ม 1 รายการ-->
            <template v-for="(item, index) in cart.items">
              <div :key="index" class="card-order cart">
                <div class="card-checker">
                  <div class="checkbox-group m-md-auto no-text" @click="undoSelect(index)">
                    <input :id="'b' + index" type="checkbox" name="a" :checked="item.isCheck" />
                    <label></label>
                  </div>
                </div>
                <div class="card-photo"> <!--:data-title="$t('detailProduct')"-->
                  <div class="photo" :style="{ backgroundImage: 'url(' + item.image.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + ')' }"></div>
                </div>
                <div class="card-body">
                  <div class="cols info ml-0 cart-name-custom">
                    <h5 class="mb-2">{{ item.name }}</h5>
                    <p class="m-0 black-50">
                      {{ item.option.attribute }} {{ item.option.subValue }}
                    </p>
                  </div>
                  <div class="cols price cart-price-custom title-right" :data-title="$t('unitOfPrice')">
                      <h4 class="reddark main">
                        ฿{{ (item.price - item.discount) | numFormat }}
                      </h4>
                      <p class="black-50" v-if="item.option.price > item.price">
                        <span class="d-none d-md-inline">{{ $t("normalPrice") }} :
                          <span class="line-through">฿{{ item.option.price | numFormat }}</span><br /></span>
                        {{ $t("savePrice") }} :
                        <span>฿{{ (item.option.price - item.price) | numFormat }}</span>
                      </p>
                  </div>
                  <div class="cols qty" :data-title="$t('quantity')">
                    <div class="input-qty-group">
                      <button class="minus" :disabled="item.amount <= 1" @click="manageAmount(index, '-')"></button>
                      <input type="text" name="qty+ index" class="qty form-control input-text" maxlength="12"
                        :value="item.amount" readonly />
                      <button :disabled="item.amount >= item.stockLimit || item.amount >= 5" class="plus" @click="manageAmount(index, '+')"></button>
                    </div>
                  </div>
                  <div class="cols price total ml-0" :data-title="$t('totalPrice')">
                    <h4 class="reddark">
                      ฿{{
                        ((item.price - item.discount) * item.amount) | numFormat
                      }}
                    </h4>
                  </div>
                </div>
                <!--card-body-->
              </div>
              <!--card-buy-again-->

              <div class="order-row kanit f-14 deal" v-if="checkBundle(item._id)">
                <div class="d-md-flex align-items-center">
                  <div class="btn btn-red-outline xs effect">
                    <span>Bundle Deal</span>
                  </div>
                  <p class="m-0 pl-3">{{ getNameBundle(item._id) }}</p>
                </div>

                <a class="ml-auto reddark d-flex" @click="chooseBundle(item._id)">
                  เลือกสินค้าเพิ่ม <span class="arrow-circle-right ml-2"></span>
                </a>
              </div>

              <hr class="m-0" />

              <div class="order-row kanit f-14">
                <!-- Coupon -->
                <div class="dropdown">
                  <button class="btn keep-coupon xs" data-toggle="dropdown" data-display="static">
                    <span>{{ $t("couponDetailPage") }}</span>
                  </button>
                  <div class="dropdown-menu coupon">
                    <div class="hgroup">
                      <h4>{{ $t("couponDetailPage") }}</h4>
                      <p class="black-50 mb-0">{{ $t("detailCoupon") }}</p>
                    </div>

                    <div class="scroll-inner">
                      <template v-for="(coupons, index) in couponList">
                        <template v-if="coupons.type === 'freeShipping' && coupons.excludeBrands.indexOf(item.brand) !== 0">
                          <div class="card-coupon position-relative" :key="index"
                            :class="coupons.total >= coupons.amount || checkIsMyCoupon(coupons._id) ? 'codeisout' : ''">
                            <div class="card-percent yellow">
                              <span class="m-auto">ส่งฟรี</span>
                            </div>
                            <div class="card-body d-md-flex pr-0">
                              <div class="d-flex flex-column">
                                <p class="title h-auto py-2">{{ coupons.name }}</p>
                                <h3 class="codeisout-text-lineheight">฿{{ coupons.basePrice }} {{ $t('deliveryPrice') }}</h3>
                                <p class="fs-10">เมื่่อซื้อสินค้า {{ coupons.brands.map(brand =>
                                  brand.brandName).toString() }} {{ $t('min') }} {{ coupons.basePrice }}.-</p>
                                <h6 class="fs-10 text-red">
                                  <img src="../assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
                                    coupons.startDate | thaiDate }} - {{ coupons.endDate | thaiDate }}
                                </h6>
                              </div>
                              <button @click="keepCoupon(coupons._id)" class="btn btn-black effect keep">
                                <span v-if="coupons.total >= coupons.amount">{{ $t('couponSold') }}</span>
                                <span v-if="!checkIsMyCoupon(coupons._id)">{{ $t('keepCode') }}</span>
                                <span v-else>{{ $t('alreadyCoupon') }}</span>
                              </button>
                            </div>
                          </div><!--card-coupon-->
                        </template>

                        <template v-if="coupons.type === 'discount' && coupons.excludeBrands.indexOf(item.brand) !== 0">
                          <div class="card-coupon position-relative" :key="index"
                            :class="coupons.total >= coupons.amount || checkIsMyCoupon(coupons._id) ? 'codeisout' : ''">
                            <div class="card-percent">
                              <span class="m-auto"><span v-if="coupons.discountType === 'baht'">฿</span>{{
                                coupons.discountValue
                              }}<span v-if="coupons.discountType === 'percent'">%</span>
                              </span>
                            </div>
                            <div class="card-body d-lg-flex pr-0">
                              <div class="d-block">
                                <p class="title h-auto py-2">{{ coupons.name }}</p>
                                <h3 class="codeisout-text-lineheight">
                                  <span v-if="coupons.discountType === 'baht'">฿</span>{{ coupons.discountValue }}<span
                                    v-if="coupons.discountType === 'percent'">%</span>
                                </h3>
                                <p class="fs-10 text-black" v-if="coupons.discountType === 'baht'">
                                  <span v-if="coupons.maxDiscount > 0">- {{ $t('maxBaht') }} {{ coupons.maxDiscount }}.-,</span>
                                    <span v-if="coupons.basePrice > 0">{{ $t('min') }} {{ coupons.basePrice }}.-</span>
                                    <span v-if="coupons.maxDiscount <= 0 && coupons.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                                </p>
                                <p class="fs-10 text-black" v-if="coupons.discountType === 'percent'">
                                  {{ $t('max') }} {{ coupons.maxDiscount }}.-, {{ $t('min') }} {{ coupons.basePrice }}.-
                                </p>
                                <h6 class="fs-10 text-red">
                                  <img src="../assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
                                    coupons.startDate | thaiDate }} - {{ coupons.endDate | thaiDate }}
                                </h6>
                              </div>
                              <button @click="keepCoupon(coupons._id)" class="btn btn-black effect keep">
                                <span v-if="coupons.total >= coupons.amount">{{ $t('couponSold') }}</span>
                                <span v-if="!checkIsMyCoupon(coupons._id)">{{ $t('keepCode') }}</span>
                                <span v-else>{{ $t('alreadyCoupon') }}</span>
                              </button>
                            </div>
                          </div><!--card-coupon-->
                        </template>

                        <template v-if="coupons.type === 'cashback' && coupons.excludeBrands.indexOf(item.brand) !== 0">
                          <div class="card-coupon position-relative" :key="index"
                            :class="coupons.total >= coupons.amount || checkIsMyCoupon(coupon?._id) ? 'codeisout' : ''">
                            <div class="card-percent">
                              <span class="m-auto">{{ coupons.cashBackValue }}%</span>
                            </div>
                            <div class="card-body d-lg-flex pr-0">
                              <div class="d-block">
                                <p class="title h-auto py-2">{{ coupons.name }}</p>
                                <h3 class="codeisout-text-lineheight">
                                  <span v-if="coupons.cashBackType === 'baht'">฿</span>{{ coupons.cashBackValue }}<span
                                    v-if="coupons.cashBackType === 'percent'">%</span>
                                </h3>
                                <p class="fs-10 text-black" v-if="coupons.discountType === 'baht'">
                                  &nbsp;
                                </p>
                                <h6 class="fs-10 text-red">
                                  <img src="../assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
                                    coupons.startDate | thaiDate }} - {{ coupons.endDate | thaiDate }}
                                </h6>
                              </div>
                              <button @click="keepCoupon(coupons._id)" class="btn btn-black effect keep">
                                <span v-if="coupons.total >= coupons.amount">{{ $t('couponSold') }}</span>
                                <span v-if="!checkIsMyCoupon(coupons._id)">{{ $t('keepCode') }}</span>
                                <span v-else>{{ $t('alreadyCoupon') }}</span>
                              </button>
                            </div>
                          </div><!--card-coupon-->
                        </template>
                      </template>
                    </div>
                    <!--scroll-->
                  </div>
                  <!--dropdown-menu-->
                </div>

                <a class="ml-auto d-flex" @click="deleteItem(index)" style="cursor: pointer">
                  {{ $t("deleteItem") }}
                  <span class="icons icon-delete ml-2 cart-bin-custom"></span>
                </a>
              </div>

              <hr class="m-0 cart-bottom-custom" />
            </template>
            <!--สิ้นสุด 1 รายการ-->
          </div>
          <!--buy-again-box-->

          <div class="order-summary">
            <div class="inner">
              <div class="row">
                <h5>
                  <span class="icons icon-tags mr-2"></span>{{ $t("chooseCoupon") }}
                </h5>
                <p data-toggle="modal" data-target="#selectCouponModal" v-if="isLoggedIn && coupon === null"
                  class="ml-auto">
                  {{ $t("pleaseChooseCoupon") }}
                </p>
                <p data-toggle="modal" data-target="#selectCouponModal" v-if="isLoggedIn && coupon !== null"
                  class="ml-auto">
                  <span v-if="coupon.type === 'discount'">{{ $t("couponDiscount") }} {{ coupon.name }}</span>
                  <span v-if="coupon.type === 'cashback'">{{ $t("couponCashBack") }} {{ coupon.name }}</span>
                </p>
                <p v-if="!isLoggedIn" class="ml-auto">
                  {{ $t("pleaseLogin") }}
                </p>
                <span class="arrow-circle-right ml-2" v-if="coupon === null"></span>
                <span @click="removeCoupon" class="ml-2" style="
                                  cursor: pointer;
                                  width: 16px;
                                  height: 16px;
                                  background-image: url(/img/icons/icon-delete-2.svg);
                                " v-if="coupon !== null"></span>
              </div>

              <div class="row">
                <a v-if="isLoggedIn" class="card-link" href="#pointModal" data-toggle="modal"></a>
                <h5>
                  <span class="icons icon-dollar mr-2"></span>
                  <span v-if="usePoint === 0">{{ $t("remainPoint") }}</span>
                  <span v-else>ใช้พอยท์</span>
                </h5>
                <h5 v-if="isLoggedIn && usePoint === 0" class="ml-auto yellow">
                  {{ parseInt($auth.user.customerPoint) }} points
                </h5>
                <h5 v-if="isLoggedIn && usePoint > 0" class="ml-auto yellow">
                  {{ usePoint }} points
                </h5>
                <h5 v-if="!isLoggedIn" class="ml-auto yellow">
                  {{ $t("pleaseLogin") }}
                </h5>
                <span class="arrow-circle-right ml-2"></span>
              </div>

              <div class="row">
                <h5>
                  <span class="icons icon-newspaper mr-2"></span>{{ $t("orderSummary") }}
                </h5>

                <div class="summary-group ml-auto">
                  <div class="price mr-3 text-right">
                    <h3 v-if="totalDiscount !== 0"> ฿{{ (cart.totalPrice - totalDiscount) | numFormat }} </h3>
                    <h3 v-if="totalDiscount <= 0" class="empty-discount"> ฿{{ (cart.totalPrice - totalDiscount) |
                      numFormat }} </h3>
                    <p v-if="totalDiscount !== 0">
                      {{ $t("savePrice") }} : ฿{{ totalDiscount | numFormat }}
                    </p>
                  </div>
                  <button class="btn btn-black effect w-150" @click="goCheckout" :disabled="disableCart">
                    <span>{{ $t("payment") }}</span>
                  </button>
                </div>
              </div>
            </div>
            <!--inner-->
          </div>
          <!--buy-again-summary-->
        </div>
        <!--setting-content-->
      </div>
      <!--container-inner-->
    </div>
    <!-- Modal Buy Confirm-->
    <ModalBuyConfirm ref="modal" key="buyConfirm" :checkout="this.checkout" />

    <!-- Modal Select Coupon-->
    <ModalSelectCoupon :totalPrice="cart.totalPrice" ref="buyCoupon" @coupon="selectCoupon" key="selectCoupon" />

    <ModalUsePoint :total="cart.totalPrice - cart.totalDiscount" :key="NaN" @point="getUsePoint" />

    <ModalFail :message="couponMessage" />
  </div>
  <!--section-setting-->
</template>

<script>
import ModalBuyConfirm from "@/components/modal/ModalBuyConfirm";
import ModalSelectCoupon from "@/components/modal/ModalSelectCoupon";
import ModalUsePoint from "@/components/modal/ModalUsePoint";
import ModalFail from "@/components/modal/ModelFail";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalFail, ModalUsePoint, ModalSelectCoupon, ModalBuyConfirm },
  layout: "only-header",
  data() {
    return {
      isActive: false,
      isLoggedIn: false,
      checkout: true,
      isSelectAll: false,
      priceTotal: 0,
      disableCart: true,
      showModals: true,
      discount: 0,
      discountPrice: 0,
      coupon: null,
      bundle: null,
      usePoint: 0,
      couponMessage: "",
      totalDiscount: 0,
    };
  },
  async fetch() {
    if (this.isLoggedIn) {
      await this.$store.dispatch('coupon/myCoupon', this.$auth.user.custId)
    }
    await this.$store.dispatch('coupon/fetchCoupon')

    const result = await this.$store.dispatch("bundle/fetchBundle");
    this.bundle = JSON.parse(JSON.stringify(result));
  },
  async created() {
    this.isLoggedIn = this.$auth.loggedIn;
    if (process.browser) {
      window.addEventListener("beforeunload", this.saveCart);
    }
  },
  async mounted() {
    // console.log(this.cart);
    await this.$store.dispatch("cart/recheckPrice", this.cart);
    await this.$store.commit("cart/UPDATE_PRICE_BUNDLE", this.bundle);
    await this.$store.commit("cart/UPDATE_PRICE");
    this.totalDiscount =
      this.cart.totalDiscount +
      this.cart.couponDiscount +
      this.cart.totalBundle;
  },
  methods: {
    async keepCoupon(id) {
      if (this.isLoggedIn) {
        const payload = {
          custId: this.$auth.user.custId,
          customer: this.$auth.user._id,
          coupon: id
        }

        const result = await this.$store.dispatch('coupon/keepCoupon', payload)

        if (result.status) {
          await this.$store.dispatch('coupon/myCoupon', this.$auth.user.custId)
        }
      } else {
        await this.$router.push('/auth/sign-in?redirect=all-coupon')
      }

    },
    checkIsMyCoupon(id, indexClass) {
      const index = this.myCoupons.findIndex(item => item.coupon?._id === id)
      if (index !== -1) {
        return true
      } else {
        return false
      }
    },
    getUsePoint(point) {
      this.usePoint = point;
    },
    saveCart() {
      this.$store.commit("cart/SAVE_CART");
    },
    findBundle(id) {
      let bundle = null;
      this.bundleDeal.map((item) => {
        const index = item.subBundle.indexOf(id);
        if (index !== -1) {
          bundle = item;
        }
      });
      return bundle;
    },
    checkBundle(id) {
      const index = this.findBundle(id);
      return index !== null;
    },
    getNameBundle(id) {
      const bundle = this.findBundle(id);
      if (bundle) {
        return bundle.bundleName;
      }
      return "";
    },
    chooseBundle(id) {
      const bundle = this.findBundle(id);
      if (bundle) {
        window.location.href = "/bundle?b=" + bundle._id;
      }
    },
    async goCheckout() {
      await this.$store.dispatch("cart/recheckPrice", this.cart);
      const payload = `${this.coupon !== null ? this.coupon?._id : null}&ASB${this.usePoint}`;
      const encodeQuery = Buffer.from(payload, "binary").toString("base64");
      if (this.isLoggedIn) {
        window.location.href = `/checkout?value=${encodeQuery}`;
      } else {
        let element = this.$refs.modal.$el;
        $(element).modal("show");
      }
    },
    deleteItem(index) {
      this.$store.commit("cart/DELETE_ITEM", index);
    },
    selectAll() {
      this.isSelectAll = !this.isSelectAll;
      this.$store.commit("cart/SELECT_ALL_ITEM", this.isSelectAll);
    },
    undoSelect(index) {
      this.$store.commit("cart/UNDO_SELECT", index);
    },
    manageAmount(index, type) {
      const data = {
        index,
        type,
      };
      this.$store.commit("cart/MANAGE_AMOUNT", data);
    },
    removeCoupon() {
      this.coupon = null;
      this.$store.commit("cart/REMOVE_COUPON");
    },
    selectCoupon(coupon) {
      this.coupon = coupon;
      if (coupon.type === "cashback") {
        this.$store.commit("cart/SET_COUPON_CASH_BACK", coupon);
        if (this.cart.point === 0) {
          this.showCouponModal();
        }
      } else {
        this.$store.commit("cart/SET_COUPON_DISCOUNT", coupon);
        if (this.cart.couponDiscount === 0) {
          this.showCouponModal();
        }
      }
    },
    showCouponModal() {
      this.couponMessage = "ไม่พบสินค้าที่สามารถใช้คูปองได้";
      $("#failModal").appendTo("body").modal("show");
      setInterval(() => {
        $("#failModal").modal("hide");
      }, 1500);

      this.coupon = null;
    },
  },
  computed: {
    couponList() {
      return this.$store.state.coupon.couponList
    },
    brand() {
      return this.$store.state.brand.brand;
    },
    myCoupons() {
      return this.$store.state.coupon.myCoupons;
    },
    cart() {
      return this.$store.state.cart.cart;
    },
    bundleDeal() {
      return this.$store.state.bundle?.bundles;
    },
  },
  destroyed() {
    this.saveCart();
  },
  beforeUpdate() {
    const selectItem = this.cart.items.filter(item => item.isCheck).length
    this.disableCart = selectItem <= 0;
    this.$store.commit("cart/UPDATE_PRICE");

    this.totalDiscount =
      this.cart.totalDiscount +
      this.cart.couponDiscount +
      this.cart.totalBundle;
  },
};
</script>

<style scoped>
.setting-content{min-height:800px}
.dropdown-menu.coupon .scroll-inner{max-height:250px}
.empty-discount {
  margin-top: 8px;
}

.btn.keep-coupon:before {
  top: 4px;
  right: 4px;
}

.btn.keep-coupon:after {
  top: 4px;
  right: 4px;
}

.card-order.cart .card-photo:before,
.card-order.cart .cols:before {
  color: black;
}

.card-order {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 0px solid rgba(0, 0, 0, 0.1);
}

.cart-bin-custom {
  margin-top: -4px;
}

.cart-name-custom {
  min-width: 270px;
}

.cart-price-custom {
  max-width: 50px;
}

.order-summary .inner {
  padding: 20px 40px;
}

.card-coupon .btn.keep{
  min-width:65px;
  width:auto;
  font-size:14px;
}

.card-coupon.codeisout .btn.keep > span:nth-child(2){
  display:none;
}

@media (max-width:991.98px) {
  .cart-name-custom {
    min-width: unset;
  }

  .cart-bin-custom {
    margin-top: -4px;
  }

  .cart-price-custom {
    max-width: unset;
  }

  .cart-name-custom {
    min-width: 180px;
  }

  .card-coupon .btn.keep{
    font-size:13px;
    min-width:55px;
  }
}

@media (max-width:767px) {
  .cart-bin-custom {
    margin-top: 0;
  }

}


/* Joey Custom Css for Coupon */

@media (max-width: 767px) {
  .section-blog .container-inner {
    padding: 0px;
  }
}
@media (max-width: 576px) {
  .setting-content{min-height:0}
  .dropdown-menu.coupon .scroll-inner{max-height:220px}
}

</style>
