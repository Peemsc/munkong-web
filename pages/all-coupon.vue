<template>
  <div class="page" style="background-color: #f5f5f5;">
    <div class="section-blog">
      <div class="container">
        <div class="container-inner ">
          <div class="blog-content position-relative">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">{{ $t('home') }}</a></li>
                <li class="active"><a href="#">{{ $t('allCoupon') }}</a></li>
              </ul>

              <!-- <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div> -->

              <div class="icons-group d-flex ml-auto">
                <div class="dropdown share">
                  <button
                    class="btn btn-share"
                    data-toggle="dropdown"
                    data-display="static"
                    type="button"
                  ></button>

                  <div class="dropdown-menu">
                    <div class="d-flex">
                      <p>{{ $t('share')}} :</p>
                      <div class="share-lists">
                        <a href="#" class="icons icon-facebook" @click="shareFacebook"></a>
                        <a href="#" class="icons icon-twitter" @click="shareTwitter"></a>
                        <a href="#" class="icons icon-line" @click="shareLine"></a>
                        <a href="#" class="icons icon-link" @click="copyToClipboard"></a>
                      </div>
                    </div>
                    <!-- <a href="#" class="icons icon-copy"></a> -->
                  </div>
                </div>
              </div>

            </div>

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>{{ $t('allCoupon') }}</h5>
            </div>

            <div class="blog-details px-0">

              <div class="details text-center wow fadeIn">
                <h2 class="text-center">{{ $t('allCoupon') }}</h2>
              </div>

              <div class="row all-coupon has-3column">
                <template v-for="(coupon, index) in coupons">

                  <div class="col-xxl-4 col-md-6"
                    :key="index" v-if="coupon.type === 'discount'">
                    <div class="card-coupon position-relative" :key="index"
                      :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                      <div class="card-percent">
                        <span class="m-auto"><span v-if="coupon.discountType === 'baht'">฿</span>{{
                          coupon.discountValue
                        }}<span class="m-auto" v-if="coupon.discountType === 'percent'">%</span>
                        </span>
                      </div>
                      <div class="card-body d-lg-flex pr-0" @click="showModal(coupon._id)">
                        <div class="d-flex flex-column">
                          <p class="title">{{ coupon.name }}</p>
                          <h3>
                            <span v-if="coupon.discountType === 'baht'">฿</span>{{ coupon.discountValue }}<span
                              v-if="coupon.discountType === 'percent'">%</span>
                          </h3>
                          <p class="fs-10 text-black mobile-line-height" v-if="coupon.discountType === 'baht'">
                            <span v-if="coupon.maxDiscount > 0">- {{ $t('maxBaht') }} {{ coupon.maxDiscount }}.-,</span>
                            <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                            <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                          </p>
                          <p class="fs-10 text-black mobile-line-height" v-if="coupon.discountType === 'percent'">
                            <span v-if="coupon.maxDiscount > 0">- {{ $t('max') }} {{ coupon.maxDiscount }}.-,</span>
                            <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                            <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                          </p>
                          <h6 class="fs-10 text-red">
                            <img src="../assets/img/icons/clock.svg" width="13px" class="p-0" style="margin-top: -1px;"
                              alt="" /> &nbsp;{{
                                coupon.startDate | thaiDate }} - {{ coupon.endDate |
    thaiDate }}
                          </h6>
                        </div>
                        <button @click.stop="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                          <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                          <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                          <span v-else>{{ $t('alreadyCoupon') }}</span>
                        </button>
                      </div>
                    </div><!--card-coupon-->
                  </div><!--col-xl-4-->

                  <div class="col-xxl-4 col-md-6"
                    :key="index" v-if="coupon.type === 'cashback'">
                    <div class="card-coupon position-relative" :key="index"
                      :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                      <div class="card-percent">
                        <span class="m-auto">{{ coupon.cashBackValue }}%</span>
                      </div>
                      <div class="card-body d-lg-flex pr-0" @click="showModal(coupon._id)">
                        <div class="d-flex flex-column">
                          <p class="title">{{ coupon.name }}</p>
                          <h3>
                            <span v-if="coupon.cashBackType === 'baht'">฿</span>{{ coupon.cashBackValue }}<span
                              v-if="coupon.cashBackType === 'percent'">%</span>
                          </h3>
                          <p class="fs-10 text-black mobile-line-height" v-if="coupon.cashBackType === 'baht'">
                            {{ $t('noMinSpend') }}
                            <span v-if="coupon.maxDiscount > 0">- {{ $t('maxBaht') }} {{ coupon.maxDiscount }}.-,</span>
                            <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                            <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                          </p>
                          <p class="fs-10 text-black mobile-line-height" v-if="coupon.cashBackType === 'percent'">
                            <span v-if="coupon.maxDiscount > 0">- {{ $t('max') }} {{ coupon.maxDiscount }}.-,</span>
                            <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                            <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                          </p>
                          <h6 class="fs-10 text-red">
                            <img src="../assets/img/icons/clock.svg" width="13px" class="p-0 " style="margin-top: -1px;"
                              alt="" /> &nbsp;{{
                                coupon.startDate | thaiDate }} - {{ coupon.endDate |
    thaiDate }}
                          </h6>
                        </div>
                        <button @click.stop="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                          <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                          <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                          <span v-else>{{ $t('alreadyCoupon') }}</span>
                        </button>
                      </div>
                    </div><!--card-coupon-->
                  </div><!--col-xl-4-->

                  <div class="col-xxl-4 col-md-6"
                    :key="index" v-if="coupon.type === 'freeShipping'">
                    <div class="card-coupon position-relative" :key="index"
                      :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                      <div class="card-percent yellow">
                        <span class="m-auto">ส่งฟรี</span>
                      </div>
                      <div class="card-body d-md-flex pr-0" @click="showModal(coupon._id)">
                        <div class="d-flex flex-column">
                          <p class="title">{{ coupon.name }}</p>
                          <h3 class="mobile-line-height">฿{{ coupon.basePrice }} {{ $t('deliveryPrice') }}</h3>
                          <p class="fs-10 mobile-line-height">{{ $t('whenBuying') }} {{ coupon.brands.map(brand =>
                            brand.brandName).toString() }} {{ $t('min') }} {{ coupon.basePrice }}.-</p>
                          <h6 class="f-10 text-red">
                            <img src="../assets/img/icons/clock.svg" width="13px" class="p-0" style="margin-top: -1px;"
                              alt="" /> &nbsp;{{
                                coupon.startDate | thaiDate }} - {{ coupon.endDate |
    thaiDate }}
                          </h6>
                        </div>
                        <button @click.stop="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                          <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                          <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                          <span v-else>{{ $t('alreadyCoupon') }}</span>
                        </button>
                      </div>
                    </div><!--card-coupon-->
                  </div><!--col-xl-4-->
                </template>
              </div><!--row-->

            </div><!--blog-details-->
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->
    <ModalCoupon ref="modalCoupon" :dataCoupon="modalCoupon" :couponId="couponId" />
  </div><!--page-->
</template>

<script>
import ModalCoupon from '../components/modal/ModalCoupon.vue'
import ModalSocialShareProduct from "../components/modal/ModalSocialShareProduct.vue";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content
        }
      ]
    }
  },
  components: { ModalCoupon, ModalSocialShareProduct,  },
  data() {
    return {
      meta: {
        title: '',
        hid: '',
        name: '',
        content: '',
      },
      isLoggedIn: false,
      isToggle: true,
      couponId: '',
      modalCoupon: {}
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
    shareFacebook() {
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(
            `${window.location.origin}/all-coupon?openExternalBrowser=1`
          )
      );
    },
    shareTwitter() {
      const url = `${window.location.origin}/all-coupon?openExternalBrowser=1`;

      // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
      );
    },
    // shareMessenger() {
    //   const id = this.product._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
    //   const url = `${window.location.origin}/product/detail?p=${id}&openExternalBrowser=1`;

    //   // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
    //   window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
    // },
    shareLine() {
      const url = `${window.location.origin}/all-coupon?openExternalBrowser=1`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const url = `${window.location.origin}/all-coupon`;

      // สร้างตัวแปรสำหรับ <textarea> element
      const textarea = document.createElement("textarea");
      textarea.value = url;

      // เพิ่ม <textarea> element ลงใน DOM
      document.body.appendChild(textarea);

      // เลือกและคัดลอก URL จาก <textarea>
      textarea.select();
      document.execCommand("copy");

      // ลบ <textarea> element ออกจาก DOM
      document.body.removeChild(textarea);

      alert("ลิงก์ถูกคัดลอกลงในคลิปบอร์ดแล้ว");
    },
    async showModal(couponId) {
      this.couponId = couponId;
      // show the modal
      if (this.couponId) {
        await this.$axios.get(`/api/customer/coupon/get/${this.couponId}`).then(response => {
          if (response.status === 200) {
            this.modalCoupon = response.data;
            this.$refs.modalCoupon.coupons = response.data;
            this.$refs.modalCoupon.details = response.data.data;
          }
        }).catch(error => {
          console.error(error);
        });
      }
      $('#couponModal' + this.couponId).appendTo('body').modal('show');
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
    coupons() {
      return this.$store.state.coupon.couponList;
    },
    myCoupons() {
      return this.$store.state.coupon.myCoupons;
    },
  },
  fetch() {
    this.meta.title = this.$i18n.locale === 'th' ? 'รวมคูปองส่วนลด' : 'All Coupon';
    this.meta.hid = this.$i18n.locale === 'th' ? 'รวมคูปองส่วนลด' : 'All Coupon';
    this.meta.name = this.$i18n.locale === 'th' ? 'รวมคูปองส่วนลด' : 'All Coupon';
    this.meta.content = this.$i18n.locale === 'th' ? 'รวมคูปองส่วนลด' : 'All Coupon';
  }

}
</script>

<style scoped>
.blog-content {
  padding: 30px 50px;
}

.border-right .border-left .card-coupon {
  width: 370px;
}

.card-coupon .btn.keep{
  min-width:65px;
  width:auto;
  font-size:15px;
}

.card-coupon.codeisout .btn.keep > span:nth-child(2){
  display:none;
}

@media (max-width: 1194px) {
  .container,
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }

  .section-blog .container-inner {
    padding: 0;
  }

  .container,
  .container-fluid {
    padding: 0;
  }

  .blog-content {
    padding: 20px 25px;
  }

}

@media (max-width: 1024px) {

  .blog-content {
    padding: 20px 22px;
  }

  .card-coupon .btn.keep{
    font-size:13px;
    min-width:55px;
  }
}

@media (max-width: 768px) {
  .blog-content {
    padding: 20px 30px;
  }
}

@media (max-width: 576px) {
  .blog-content {
    padding: 30px 18px;
  }

  .border-left {
    border: none !important;
  }

  .border-right {
    border: none !important;
  }



}

@media (max-width: 390px) {
  .blog-content {
    padding: 30px 18px;
  }

  .border-left {
    border: none !important;
  }

  .border-right {
    border: none !important;
  }
}</style>
