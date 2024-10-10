<template>
  <div class="page" v-if="brand">
    <div class="section-product section-product-custom">
      <div class="container-fluid">
        <div>
          <!--==================[End] Sidebar====================-->

          <div class="content-filter"
            style="width: 100% !important; padding-left: 0px !important; padding-right: 0px !important;">
            <div class="hgroup d-md-flex pb-0">
              <div>
                <p>
                  {{ brand.brandName }} ({{ $t("foundProduct") }}
                  {{ products.length }} {{ $t("list") }})
                </p>
                <h2>{{ brand.brandName }}</h2>
              </div>

              <!--div class="sort-wrap position-relative" @click="isActive = !isActive">
                <h5>{{ $t("sortBy") }}</h5>
                <select class="custom-select" v-model="sortPrice" @blur="isActive = false">
                  <option value="popular">{{ $t("sortPopular") }}</option>
                  <option value="min-max">
                    {{ $t("price") }} : {{ $t("minMax") }}
                  </option>
                  <option value="max-min">
                    {{ $t("price") }} : {{ $t("maxMin") }}
                  </option>
                  <option value="Aesc">{{ $t("sortAZ") }}</option>
                  <option value="Adesc">{{ $t("sortZA") }}</option>
                </select>
                <img src="../assets/img/icons/arrow-select.svg" alt="" :class="{ 'arrow-icon-active': isActive }"
                  class="arrow-icon" />
              </div-->
            </div>

            <!--            <h3 class="filter-toggle d-flex d-lg-none"><span class="icons icon-filter"></span>Filter</h3>-->

            <div class="content">
              <!-- <div class="filter-row pt-0"><hr></div> -->

              <!--              <div class="filter-row pt-0">-->
              <!--                <div class="filter-label">-->
              <!--                  <div class="label-group">-->
              <!--                    <div class="label">Brands : Audio-Technica <span class="del"></span></div>-->
              <!--                  </div>-->

              <!--                  <div class="label clear">Clear Filter <span class="del"></span></div>-->
              <!--                </div>-->
              <!--              </div>-->

              <div class="filter-row mb-md-4">
                <swiper class="swiper-container swiper-single banner-brand" :options="swiperOption">
                  <swiper-slide class="swiper-slide">
                    <!--a class="background" style="background-image: url(/img/thumb/photo-1920x559--1.jpg);" href="/img/thumb/photo-1920x559--1.jpg" data-fancybox></a-->
                    <a :href="brand.banner" data-fancybox><img class="w-100" :src="brand.banner" alt="" /></a>
                  </swiper-slide>
                  <div class="swiper-pagination single"></div>
                </swiper><!--swiper-banner-->
              </div>

              <div class="filter-row mb-md-4 ">
                <div class="coupon-label justify-content-center">
                  <!--                  <p class="title pr-2">{{ $t('couponBrand') }}</p>-->
                  <!-- <div class="d-flex flex-wrap">
                    <div
                      class="label"
                      v-for="(coupon, index) in brand.coupon"
                      :key="index"
                    >
                      <span v-if="coupon.type === 'freeShipping'">{{
                        $t("freeShipping")
                      }}</span>
                      <span v-if="coupon.type === 'cashback'"
                        >{{ $t("cashback") }}
                        <span v-if="coupon.cashBackType === 'baht'">฿</span
                        >{{ coupon.cashBackValue
                        }}<span v-if="coupon.cashBackType === 'percent'"
                          >%</span
                        ></span
                      >
                      <span v-if="coupon.type === 'discount'"
                        >{{ $t("shortDiscount") }}
                        <span v-if="coupon.discountType === 'baht'">฿</span
                        >{{ coupon.discountValue
                        }}<span v-if="coupon.discountType === 'percent'"
                          >%</span
                        ></span
                      >
                    </div>
                  </div> -->
                  <div class="dropdown mx-2">
                    <button class="btn keep-coupon xs" data-toggle="dropdown" data-display="static">
                      <span>{{ $t("couponBrand") }}</span>
                    </button>
                    <div class="dropdown-menu coupon">
                      <div class="hgroup">
                        <h4>{{ $t("couponBrand") }}</h4>
                        <p class="black-50">{{ $t("detailCoupon") }}</p>
                      </div>

                      <div class="scroll-inner">
                        <template v-for="(coupon, index) in brand.coupon">
                          <template v-if="coupon.type === 'freeShipping' && coupon.excludeBrands.indexOf(brand._id) !== 0">
                            <div class="card-coupon position-relative" :key="index"
                              :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                              <div class="card-percent yellow">
                                <span class="m-auto">ส่งฟรี</span>
                              </div>
                              <div class="card-body d-md-flex pr-0">
                                <div class="d-flex flex-column">
                                  <p class="f-14">{{ coupon.name }}</p>
                                  <h3 class="fs-20">฿{{ coupon.basePrice }} {{ $t('deliveryPrice') }}</h3>
                                  <p class="fs-12">เมื่่อซื้อสินค้า {{ coupon.brands.map(brand =>
                                    brand.brandName).toString() }} {{ $t('min') }} {{ coupon.basePrice }}.-</p>
                                  <p class="f-12 text-red">
                                    <img src="../assets/img/icons/clock.svg" width="16px" class="p-0 " alt="" /> {{
                                      coupon.startDate | thaiDate }} - {{ coupon.endDate |
    thaiDate }}
                                  </p>
                                </div>
                                <button @click="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                                  <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                                  <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                                  <span v-else>{{ $t('alreadyCoupon') }}</span>
                                </button>
                              </div>
                            </div><!--card-coupon-->
                          </template>

                          <template v-if="coupon.type === 'discount' && coupon.excludeBrands.indexOf(brand._id) !== 0">
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
                                  <p class="f-16">{{ coupon.name }}</p>
                                  <h3 class="fs-20">
                                    <span v-if="coupon.discountType === 'baht'">฿</span>{{ coupon.discountValue }}<span
                                      v-if="coupon.discountType === 'percent'">%</span>
                                  </h3>
                                  <p class="fs-14 text-black" v-if="coupon.discountType === 'baht'">
                                    <span v-if="coupon.maxDiscount > 0">- {{ $t('maxBaht') }} {{ coupon.maxDiscount }}.-,</span>
                                    <span v-if="coupon.basePrice > 0">{{ $t('min') }} {{ coupon.basePrice }}.-</span>
                                    <span v-if="coupon.maxDiscount <= 0 && coupon.basePrice <= 0">{{ $t('noMinSpend') }}</span>
                                  </p>
                                  <p class="fs-14 text-black" v-if="coupon.discountType === 'percent'">
                                    {{ $t('max') }} {{ coupon.maxDiscount }}.-, {{ $t('min') }} {{ coupon.basePrice }}.-
                                  </p>
                                  <p class="f-12 text-red">
                                    <img src="../assets/img/icons/clock.svg" width="16px" class="p-0 " alt="" /> {{
                                      coupon.startDate | thaiDate }} - {{ coupon.endDate |
    thaiDate }}
                                  </p>
                                </div>
                                <button @click="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                                  <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                                  <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
                                  <span v-else>{{ $t('alreadyCoupon') }}</span>
                                </button>
                              </div>
                            </div><!--card-coupon-->
                          </template>

                          <template v-if="coupon.type === 'cashback' && coupon.excludeBrands.indexOf(brand._id) !== 0">
                            <div class="card-coupon position-relative" :key="index"
                              :class="coupon.total >= coupon.amount || checkIsMyCoupon(coupon._id) ? 'codeisout' : ''">
                              <div class="card-percent">
                                <span class="m-auto">{{ coupon.cashBackValue }}%</span>
                              </div>
                              <div class="card-body d-lg-flex pr-0">
                                <div class="d-block">
                                  <p class="f-16">{{ coupon.name }}</p>
                                  <h3>
                                    <span v-if="coupon.cashBackType === 'baht'">฿</span>{{ coupon.cashBackValue }}<span
                                      v-if="coupon.cashBackType === 'percent'">%</span>
                                  </h3>
                                  <p class="f-12 text-red">
                                    <img src="../assets/img/icons/clock.svg" width="16px" class="p-0 " alt="" /> {{
                                      coupon.startDate | thaiDate }} - {{ coupon.endDate |
    thaiDate }}
                                  </p>
                                </div>
                                <button @click="keepCoupon(coupon._id)" class="btn btn-black effect keep">
                                  <span v-if="coupon.total >= coupon.amount">{{ $t('couponSold') }}</span>
                                  <span v-if="!checkIsMyCoupon(coupon._id)">{{ $t('keepCode') }}</span>
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
                  <!--dropdown-->
                </div>
                <!--d-flex-->
                <div class="sort-wrap pos-right">
                  <h5>{{ $t("sortBy") }}</h5>
                  <div class="dropdown select xs w-150">
                    <button class="btn" data-toggle="dropdown" type="button">
                      <li>
                        <span v-if="sort === 'popular'">{{
                          $t("sortPopular")
                        }}</span>
                        <span v-else-if="sort === 'minMax'"
                          >{{ $t("price") }} : {{ $t("minMax") }}</span
                        >
                        <span v-else-if="sort === 'maxMin'"
                          >{{ $t("price") }} : {{ $t("maxMin") }}</span
                        >
                        <span v-else-if="sort === 'sortAZ'">{{
                          $t("sortAZ")
                        }}</span>
                        <span v-else-if="sort === 'sortZA'">{{
                          $t("sortZA")
                        }}</span>
                        <span v-else-if="sort === 'sortCreatedAt'">{{
                          $t("sortCreateAt")
                        }}</span>
                      </li>
                    </button>
                    <ul class="dropdown-menu">
                      <li @click="sort = 'popular'">
                        <span>{{ $t("sortPopular") }}</span>
                      </li>
                      <li @click="sort = 'minMax'">
                        <span>{{ $t("price") }} : {{ $t("minMax") }}</span>
                      </li>
                      <li @click="sort = 'maxMin'">
                        <span>{{ $t("price") }} : {{ $t("maxMin") }}</span>
                      </li>
                      <li @click="sort = 'sortAZ'">
                        <span>{{ $t("sortAZ") }}</span>
                      </li>
                      <li @click="sort = 'sortZA'">
                        <span>{{ $t("sortZA") }}</span>
                      </li>
                      <li @click="sort = 'sortCreatedAt'">
                        <span>{{ $t("sortCreateAt") }}</span>
                      </li>
                    </ul>
                  </div>
                  <!--dropdown-->
                </div>
              </div>

              <div class="row product-list in-filter wow fadeIn">
                <template v-for="(product, indexProduct) in products">
                  <div :key="product._id" class="col-xl-2 col-md-4 col-6 pr-0 pl-0" v-if="product.status">
                    <ProductCard :product="product" :key="product._id" />
                  </div>
                </template>
              </div>
              <!--product-list-->

              <ul class="pagination justify-content-center pt-5" v-if="pagination.pageTotal > 0">
                <li :class="{ disabled: nowPage <= 1 }" class="first">
                  <a style="cursor: pointer; width: 90px" @click="nowPage = 1">
                    <img src="../assets/img/icons/first_page.svg" alt="" class="icon-pagination" />
                  </a>
                </li>

                <li :class="{ disabled: nowPage - 10 < 1 }" class="first">
                  <a style="cursor: pointer" @click="nowPage -= 10">
                    <span class="arrow">
                      <span class="arrow-left"></span>
                      <span class="arrow-left" style="margin-left: 5px"></span>
                    </span>
                  </a>
                </li>

                <li :class="{ disabled: nowPage <= 1 }" class="first">
                  <a style="cursor: pointer" @click="nowPage -= 1">
                    <span class="arrow"><span class="arrow-left"></span><span class="arrow-left"></span></span>
                  </a>
                </li>

                <template v-for="page in displayPages">
                  <li :class="{ active: parseInt(nowPage) === parseInt(page) }" :key="page">
                    <a style="cursor: pointer" @click="nowPage = page">{{
                      page
                    }}</a>
                  </li>
                </template>

                <li :class="{
                  disabled: parseInt(nowPage) === pagination.pageTotal,
                }" class="first">
                  <a style="cursor: pointer" @click="nowPage += 1">
                    <span class="arrow"><span class="arrow-right"></span></span>
                  </a>
                </li>

                <li :class="{ disabled: nowPage + 10 > pagination.pageTotal }" class="first">
                  <a style="cursor: pointer" @click="nowPage += 10">
                    <span class="arrow">
                      <span class="arrow-right" style="margin-left: -5px"></span>
                      <span class="arrow-right"></span>
                    </span>
                  </a>
                </li>

                <li :class="{
                  disabled: parseInt(nowPage) === pagination.pageTotal,
                }" class="first">
                  <a style="cursor: pointer; width: 80px" @click="nowPage = pagination.pageTotal">
                    <img src="../assets/img/icons/last_page.svg" alt="" class="icon-pagination" />
                  </a>
                </li>
              </ul>
            </div>
            <!--content-->
          </div>
          <!--content-filter-->
        </div>
        <!--container-inner-->
      </div>
      <!--container-fluid-->
    </div>
    <!--section-setting-->
  </div>
  <!--page-->
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ProductCard from "@/components/product-card/ProductCard";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  name: "select-brands",
  components: { ProductCard, Swiper, SwiperSlide },
  data() {
    return {
      isActive: false,
      isLoggedIn: false,
      sortPrice: "min-max",
      nowPage: 1,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 700,
        loop: true,
        effect: "slide",
        observer: true,
        observeParents: true,
        watchOverflow: true,
        autoplay: {
          delay: 5500,
          disableOnInteraction: false,
        },
      },
      sort: "popular",
    };
  },
  watch: {
    nowPage(newVal) {
      this.nowPage = newVal;
      this.onLoadProduct();
    },
    sort(newVal) {
      this.sort = newVal;
      this.onLoadProduct();
    },
  },
  async fetch() {
    const view = {
      brand: this.$route.query.b,
      customer: this.isLoggedIn ? this.$auth.user._id : null,
    };
    await this.$store.dispatch("count-view/createView", view);

    const page = this.$route.query.page ? this.$route.query.page : 1;
    const payload = {
      brandId: this.$route.query.b,
      page: page,
      sort: this.sort
    };
    await this.$store.dispatch("brand/getBrand", this.$route.query.b);
    await this.$store.dispatch("brand/getProduct", payload);
    await this.$store.dispatch("flash-sale/fetchFlashSale");
    await this.$store.dispatch("setting/getSetting", "home");
    if (this.isLoggedIn) {
      await this.$store.dispatch("coupon/myCoupon", this.$auth.user.custId);
    }
  },
  created() {
    this.isLoggedIn = this.$auth.loggedIn;
    // $("body").addClass("scrolling");
  },
  methods: {
    async onLoadProduct() {
      const payload = {
        brandId: this.$route.query.b,
        page: this.nowPage,
        sort: this.sort
      };
      await this.$store.dispatch("brand/getProduct", payload);
      window.scrollTo(0,0);
    },
    async keepCoupon(id) {
      const coupon = this.brand.coupon.find((item) => item._id === id);
      const payload = {
        custId: this.$auth.user.custId,
        customer: this.$auth.user._id,
        coupon: coupon._id,
      };
      const result = await this.$store.dispatch("coupon/keepCoupon", payload);
      if (result.status) {
        await this.$store.dispatch("coupon/myCoupon", this.$auth.user.custId);
      }
    },
    checkIsMyCoupon(id, indexClass) {
      const index = this.myCoupons.findIndex((item) => item.coupon._id === id);
      return index !== -1;
    },
    activePagination() {
      this.nowPage = this.$route.query.page ? this.$route.query.page : 1;
    }
  },
  computed: {
    displayPages() {
      const totalPages = this.pagination.pageTotal;
      let currentPage = this.nowPage;

      if (totalPages < 5)
        return [...Array(totalPages).keys()].map((i) => i + 1);

      if ([1, 2].includes(currentPage)) currentPage = 3;
      else if ([totalPages - 1, totalPages].includes(currentPage))
        currentPage = totalPages - Math.trunc(5 / 2);

      return [...Array(5).keys()].map(
        (i) => i - Math.trunc(5 / 2) + currentPage
      );
    },
    setting() {
      return this.$store.state.setting.setting
    },
    brand() {
      return this.$store.state.brand.brand;
    },
    pagination() {
      return this.$store.state.brand.pagination;
    },
    products() {
      return  this.$store.state.brand.product
    },
    myCoupons() {
      return this.$store.state.coupon.myCoupons;
    },
  },
};
</script>

<style scoped>
.dropdown {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
.card-coupon .btn.keep {
  margin-top: -15px;
  margin-right: 5px;
  min-width: 80px;
  width:auto;
  top: 50%;
  font-size:15px;
  height: 32px;
  line-height:30px;
}
.card-coupon .btn.keep > span:nth-child(2){display:none}
.card-coupon .card-percent{
  min-height: 110px;
  height:auto
}
.card-coupon .card-body{
  min-height: 110px;
  height:auto
}
.section-product {
  background: #f5f5f5f5;
}

.dropdown-menu.coupon p.f-16{
  line-height:1.1;
  margin-bottom:5px;
}


.coupon-label {
  justify-content: center;
}

.btn.keep-coupon {
  width: 500px;
  font-size: 24px;
  font-weight: 500;
  height: 60px;
}

.btn.keep-coupon:before {
  content: '';
  position: absolute;
  top: 10px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-color: #FFFF00;
  border-radius: 50%;
}

.btn.keep-coupon:after {
  content: '';
  position: absolute;
  top: 10px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-size: 20px;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(../assets/img/icons/icon-arrow-right.svg);
  transform: rotate(90deg);
}

.btn.keep-coupon[aria-expanded="true"]:after {
  content: '';
  position: absolute;
  top: 10px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-size: 20px;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(../assets/img/icons/icon-arrow-right.svg);
  transform: rotate(270deg);
}

.dropdown-menu.coupon {
  width: 100%;
  left: 0;
}

.btn.keep-coupon {
  padding-right: 200px !important
}

.section-product-custom {
  padding-bottom: 65px;
}

@media (max-width: 1133px) and (min-width: 768px) {

  .section-product-custom {
    padding-bottom: 20px;
  }

  .product-list.in-filter {
    margin-left: -5px;
    margin-right: -10px;
  }

  .product-list .col-xl-2 {
    padding-bottom: 2px;
  }
}

@media (min-width: 768px) and (max-width: 1133px) {

  .arrow-icon {
    position: absolute;
    right: 10px;
    top: 65px;
  }
}

@media (max-width: 767px) {
  .page {
    padding-top: 50px;
  }

  .section-product-custom {
    padding-bottom: 20px;
  }

  .card-coupon .card-percent{
    min-height: 100px;
  }
  .card-coupon .card-body{
    min-height: 100px;
  }
}

@media (max-width: 576px) {
  .dropdown-menu.coupon .scroll-inner {
    padding: 2px 16px;
  }

  /*.card-coupon {
    width: 330px;
    height: auto;
  }

  */

  .card-coupon .btn.keep {
    height: 30px;
    line-height: 29px;
    margin-top:-13px;
    min-width:65px;
    font-size:14px
  }

  .arrow-icon {
    position: absolute;
    right: 10px;
    top: 20px;
  }

  .arrow-icon-active {
    position: absolute;
    right: 10px;
    top: 20px;
    transform: rotate(180deg);
  }

  .btn.keep-coupon {
    width: 365px;
    font-size: 18px;
    font-weight: 500;
    height: 50px;
  }

  .btn.keep-coupon {
    padding-right: 120px !important
  }

  .btn.keep-coupon:before {
    content: '';
    position: absolute;
    top: 10px;
    right: 20px;
    width: 30px;
    height: 30px;
    background-color: #FFFF00;
    border-radius: 50%;
  }

  .btn.keep-coupon:after {
    content: '';
    position: absolute;
    top: 11px;
    right: 20px;
    width: 30px;
    height: 30px;
    background-size: 14px;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(../assets/img/icons/icon-arrow-right.svg);
    transform: rotate(90deg);
  }

  .btn.keep-coupon[aria-expanded="true"]:after {
    content: '';
    position: absolute;
    top: 9px;
    right: 20px;
    width: 30px;
    height: 30px;
    background-size: 18px;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(../assets/img/icons/icon-arrow-right.svg);
    transform: rotate(270deg);
  }

  .dropdown-menu.coupon {
    width: 100%;
    left: 0;
  }

  .card-coupon .card-percent{
    min-height: 90px;
  }
  .card-coupon .card-body{
    min-height: 90px;
  }
}
</style>
