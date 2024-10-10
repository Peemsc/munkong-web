<template>
  <div id="selectCouponModal" class="modal modal-alert couponSelect modal-560 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title py-3">{{ $t('chooseCoupon') }}</h4>
        <hr class="m-0">

        <div class="d-block p-4">
          <div class="form-group has-button m-0">
            <input type="text" class="form-control kanit" :placeholder="$t('searchCoupon')" name="" v-model="searchCoupon">
          </div><!--form-group-->
        </div>

        <template v-for="(item, index) in myCoupons.filter(item => this.totalPrice > item.coupon.basePrice)" v-if="item.coupon.status">
          <hr class="m-0" :key="index">
          <div class="d-block p-4" v-if="item.coupon.type === 'discount'">
            <div class="card-coupon md m-0 ">
              <div v-if="item.coupon.discountType === 'percent'" class="card-percent w-90"><span class="m-auto">{{ item.coupon.discountValue }}%</span></div>
              <div v-if="item.coupon.discountType === 'baht'" class="card-percent w-90"><span class="m-auto">฿{{ item.coupon.discountValue }}</span></div>
              <div class="card-body">
                <div>
                  <p class="f-22">{{ item.coupon.name }}</p>
                    <span v-if="item.coupon.discountType === 'baht'">฿</span>{{ item.coupon.discountValue }}<span v-if="item.coupon.discountType === 'percent'">%</span>
                  <p class="f-14 black-50">
                    {{ $t('canUseDate') }} {{ item.coupon.startDate | luxon('date_short') }} - {{ item.coupon.endDate | luxon('date_short') }}
                  </p>
                </div>
                <div class="card-checker">
                  <div class="radio-group m-auto no-text">
                    <input :id="'coupon'+index" type="radio" name="coupon" :value="item.coupon._id" v-model="selectId">
                    <label :for="'coupon'+index"></label>
                  </div>
                </div>
              </div><!--card-body-->
            </div><!--card-coupon-->
          </div>
          <div class="d-block p-4" v-if="item.coupon.type === 'cashback'">
            <div class="card-coupon md m-0 ">
              <div v-if="item.coupon.cashBackType === 'percent'" class="card-percent w-90 yellow"><span class="m-auto">{{ item.coupon.cashBackValue }}%</span></div>
              <div v-if="item.coupon.cashBackType === 'baht'" class="card-percent w-90 yellow"><span class="m-auto">฿{{ item.coupon.cashBackValue }}</span></div>
              <div class="card-body">
                <div>
                  <p class="f-22">{{ item.coupon.name }}</p>
                  <span v-if="item.coupon.cashBackType === 'baht'">฿</span>{{ item.coupon.cashBackValue }}<span v-if="item.coupon.cashBackType === 'percent'">%</span>
                  <p class="f-14 black-50">
                    {{ $t('canUseDate') }} {{ item.coupon.startDate | luxon('date_short') }} - {{ item.coupon.endDate | luxon('date_short') }}
                  </p>
                </div>
                <div class="card-checker">
                  <div class="radio-group m-auto no-text">
                    <input :id="'coupon'+index" type="radio" name="coupon" :value="item.coupon._id" v-model="selectId">
                    <label :for="'coupon'+index"></label>
                  </div>
                </div>
              </div><!--card-body-->
            </div><!--card-coupon-->
          </div>
        </template>

        <hr class="m-0">

        <div class="d-flex p-4">
          <button class="btn btn-black effect w-150 m-auto" data-dismiss="modal" @click="selectCoupon">
            <span>{{ $t('submit') }}</span>
          </button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    totalPrice: { type: Number, default: 0 }
  },
  data () {
    return {
      selectId: '',
      searchCoupon: ''
    }
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('coupon/myCoupon', this.$auth.user.custId)
    }
  },
  methods: {
    selectCoupon() {
      try {
        if (this.myCoupons.length > 0) {
          const coupon = this.myCoupons.find(item => item.coupon._id === this.selectId)
          if (coupon) {
            this.$emit('coupon', coupon.coupon)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    myCoupons () {
      return this.$store.getters['coupon/searchCoupon'](this.searchCoupon)
    }
  }
}
</script>

<style scoped>

</style>
