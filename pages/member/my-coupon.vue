<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('myCoupon') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup">
      <ul class="nav nav-button coupon mt-0">
        <li class="pt-0 pb-0" :class="{'active': status === false}"><a class="outline w-150" @click="status = false">{{ $t('unusedCoupon') }}</a></li>
        <li class="pt-0 pb-0" :class="{'active': status === true}"><a class="outline w-150" @click="status = true">{{ $t('usedCoupon') }}</a></li>
      </ul>
    </div><!--bgroup-->

    <div class="bgroup pt-0 pb-0"><hr class="m-0"></div>

    <div class="bgroup">
      <div class="form-group search mb-0">
        <label class="icon"><img class="svg-js black" src="/img/icons/icon-search.svg" alt=""></label>
        <input type="text" class="form-control" :placeholder="$t('searchCoupon')" name="" v-model="searchCoupon">
      </div>
    </div>

    <hr class="lg">

    <div class="bgroup pt-md-0 pb-md-0">
      <div class="row">
        <template v-for="(item, index) in myCoupons">
          <div class="col-md-6 pt-md-4 mt-2" :key="index" v-if="item.coupon.type === 'discount' && item.coupon.status == true">
            <div class="card-coupon">
              <div v-if="item.coupon.discountType === 'percent'" class="card-percent w-90"><span class="m-auto">{{ item.coupon.discountValue }}%</span></div>
              <div v-if="item.coupon.discountType === 'baht'" class="card-percent w-90"><span class="m-auto">฿{{ item.coupon.discountValue }}</span></div>
              <div class="card-body">
                <p class="f-22">{{ $t('couponDiscount') }}</p>
                <h3>
                  <span v-if="item.coupon.discountType === 'baht'">฿</span>{{ item.coupon.discountValue }}<span v-if="item.coupon.discountType === 'percent'">%</span>
                </h3>
                <p class="f-14 black-50">
                  {{ $t('canUseDate') }} {{ item.coupon.startDate | luxon('date_short') }} - {{ item.coupon.endDate | luxon('date_short') }}
                </p>
              </div>
            </div><!--card-coupon-->
          </div><!--col-md-6-->
          <div class="col-md-6 pt-md-4 mt-2" :key="index" v-if="item.coupon.type === 'cashback'">
            <div class="card-coupon">
              <div v-if="item.coupon.cashBackType === 'percent'" class="card-percent w-90 yellow"><span class="m-auto">{{ item.coupon.cashBackValue }}%</span></div>
              <div v-if="item.coupon.cashBackType === 'baht'" class="card-percent w-90 yellow"><span class="m-auto">฿{{ item.coupon.cashBackValue }}</span></div>
              <div class="card-body">
                <p class="f-22">{{ $t('couponCashBack') }}</p>
                <h3>
                  <span v-if="item.coupon.cashBackType === 'baht'">฿</span>{{ item.coupon.cashBackValue }}<span v-if="item.coupon.cashBackType === 'percent'">%</span>
                </h3>
                <p class="f-14 black-50">
                  {{ $t('canUseDate') }} {{ item.coupon.startDate | luxon('date_short') }} - {{ item.coupon.endDate | luxon('date_short') }}
                </p>
              </div>
            </div><!--card-coupon-->
          </div><!--col-md-6-->
          <div class="col-md-6 pt-md-4 mt-2" :key="index" v-if="item.coupon.type === 'freeShipping'">
            <div class="card-coupon">
              <div class="card-percent w-90 yellow"><span class="m-auto">ฟรี</span></div>
              <div class="card-body">
                <p class="f-22">{{ $t('couponFreeShipping') }}</p>
                <h5>{{ $t('baseOrderPrice') }} {{ item.coupon.basePrice }} {{ $t('baht') }}</h5>
                <p class="f-14 black-50">
                  {{ $t('canUseDate') }} {{ item.coupon.startDate | luxon('date_short') }} - {{ item.coupon.endDate | luxon('date_short') }}
                </p>
              </div>
            </div><!--card-coupon-->
          </div><!--col-md-6-->
        </template>
      </div><!--row-->
    </div><!--bgroup-->

    <hr class="lg">

  </div><!--setting-content-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: 'member',
  data () {
    return {
      status: false,
      searchCoupon: ''
    }
  },
  async fetch () {
    await this.$store.dispatch('coupon/myCoupon', this.$auth.user.custId)
  },
  computed: {
    myCoupons () {
      return this.$store.getters['coupon/searchCoupon'](this.searchCoupon, this.status)
    }
  }
}
</script>

<style scoped>

</style>
