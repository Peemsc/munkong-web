<template>
  <div :id="'couponModal' + couponId" class="modal modal-alert fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <div class="row all-coupon">
              <template v-for="(coupon, index) in coupons">

                <div class="col-xl-12 col-lg-12 " :key="index" v-if="coupon.type === 'discount'">
                  <div class="card-coupon position-relative" :key="index"
                    :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                    <div class="card-percent">
                      <span class="m-auto"><span v-if="coupon.discountType === 'baht'">฿</span>{{
                        coupon.discountValue
                      }}
                        <span v-if="coupon.discountType === 'percent'">%</span>
                      </span>
                    </div>
                    <div class="card-body d-lg-flex pr-0">
                      <div class="d-block">
                        <p class="title mobile-p-content">{{ coupon.name }}</p>
                        <h3 class="mobile-h3-content">
                          <span v-if="coupon.discountType === 'baht'">฿</span>{{ coupon.discountValue }}<span
                            v-if="coupon.discountType === 'percent'">%</span>
                        </h3>
                        <p class="fs-10 text-black mobile-line-height" v-if="coupon.discountType === 'baht'">
                          <!-- {{ $t('min') }} {{ coupon.basePrice }}.- -->
                          <span v-if="coupon.maxDiscount > 0">- {{ $t('maxBaht') }} {{ coupon.maxDiscount }}.-,</span>
                          <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                          <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>

                        </p>
                        <p class="fs-10 text-black mobile-line-height" v-if="coupon.discountType === 'percent'">
                          <span v-if="coupon.maxDiscount > 0">- {{ $t('max') }} {{ coupon.maxDiscount }}.-,</span>
                          <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                          <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                        </p>

                        <h6 class="fs-10 text-red mobile-pt-content">
                          <img src="@/assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
                            coupon.startDate | thaiDate }} - {{ coupon.endDate | thaiDate }}
                        </h6>
                      </div>
                      <div class="d-flex algin-items-cneter">
                        <button @click="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                          <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                          <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                          <span v-else>{{ $t('alreadyCoupon') }}</span>
                        </button>
                      </div>
                    </div>
                  </div><!--card-coupon-->
                </div><!--col-xl-4-->

                <div class="col-xl-12 col-lg-12 " :key="index" v-if="coupon.type === 'cashback'">
                  <div class="card-coupon position-relative" :key="index"
                    :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                    <div class="card-percent">
                      <span class="m-auto">{{ coupon.cashBackValue }}%</span>
                    </div>
                    <div class="card-body d-lg-flex pr-0">
                      <div class="d-block">
                        <p class="title mobile-p-content">{{ coupon.name }}</p>
                        <h3 class="fs-20 mobile-h3-content">
                          <span v-if="coupon.cashBackType === 'baht'">฿</span>{{ coupon.cashBackValue }}<span
                            v-if="coupon.cashBackType === 'percent'">%</span>
                        </h3>
                        <p class="fs-14 text-black mb-2 mobile-line-height" v-if="coupon.cashBackType === 'baht'">
                          <span v-if="coupon.maxDiscount > 0">- {{ $t('maxBaht') }} {{ coupon.maxDiscount }}.-,</span>
                          <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                          <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                        </p>
                        <p class="fs-14 text-black mobile-line-height" v-if="coupon.cashBackType === 'percent'">
                          {{ $t('max') }} {{ coupon.maxCashBack }}.-, {{ $t('min') }} {{ coupon.basePrice }}.-
                        </p>
                        <p class="f-12 text-red mobile-pt-content">
                          <img src="@/assets/img/icons/clock.svg" width="16px" class="p-0 " alt="" /> {{
                            coupon.startDate | thaiDate }} - {{ coupon.endDate | thaiDate }}
                        </p>
                      </div>
                      <button @click="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                        <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                        <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                        <span v-else>{{ $t('alreadyCoupon') }}</span>
                      </button>
                    </div>
                  </div><!--card-coupon-->
                </div><!--col-xl-4-->

                <div class="col-xl-12 col-lg-12" :key="index" v-if="coupon.type === 'freeShipping'">
                  <div class="card-coupon position-relative" :key="index"
                    :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                    <div class="card-percent yellow">
                      <span class="m-auto">ส่งฟรี</span>
                    </div>
                    <div class="card-body d-md-flex pr-0">
                      <div class="d-flex flex-column">
                        <p class="title mobile-p-content">{{ coupon.name }}</p>
                        <h3 class="mobile-h3-content">฿{{ coupon.basePrice }} {{ $t('deliveryPrice') }}</h3>
                        <p class="fs-10 mobile-line-height">{{ $t('whenBuying') }} {{ coupon.brands.map(brand =>
                          brand.brandName).toString() }} {{ $t('min') }} {{ coupon.basePrice }}.-</p>
                        <h6 class="fs-10 text-red mobile-pt-content">
                          <img src="@/assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
                            coupon.startDate | thaiDate }} - {{ coupon.endDate | thaiDate }}
                        </h6>
                      </div>
                      <button @click="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                        <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                        <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                        <span v-else>{{ $t('alreadyCoupon') }}</span>
                      </button>
                    </div>
                  </div><!--card-coupon-->
                </div><!--col-xl-4-->
              </template>
            </div><!--row-->
          </div>
          <div class="modal-body">
            <div>
              <div class="text-center text-black fs-18 font-weight-bold">
                รายละเอียดคูปอง
              </div>
              <div class="text-start text-black mb-3">
                <h6>
                  รหัสส่วนลด
                </h6>
                <h4 class="text-red">
                  {{ details.code }}
                </h4>
              </div>
              <div class="text-start text-black mb-3">
                <h6>
                  ระยะเวลาที่ใช้ได้
                </h6>
                <p class="text-grey fs-16 m-0 p-0">
                  {{ details.startDate | thaiDate }} - {{ details.endDate | thaiDate }}
                </p>
              </div>
              <div class="text-start text-black mb-3">
                <h6>
                  โค้ด
                </h6>
                <p class="text-grey fs-16 m-0 p-0">
                  {{ details.name }}
                </p>
              </div>
              <div class="text-start text-black mb-3" v-if="details.products && details.products.length > 0">
                <h6>
                  สินค้าที่ร่วมรายการ
                </h6>
                <div class="p-0 m-0" v-for="(data, index) in details.products" :key="index">
                  <p class="text-grey fs-16 m-0 p-0">{{ data.itemDescription }}</p>
                </div>
              </div>
              <div class="text-start text-black mb-3">
                <h6>
                  รายละเอียดเพิ่มเติม
                </h6>
                <p class="text-grey fs-16 m-0 p-0" v-if="details.products && details.products.length > 0">
                  - เฉพาะสินค้าที่เข้าร่วมรายการเท่านั้น
                </p>
                <p class="text-grey fs-16 m-0 p-0" v-if="details.type === 'discount' || details.type === 'cashback'">
                  <span v-if="details.maxDiscount > 0">- ลดสูงสุด {{ details.maxDiscount }}.-,</span>
                  <span v-if="details.basePrice > 0">ชำระขั้นต่ำ {{ details.basePrice }}.-</span>
                  <span v-if="details.maxDiscount <= 0 && details.basePrice <= 0"> ไม่มีขั้นต่ำ </span>
                </p>
                <p class="text-grey fs-16 m-0 p-0" v-if="details.type === 'freeShipping' && details.brands.length > 0">
                  - เมื่อซื้อสินค้า {{ details.brands.map(brand => brand.brandName).toString() }} ขั้นต่ำ {{
                    details.basePrice }}.-
                </p>
                <p class="text-grey fs-16 m-0 p-0" v-if="details.type === 'freeShipping' && details.brands.length === 0">
                  - เมื่อซื้อสินค้า ขั้นต่ำ {{ details.basePrice }}.-
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-black effect" @click="closeModal">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // value: Boolean,
    couponId: { type: String },
    dataCoupon: { type: Object },
  },
  data() {
    return {
      isLoggedIn: false,
      coupons: this.dataCoupon,
      details: this.dataCoupon,
      custId: this.$auth.user?.custId
    };
  },
  async fetch() {
    if (this.isLoggedIn) {
      await this.$store.dispatch("coupon/myCoupon", this.$auth.user.custId);
    }
    await this.$store.dispatch("coupon/fetchCoupon");
  },
  created() {
    this.isLoggedIn = this.$auth.loggedIn;
  },
  methods: {
    closeModal() {
      $('#couponModal'+ this.couponId ).appendTo('body').modal('hide');
    },
    async keepCoupon(id) {
      if (this.isLoggedIn) {
        const payload = {
          custId: this.$auth.user.custId,
          customer: this.$auth.user._id,
          coupon: id
        };
        const result = await this.$store.dispatch("coupon/keepCoupon", payload);
        if (result.status) {
          await this.$store.dispatch("coupon/myCoupon", this.$auth.user.custId);
        }
      }
      else {
        this.closeModal()
        await this.$router.push("/auth/sign-in?redirect=all-coupon");
      }
    },
    checkIsMyCoupon(id, indexClass) {
      const index = this.myCoupons.findIndex(item => item.coupon._id === id);
      if (index !== -1) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  computed: {
    myCoupons() {
      return this.$store.state.coupon.myCoupons;
    },
  }
};
</script>
<style scoped>
.modal.show .modal-dialog {
  justify-content: center;
}
.modal-footer>* {
  margin: 0 !important;
}
.modal-content {
  padding: 0 15px;
}

.all-coupon.row>div {
  padding: 0;
}

.modal-alert .modal-dialog{max-width:400px}
.modal-footer .btn.btn-black {
  width: 100%;
  height: 50px;
  color: #fff;
  font-size: 20px;
   border-radius: 15px;
}

 .modal-container{width:100%}

.modal-header {
  display: block;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0rem 1rem;
  border-bottom: 2px solid #dee2e6;
  padding-top: 1rem;
}

.modal-footer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0rem;
  border-top: 2px solid #dee2e6;

}

.all-coupon .card-coupon {
  margin: 0 0 20px;
}

.modal .card-coupon .card-percent{
    width:100px;
    height:100px;
}
.modal .card-coupon .card-body{height:100px; padding-top:5px; padding-bottom:5px}

.modal-alert  .card-coupon h4{margin-top:-3px}

@media (max-width: 767px) {
  .modal .card-coupon .card-percent{
    width:100px;
    height:100px;
  }
 }
@media (max-width: 576px) {

  .modal.show .modal-dialog {
    justify-content: center;
    margin:0 auto;
    padding:0 15px
  }

  .card-coupon {
    /* margin: 0 13px 15px; */
  }

  .codeisout-line-height {
    line-height: 1.5rem;
  }

}</style>
