<template>
  <div class="page" style="background-color: #f5f5f5">
    <div class="section-blog" v-if="product && product !== '{}'">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div
              class="blog-row align-items-center"
              v-if="product.listCategory != undefined"
            >
              <ul class="nav nav-blog">
                <li>
                  <a href="/product">All Product</a>
                </li>
                <template v-if="product.listCategory?.length > 0">
                  <li>
                    <a
                      :href="
                        '/product?subid=' +
                        product.listCategory[0].itemCategory._id +
                        '&subname=' +
                        product.listCategory[0].itemCategory.itemCategoryName
                      "
                      >{{
                        product.listCategory[0].itemCategory.itemCategoryName
                      }}</a
                    >
                  </li>
                  <li>
                    <a
                      :href="
                        '/product?subid=' +
                        product.listCategory[0].productGroup._id +
                        '&subname=' +
                        product.listCategory[0].productGroup.productGroupName
                      "
                      >{{
                        product.listCategory[0].productGroup.productGroupName
                      }}</a
                    >
                  </li>
                </template>
              </ul>
              <!-- <div  class="icons-group ml-auto">
                <modal-social-share-product :detail="product" class="d-inline"></modal-social-share-product>
                <button class="btn btn-like" type="button" @click="favorite(product._id)"
                  :class="{ active: like }"></button>
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
                <button
                  class="btn btn-like"
                  type="button"
                  @click="favorite(product._id)"
                  :class="{ active: like }"
                ></button>
              </div>
            </div>

            <hr class="my-1" />

            <div class="blog-row my-2">
              <h5>
                <a
                  class="goback"
                  :href="
                    '/product?subid=' +
                    product.listCategory[0].itemCategory._id +
                    '&subname=' +
                    product.listCategory[0].itemCategory.itemCategoryName
                  "
                  v-if="product.listCategory?.length > 0"
                >
                  <span class="icons"></span> {{ $t("category") }}
                  {{ product.listCategory[0].itemCategory.itemCategoryName }}
                </a>
              </h5>
            </div>

            <div class="product-gallery">
              <div class="row">
                <client-only>
                  <div class="col-lg-5 col-md-6">
                    <swiper
                      class="swiper swiper-container swiper-gallery"
                      :options="swiperOptionTop"
                      ref="swiperTop"
                    >
                      <swiper-slide
                        class="card-photo swiper-slide"
                        v-for="(image, index) in product.images"
                        :key="index"
                      >
                        <a
                          class="photo"
                          data-fancybox
                          :href="image"
                          :style="{ backgroundImage: 'url(' + image + ')' }"
                        >
                          <img src="/img/thumb/frame-100x100.png" />
                        </a>
                      </swiper-slide>
                    </swiper>

                    <swiper
                      class="swiper swiper-container swiper-gallery-thumb"
                      :options="swiperOptionThumbs"
                      ref="swiperThumbs"
                    >
                      <swiper-slide
                        class="card-photo swiper-slide"
                        v-for="(image, index) in product.images"
                        :key="index"
                      >
                        <a
                          class="photo"
                          data-fancybox
                          :href="image"
                          :style="{ backgroundImage: 'url(' + image + ')' }"
                        >
                          <img src="/img/thumb/frame-100x100.png" />
                        </a>
                      </swiper-slide>
                      <div
                        class="swiper-button swiper-button-prev gallery-thumb"
                        slot="button-next"
                      >
                        <span class="arrow-left"></span>
                      </div>
                      <div
                        class="swiper-button swiper-button-next gallery-thumb"
                        slot="button-prev"
                      >
                        <span class="arrow-right"></span>
                      </div>
                    </swiper>
                  </div>
                </client-only>
                <!--col-md-4-->
                <div class="col-lg-7 col-md-6">
                  <div class="product-infos">
                    <div class="pd-row">
                      <div class="d-flex position-relative">
                        <h4 class="title-md regular pr-3 mb-2">
                          {{ $t("point") }}
                        </h4>
                        <ul class="rating">
                          <li :class="{ active: product.rating >= 1 }">
                            <span></span>
                          </li>
                          <li :class="{ active: product.rating >= 2 }">
                            <span></span>
                          </li>
                          <li :class="{ active: product.rating >= 3 }">
                            <span></span>
                          </li>
                          <li :class="{ active: product.rating >= 4 }">
                            <span></span>
                          </li>
                          <li :class="{ active: product.rating >= 5 }">
                            <span></span>
                          </li>
                        </ul>

                        <span class="ml-3 f-13 mt-md-1"
                          >({{ product.rating }} {{ $t("point") }})</span
                        >
                      </div>
                      <img
                        v-if="flashSale.status"
                        class="img-title ml-auto d-none d-lg-block"
                        style="width: 160px; margin-top: -15px"
                        src="/img/icons/flash-sale-title.svg"
                        alt=""
                      />
                      <div
                        v-if="product.isSuggestion && !flashSale.status"
                        class="pd-label btn recommend"
                      >
                        <span class="icons icon-tag"></span> {{ $t("suggest") }}
                      </div>
                    </div>

                    <template v-if="flashSale.status">
                      <div class="pd-row d-block d-lg-none">
                        <img
                          class="img-title ml-auto"
                          src="/img/icons/flash-sale-title.svg"
                          alt=""
                        />
                      </div>
                      <div class="pd-row flashsale-event">
                        <span class="icons icon-clock white"></span>
                        <h4 class="title-md">{{ $t("endIn") }}</h4>
                        <div class="timer md h-auto ml-auto">
                          <ul>
                            <li class="days" ref="flashDays" :data-title="this.$i18n.locale === 'th' ? 'วัน' : 'Day'"></li>
                            <li class="hours" ref="flashHours" :data-title="this.$i18n.locale === 'th' ? 'ชั่วโมง' : 'Hrs'"></li>
                            <li class="minutes" ref="flashMin" :data-title="this.$i18n.locale === 'th' ? 'นาที' : 'Min'"></li>
                            <li class="seconds" ref="flashSec" :data-title="this.$i18n.locale === 'th' ? 'วินาที' : 'Sec'"></li>
                          </ul>
                        </div>
                      </div>
                    </template>

                    <div class="pd-row">
                      <h2>{{ product.itemDescription }}</h2>
                    </div>

                    <!-- condition 1  -->
                    <div
                      class="pd-row"
                      v-if="!flashSale.status && selectOption.price !== 0"
                    >
                      <div class="price-wrap lg" v-if="this.statusShopNow">
                        <span class="price" v-if="have_discount === true"
                          >฿{{
                            (selectOption.price - selectOption.discount) | numFormat
                          }}</span
                        >
                        <span class="price" v-if="have_discount === false"
                          >฿{{
                            (selectOption.price - selectOption.discount)
                              | numFormat
                          }}</span
                        >
                        <span
                          v-if="
                            have_discount == true &&
                            discount_price - selectOption.discount <
                              selectOption.price
                          "
                          class="price-old"
                        >
                          ฿{{ selectOption.price | numFormat }}
                        </span>
                      </div>
                      <div
                        class="price-wrap lg"
                        v-if="!this.statusShopNow && discount_min > 0"
                      >
                        <span class="price" v-if="discount_min != discount_max"
                          >฿{{ discount_min | numFormat }} - ฿{{
                            discount_max | numFormat
                          }}</span
                        >
                        <span class="price" v-if="discount_min == discount_max"
                          >฿{{ discount_min | numFormat }}</span
                        >
                        <span
                          class="price-old"
                          v-if="price_max > 0 && price_max != price_min"
                          >฿{{ price_min | numFormat }} - ฿{{
                            price_max | numFormat
                          }}</span
                        >
                        <span
                          class="price-old"
                          v-if="price_max == 0 && price_min != discount_min"
                          >฿{{ price_min | numFormat }}</span
                        >
                      </div>
                      <div
                        class="price-wrap lg"
                        v-if="!this.statusShopNow && discount_min <= 0"
                      >
                        <span
                          class="price"
                          v-if="price_max > 0 && price_max != price_min"
                          >฿{{ price_min | numFormat }} - ฿{{
                            price_max | numFormat
                          }}</span
                        >
                        <span
                          class="price"
                          v-if="price_max == 0 || price_max == price_min"
                          >฿{{ price_min | numFormat }}</span
                        >
                      </div>

                      <!--                        <p class="ml-auto">3,500 ขายแล้ว</p>-->
                    </div>

                    <!-- condition 2  -->
                    <div
                      class="pd-row"
                      v-if="selectOption.price === 0 && !flashSale.status"
                    >
                      <div
                        class="price-wrap lg"
                        v-if="product.unitPrice !== product.unitPriceMax"
                      >
                        <span class="price"
                          >฿{{ product.unitPrice | numFormat }} - ฿{{
                            product.unitPriceMax | numFormat
                          }}</span
                        >
                      </div>
                      <div class="price-wrap lg" v-else>
                        <span class="price" v-if="discount_min != discount_max"
                          >฿{{ discount_min | numFormat }} - ฿{{
                            discount_max | numFormat
                          }}</span
                        >
                        <span class="price" v-if="discount_min == discount_max"
                          >฿{{ discount_min | numFormat }}</span
                        >
                        <span
                          class="price-old"
                          v-if="price_max > 0 && price_max != price_min"
                          >฿{{ price_min | numFormat }} - ฿{{
                            price_max | numFormat
                          }}</span
                        >
                        <span
                          class="price-old"
                          v-if="price_max == 0 || price_max == price_min"
                          >฿{{ price_min | numFormat }}</span
                        >
                      </div>
                    </div>
                    <!-- condition 3  -->
                    <!-- <pre>{{ checker }}</pre> -->
                    <div class="pd-row" v-if="flashSale.status">
                      <div class="price-wrap lg">
                        <span
                          class="price"
                          v-if="flash_sale_min !== flash_sale_max"
                          >฿{{ flash_sale_min | numFormat }} - ฿{{
                            flash_sale_max | numFormat
                          }}</span
                        >
                        <span
                          class="price"
                          v-if="flash_sale_min === flash_sale_max"
                          >฿{{ flash_sale_min | numFormat }}</span
                        >
                        <!-- <span class="price-old" v-if="price_max > 0 && price_max != price_min">฿{{ price_min | numFormat
                        }} - ฿{{price_max | numFormat}}</span> -->
                        <span
                          class="price-old"
                          v-if="price_max > 0 && price_max != price_min"
                          >฿{{ price_min | numFormat }} - ฿{{
                            price_max | numFormat
                          }}</span
                        >
                        <span
                          class="price-old"
                          v-if="
                            (price_max == 0 || price_max == price_min) &&
                            price_max != flash_sale_max
                          "
                          >฿{{ price_min | numFormat }}</span
                        >
                      </div>
                    </div>

                    <div class="pd-row pt-0">
                      <p>
                        {{ $t("buyProductGetPoint") }} {{ selectOption.point }}
                        {{ $t("point") }}
                      </p>

                      <a
                        href="/howto-point-detail?id=63db41472886d660ca9463f7"
                        class="ml-auto"
                        data-toggle="tooltip"
                        title="ใช้พอยท์ อย่างไร"
                      >
                        <img
                          class="w-auto"
                          src="/img/icons/icon-infos.svg"
                          alt=""
                        />
                      </a>
                    </div>

                    <!-- <div class="progress-box my-3" v-if="flashSale.status">
                      <div class="progress">
                        <div class="progress-bar" :style="{ width: flashSale.percent + '%' }"></div>
                      </div>

                      <p class="sold" v-if="flashSale.percent === 100">
                        สินค้าหมดแล้ว
                      </p>
                      <p class="sold" v-else-if="flashSale.percent > 80">
                        {{ $t("willSoldOut") }}
                      </p>
                      <p class="sold" v-else>
                        {{ $t("sold") }} {{ flashSale.sale }} {{ $t("piece") }}
                      </p>
                    </div> -->
                    <!--progress-box-->

                    <div class="pd-flash-sale mt-3" v-if="flashSale.prepare">
                      <p class="d-flex">
                        <img
                          class="img-title mr-2"
                          style="width: 110px"
                          src="/img/icons/flash-sale-title.svg"
                          alt=""
                        />
                        {{ $t("willStart") }}
                        {{ flashSale.startDate | luxon("T") }},
                        {{ flashSale.startDate | luxon("date_med") }}
                      </p>

                      <div class="d-flex ml-auto align-items-center">
                        <span class="icons icon-clock"></span>
                        <h4 class="title-md">{{ $t("activityStartIn") }}</h4>
                        <div class="timer md h-auto">
                          <ul>
                            <li class="days d-none"></li>
                            <li class="hours">{{ flashSale.hours }}</li>
                            <li class="minutes">{{ flashSale.min }}</li>
                            <li class="seconds">{{ flashSale.sec }}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="pd-row">
                      <hr class="w-100 my-2 my-md-3" />
                    </div>

                    <div class="pd-row">
                      <div class="mw-105">
                        <h4 class="title-md regular" v-if="this.$i18n.locale === 'th'">
                          {{  selectOption.name }}
                        </h4>
                        <h4 class="title-md regular" v-if="this.$i18n.locale === 'en'">
                          {{  selectOption.name_en }}
                        </h4>
                      </div>
                      <ul class="nav color">
                        <li
                          v-for="(attribute, index) in product.options
                            ?.attributes"
                          :key="index + 'a'"
                          @click="chooseOption(index, product.options.name)"
                        >
                          <span
                            :class="{
                              active: attribute.name === selectOption.attribute,
                            }"
                            >{{ attribute.name }}</span
                          >
                        </li>
                      </ul>
                    </div>

                    <div class="pd-row" v-if="isShowRequireOption">
                      <div class="mw-105">
                        <h4 class="title-md regular">{{ listRequire.name }}</h4>
                      </div>
                      <ul class="nav color">
                        <li
                          v-for="(value, index) in listRequire.subValues"
                          :key="index + 'ab'"
                          @click="chooseRequireOption(index)"
                        >
                          <span
                            :class="{
                              active: value.name === selectOption.subValue,
                            }"
                            >{{ value.name }}</span
                          >
                        </li>
                      </ul>
                    </div>

                    <div class="pd-row">
                      <div class="mw-105">
                        <h4 class="title-md regular">{{ $t("quantity") }}</h4>
                      </div>
                      <div class="input-qty-group lg">
                        <button
                          :disabled="selectOption.amount <= 1"
                          class="minus"
                          type="button"
                          value="-"
                          @click="manageAmount('-')"
                        ></button>
                        <input
                          type="text"
                          name="qty"
                          class="qty form-control input-text qty"
                          maxlength="12"
                          @keyup="selectOption.amount = Math.max(Math.min(Math.round(selectOption.amount), stockLimit), 1)"
                          v-model="selectOption.amount"
                        />
                        <button
                          :disabled="selectOption.amount >= stockLimit || selectOption.amount >= 5 || (selectOption.amount + beforeAmount >= stockLimit) || (selectOption.amount + beforeAmount >= 5)"
                          class="plus"
                          type="button"
                          value="+"
                          @click="manageAmount('+')"
                        ></button>
                      </div>
                    </div>

                    <div v-if="stockStatus == false" class="pd-row">
                      <div class="mw-105">
                        <h4 class="title-md regular text-danger">
                          {{ $t("outOfStock") }}
                        </h4>
                      </div>
                    </div>

                    <div class="pd-row pd-buttons mt-auto pb-0">
                      <button
                        @click="addItem('shopNow')"
                        class="btn btn-red effect medium w-160"
                        type="button"
                        :disabled="!statusShopNow || flashSale.percent === 100"
                      >
                        <span class="icons icon-creditcard"></span>
                        <span>{{ $t("shopNow") }}</span>
                      </button>
                      <button
                        @click="addItem('toCart')"
                        class="btn btn-black-outline medium effect w-160"
                        type="button"
                        :disabled="!statusShopNow || flashSale.percent === 100"
                      >
                        <span class="icons icon-bag black before"></span>
                        <span>{{ $t("addToCart") }}</span>
                      </button>

                      <!--d-flex-->
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="coupon-dropdown mt-3">
                          <!-- <p class="title pr-2">{{ $t('couponDetailPage') }}</p> -->
                          <div class="d-flex flex-wrap">
                            <!-- <div class="label" v-for="(coupon, index) in brand.coupon" :key="index">
                              <span v-if="coupon.type === 'freeShipping'">{{
                                $t("freeShipping")
                              }}</span>
                              <span v-if="coupon.type === 'cashback'">{{ $t("cashback") }}
                                <span v-if="coupon.cashBackType === 'baht'">฿</span>{{ coupon.cashBackValue }}
                                <span v-if="coupon.cashBackType === 'percent'">%</span>
                              </span>
                              <span v-if="coupon.type === 'discount'">{{ $t("shortDiscount") }}
                                <span v-if="coupon.discountType === 'baht'">฿</span>{{
                                  coupon.discountValue
                                }}<span v-if="coupon.discountType === 'percent'">%</span></span>
                            </div> -->
                          </div>
                          <div class="dropdown ml-2">
                            <button
                              class="btn keep-coupon"
                              data-toggle="dropdown"
                              data-display="static"
                            >
                              <span>{{ $t("couponDetailPage") }}</span>
                            </button>
                            <div class="dropdown-menu coupon">
                              <div class="hgroup">
                                <h4>{{ $t("couponDetailPage") }}</h4>
                              </div>
                              <div class="scroll-inner">


                                <template v-for="(coupons, index) in couponList">
                                  <template v-if="coupons.type === 'freeShipping' && coupons.excludeBrands.indexOf(product.brand) !== 0 && coupons.excludeProducts.indexOf(product._id) !== 0 && checkCouponBrand(product.brand, product._id) === true">
                                    <div class="card-coupon position-relative" :key="index"
                                      :class="coupons.total >= coupons.amount || checkIsMyCoupon(coupons._id) ? 'codeisout' : ''">
                                      <div class="card-percent yellow">
                                        <span class="m-auto">ส่งฟรี</span>
                                      </div>
                                      <div class="card-body d-md-flex pr-0">
                                        <div class="d-flex flex-column">
                                          <p class="h-auto py-2">{{ coupons.name }}</p>
                                          <h3 class="codeisout-text-lineheight">฿{{ coupons.basePrice }} {{ $t('deliveryPrice') }}</h3>
                                          <p class="fs-10">เมื่่อซื้อสินค้า {{ coupons.brands.map(brand =>
                                            brand.brandName).toString() }} {{ $t('min') }} {{ coupons.basePrice }}.-</p>
                                          <h6 class="fs-10 text-red">
                                            <img src="../../assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
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

                                  <template v-if="coupons.type === 'discount' && coupons.excludeBrands.indexOf(product.brand) !== 0 && coupons.excludeProducts.indexOf(product._id) !== 0 && checkCouponBrand(product.brand, product._id) === true">
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
                                          <p class="h-auto py-2">{{ coupons.name }}</p>
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
                                            <img src="../../assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
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

                                  <template v-if="coupons.type === 'cashback' && coupons.excludeBrands.indexOf(product.brand) !== 0 && coupons.excludeProducts.indexOf(product._id) !== 0 && checkCouponBrand(product.brand, product._id) === true">
                                    <div class="card-coupon position-relative" :key="index"
                                      :class="coupons.total >= coupons.amount || checkIsMyCoupon(coupons?._id) ? 'codeisout' : ''">
                                      <div class="card-percent">
                                        <span class="m-auto">{{ coupons.cashBackValue }}%</span>
                                      </div>
                                      <div class="card-body d-lg-flex pr-0">
                                        <div class="d-block">
                                          <p class="h-auto py-2">{{ coupons.name }}</p>
                                          <h3 class="codeisout-text-lineheight">
                                            <span v-if="coupons.cashBackType === 'baht'">฿</span>{{ coupons.cashBackValue }}<span
                                              v-if="coupons.cashBackType === 'percent'">%</span>
                                          </h3>
                                          <p class="fs-10 text-black" v-if="coupons.discountType === 'baht'">
                                            &nbsp;
                                          </p>
                                          <h6 class="fs-10 text-red">
                                            <img src="../../assets/img/icons/clock.svg" width="13px" class="p-0 " alt="" /> {{
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
                          <!--dropdown-->
                        </div>
                      </div>
                    </div>

                    <!--pd-row-->
                  </div>
                  <!--product-infos-->
                </div>
                <!--col-md-8-->
              </div>
              <!--row-->
            </div>
            <!--product-gallery-->

            <div class="pd-row">
              <hr class="w-100 my-4 my-md-5" />
            </div>

            <ul class="nav nav-filter pd mx-auto">
              <li>
                <a
                  class="active font-thai"
                  data-toggle="tab"
                  href="#pd_detail_1"
                  >{{ $t("detail") }}</a
                >
              </li>
              <li>
                <a class="font-thai" data-toggle="tab" href="#pd_detail_2">{{
                  $t("specifications")
                }}</a>
              </li>
              <li>
                <a class="font-thai" data-toggle="tab" href="#pd_detail_3">{{
                  $t("staffReview")
                }}</a>
              </li>
              <li>
                <a class="font-thai" data-toggle="tab" href="#pd_detail_4">{{
                  $t("customerReview")
                }}</a>
              </li>
            </ul>
            <div class="tab-content tab-product-details">
              <div class="tab-pane fade show active" id="pd_detail_1">
                <div class="article">
                  <div v-html="product.itemDescription2"></div>
                </div>
                <!--article-->

                <hr class="w-100 my-4 my-md-5" />

                <h3>{{ $t("insideBox") }}</h3>
                <div class="row space-25 py-md-3">
                  <div
                    class="col-md-4 mb-2 mb-md-"
                    v-for="(oneImg, index) in product.imageInBox"
                    :key="index"
                  >
                    <a :href="oneImg" data-fancybox>
                      <img class="w-100 mb-0" :src="oneImg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <!--tab-pane-->

              <!--==============[End] pd_detail_1 =================-->

              <div class="tab-pane fade" id="pd_detail_2">
                <div class="article">
                  <div v-html="product.specifications"></div>
                </div>
              </div>
              <!--tab-pane-->

              <!--==============[End] pd_detail_2 =================-->

              <div class="tab-pane fade" id="pd_detail_3">
                <div class="article">
                  <div class="video-responsive">
                    <div v-html="product.staffReview"></div>
                  </div>
                </div>
                <!--article-->
              </div>
              <!--tab-pane-->

              <!--==============[End] pd_detail_3 =================-->

              <div class="tab-pane fade" id="pd_detail_4">
                <h3>{{ $t("pointReview") }}</h3>
                <div class="row review-score">
                  <div class="col-lg-6 col-md-7">
                    <h2>{{ product.rating ? product.rating : 0 }} / 5</h2>
                    <div class="pd-row">
                      <div class="d-md-flex">
                        <h4 class="regular pr-3">{{ $t("point") }}</h4>

                        <div class="d-flex">
                          <ul class="rating">
                            <li :class="{ active: product.rating >= 1 }">
                              <span></span>
                            </li>
                            <li :class="{ active: product.rating >= 2 }">
                              <span></span>
                            </li>
                            <li :class="{ active: product.rating >= 3 }">
                              <span></span>
                            </li>
                            <li :class="{ active: product.rating >= 4 }">
                              <span></span>
                            </li>
                            <li :class="{ active: product.rating >= 5 }">
                              <span></span>
                            </li>
                          </ul>

                          <span class="my-auto ml-3"
                            >({{ $t("all") }} {{ review.data?.length }}
                            {{ $t("list") }})</span
                          >
                        </div>
                      </div>
                    </div>
                    <!--pd-row-->
                  </div>
                  <!--col-md-6-->
                  <div class="col-lg-6 col-md-5">
                    <div class="pd-row d-block">
                      <div class="d-flex mb-2">
                        <ul class="rating">
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                        </ul>

                        <span class="my-auto ml-3">({{ rating[4] }})</span>
                      </div>

                      <div class="d-flex mb-2">
                        <ul class="rating">
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li><span></span></li>
                        </ul>

                        <span class="my-auto ml-3">({{ rating[3] }})</span>
                      </div>

                      <div class="d-flex mb-2">
                        <ul class="rating">
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li><span></span></li>
                          <li><span></span></li>
                        </ul>

                        <span class="my-auto ml-3">({{ rating[2] }})</span>
                      </div>

                      <div class="d-flex mb-2">
                        <ul class="rating">
                          <li class="active"><span></span></li>
                          <li class="active"><span></span></li>
                          <li><span></span></li>
                          <li><span></span></li>
                          <li><span></span></li>
                        </ul>

                        <span class="my-auto ml-3">({{ rating[1] }})</span>
                      </div>

                      <div class="d-flex mb-2">
                        <ul class="rating">
                          <li class="active"><span></span></li>
                          <li><span></span></li>
                          <li><span></span></li>
                          <li><span></span></li>
                          <li><span></span></li>
                        </ul>

                        <span class="my-auto ml-3">({{ rating[0] }})</span>
                      </div>
                    </div>
                    <!--pd-row-->
                  </div>
                  <!--col-md-6-->
                </div>
                <!--row-->

                <hr class="w-100 my-4 my-md-5" />

                <ul class="nav nav-filter pd mx-auto">
                  <li>
                    <a class="active" data-toggle="tab" href="#tab_review">{{
                      $t("customerReview")
                    }}</a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#tab_faq">{{
                      $t("FQAStaff")
                    }}</a>
                  </li>
                </ul>

                <div class="tab-content tab-review pt-lg-5 pt-4">
                  <div id="tab_review" class="tab-pane fade show active">
                    <div class="pd-row mb-4">
                      <h4 class="mb-0">{{ $t("customerReview") }}</h4>

                      <div class="d-flex sort">
                        <h6 class="mr-3 d-none d-md-block">
                          {{ $t("sortBy") }}
                        </h6>
                        <select class="custom-select">
                          <option>
                            {{ $t("sortBy") }} : {{ $t("lastedDate") }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <!--pd-row-->

                    <client-only>
                      <template v-if="review">
                        <hr class="w-100 my-2" />
                        <p
                          v-if="review.data?.length === 0"
                          style="
                            display: flex;
                            justify-content: center;
                            margin-top: 30px;
                          "
                        >
                          {{ $t("noPreview") }}
                        </p>
                        <div
                          class="comment-row"
                          v-for="(review, index) in review.data"
                          :key="index"
                        >
                          <div
                            class="avatar"
                            style="
                              background-image: url(/img/thumb/icons/Default_User_Photo.svg);
                            "
                          ></div>

                          <div class="infos">
                            <h5>{{ review.customer?.custId }}</h5>
                            <div class="date">
                              <div class="d-flex pr-3">
                                <span class="icons icon-calendar"></span>
                                {{ review.createdAt | luxon("date_short") }}
                              </div>
                              <div class="d-flex">
                                <span class="icons icon-clock"></span>
                                {{ review.createdAt | luxon("T") }}
                              </div>
                            </div>
                            <!--v-->

                            <ul class="rating">
                              <li :class="{ active: review.star >= 1 }">
                                <span></span>
                              </li>
                              <li :class="{ active: review.star >= 2 }">
                                <span></span>
                              </li>
                              <li :class="{ active: review.star >= 3 }">
                                <span></span>
                              </li>
                              <li :class="{ active: review.star >= 4 }">
                                <span></span>
                              </li>
                              <li :class="{ active: review.star >= 5 }">
                                <span></span>
                              </li>
                            </ul>
                            <p>{{ review.detail }}</p>

                            <ul
                              class="nav nav-photo"
                              v-for="(image, index) in review.listImage"
                              v-if="review.listImage?.length > 0"
                              :key="index"
                            >
                              <li>
                                <a
                                  data-fancybox
                                  :style="{
                                    backgroundImage: 'url(' + image + ')',
                                  }"
                                  :href="image"
                                ></a>
                              </li>
                              <!--                                <li><a data-fancybox style="background-image: url(/img/thumb/photo-280x280&#45;&#45;2.jpg);" href="/img/thumb/photo-280x280&#45;&#45;2.jpg"></a></li>-->
                            </ul>
                          </div>
                          <!--infos-->
                        </div>
                        <!--comment-row-->

                        <ul
                          class="pagination justify-content-center pt-4"
                          v-if="review.pageTotal > 0"
                        >
                          <li :class="{ disabled: reviewPage <= 1 }">
                            <a style="cursor: pointer" @click="reviewPage -= 1">
                              <span class="arrow"
                                ><span class="arrow-left"></span
                              ></span>
                            </a>
                          </li>
                          <li
                            :class="{ active: parseInt(reviewPage) === page }"
                            v-for="page in review.pageTotal"
                            :key="page + page"
                          >
                            <template
                              v-if="review.currentPage <= 2 && page <= 5"
                            >
                              <a
                                style="cursor: pointer"
                                @click="reviewPage = page"
                              ></a>
                            </template>
                            <template
                              v-if="
                                review.currentPage > 2 &&
                                page <= review.currentPage + 2 &&
                                page >= review.currentPage - 2
                              "
                            >
                              <a
                                style="cursor: pointer"
                                @click="reviewPage = page"
                              ></a>
                            </template>
                          </li>
                          <li
                            :class="{
                              disabled:
                                parseInt(reviewPage) === review.pageTotal,
                            }"
                          >
                            <a style="cursor: pointer" @click="reviewPage += 1">
                              <span class="arrow"
                                ><span class="arrow-right"></span
                              ></span>
                            </a>
                          </li>
                        </ul>
                      </template>
                    </client-only>
                  </div>
                  <!--tab-pane-->

                  <!--==============[End] รีวิวจากลูกค้า =================-->

                  <div id="tab_faq" class="tab-pane fade">
                    <div class="pd-row mb-md-4">
                      <h4 class="mb-0">{{ $t("FQAStaff") }}</h4>

                      <div class="d-flex sort">
                        <button
                          class="pd-label btn comment"
                          @click="showFAQModal"
                        >
                          <span class="icons icon-pen"></span>
                          {{ $t("askQuestion") }}
                        </button>
                      </div>
                    </div>
                    <!--pd-row-->

                    <hr class="w-100 my-2" />
                    <client-only>
                      <template v-if="question">
                        <p
                          v-if="question.data?.length === 0"
                          style="
                            display: flex;
                            justify-content: center;
                            margin-top: 30px;
                          "
                        >
                          {{ $t("noQuestion") }}
                        </p>
                        <template v-for="(question, index) in question.data">
                          <div class="comment-row question" :key="question._id">
                            <div class="avatar q">
                              <span class="m-auto">Q</span>
                            </div>

                            <div class="infos">
                              <h5>
                                {{
                                  question.customer
                                    ? question.customer.custId
                                    : "Guest"
                                }}
                              </h5>
                              <div class="date">
                                <div class="d-flex pr-3">
                                  <span class="icons icon-calendar"></span>
                                  {{ question.createdAt | luxon("date_short") }}
                                </div>
                                <div class="d-flex">
                                  <span class="icons icon-clock"></span>
                                  {{ question.createdAt | luxon("T") }}
                                </div>
                              </div>
                              <!--v-->

                              <p>{{ question.question }}</p>
                            </div>
                            <!--infos-->
                          </div>
                          <!--comment-row-->

                          <div
                            class="comment-row answer"
                            :key="index"
                            v-if="question.answer"
                          >
                            <div
                              class="avatar"
                              style="
                                background-image: url(/img/icons/Default_User_Photo.svg);
                              "
                            ></div>

                            <div class="infos">
                              <h5>Munkong ONLINE</h5>
                              <div class="date">
                                <div class="d-flex pr-3">
                                  <span class="icons icon-calendar"></span>
                                  {{ question.updatedAt | luxon("date_short") }}
                                </div>
                                <div class="d-flex">
                                  <span class="icons icon-clock"> </span>
                                  {{ question.updatedAt | luxon("T") }}
                                </div>
                              </div>
                              <!--v-->

                              <p v-html="question.answer"></p>
                            </div>
                            <!--infos-->
                          </div>
                          <!--comment-row-->
                        </template>

                        <!--//-->

                        <ul
                          class="pagination justify-content-center pt-4"
                          v-if="question.pageTotal > 0"
                        >
                          <li :class="{ disabled: questionPage <= 1 }">
                            <a
                              style="cursor: pointer"
                              @click="questionPage -= 1"
                            >
                              <span class="arrow"
                                ><span class="arrow-left"></span
                              ></span>
                            </a>
                          </li>
                          <li
                            :class="{
                              active: parseInt(questionPage) === questPage,
                            }"
                            v-for="questPage in question.pageTotal"
                            :key="questPage"
                          >
                            <template
                              v-if="question.currentPage <= 2 && questPage <= 5"
                            >
                              <a
                                style="cursor: pointer"
                                @click="questionPage = questPage"
                                >{{ questPage }}</a
                              >
                            </template>
                            <template
                              v-if="
                                question.currentPage > 2 &&
                                questPage <= question.currentPage + 2 &&
                                questPage >= question.currentPage - 2
                              "
                            >
                              <a
                                style="cursor: pointer"
                                @click="questionPage = questPage"
                                >{{ questPage }}</a
                              >
                            </template>
                          </li>
                          <li
                            :class="{
                              disabled:
                                parseInt(questionPage) === question.pageTotal,
                            }"
                          >
                            <a
                              style="cursor: pointer"
                              @click="questionPage += 1"
                            >
                              <span class="arrow"
                                ><span class="arrow-right"></span
                              ></span>
                            </a>
                          </li>
                        </ul>
                      </template>
                    </client-only>
                  </div>
                  <!--tab-pane-->

                  <!--==============[End] ถาม - ตอบทีมงาน =================-->
                </div>
                <!--tab-content-->
              </div>
              <!--tab-pane-->

              <!--==============[End] pd_detail_4 =================-->

              <hr class="w-100 my-5 my-md-5" />

              <h3>{{ $t("similarProducts") }}</h3>

              <!--                Limit 4 items-->
              <div class="row product-list space-20 wow fadeIn">
                <div
                  class="col-md-3 col-6"
                  v-for="(item, index) in random"
                  :key="index"
                >
                  <ProductCard :product="item" :key="item._id" />
                </div>
                <!--cols-->
              </div>
              <!--product-list-->
            </div>
            <!--tab-product-details-->
          </div>
          <!--blog-content-->
        </div>
        <!--container-inner-->
      </div>
      <!--container-->
    </div>
    <!--section-blog-->

    <ModalQuestion @question="addQuestion" />

    <ModalSuccess :message="$t('messageAddToCart')" />
  </div>
</template>

<script>
import ProductCard from "@/components/product-card/ProductCard";
import ModalUsePoint from "@/components/modal/ModalUsePoint";
import ModalQuestion from "@/components/modal/ModalQuestion";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ModalSuccess from "@/components/modal/ModelSuccess";
import ModalSocialShareProduct from "../../components/modal/ModalSocialShareProduct.vue";
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
          content: this.meta.content,
        },
      ],
    };
  },
  name: "product-detail.vue",
  components: {
    ModalSocialShareProduct,
    ModalSuccess,
    ModalQuestion,
    ModalUsePoint,
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      meta: {
        title: "",
        hid: "",
        name: "",
        content: "",
      },
      promotion_discount: null,
      have_discount: false,
      discount_price: 0,
      discount_min: 0,
      discount_max: 0,
      flash_sale_price: 0,
      flash_sale_min: 0,
      flash_sale_max: 0,
      price_min: 0,
      price_max: 0,
      status: false,
      searchCoupon: "",
      prevOption: "",
      product: {},
      random: [],
      like: false,
      brand: null,
      isShowRequireOption: false,
      isSelectOption: false,
      oldImage: "",
      reviewPage: 1,
      questionPage: 1,
      favorites: [],
      selectOption: {
        id: "",
        name: "",
        attribute: "",
        subName: "", //ออฟชันรอง เช่น ขนาด, ไซส์
        subValue: "", //ชื่อตัวเลือกรอง เช่น S,M,L
        itemNo: "",
        specialShipmentCost: "",
        typeShipping: "",
        price: 0,
        discount: 0,
        startDate: "",
        endDate: "",
        amount: 1,
        point: 0,
      },
      rating: ["0", "0", "0", "0", "0"],
      isNotToggle: false,
      flashSale: {
        id: null,
        //next flash sale
        prepare: false,
        startDate: "",
        //current flash sale
        status: false,
        endDate: "",
        sale: 0,
        quantity: 0,
        hours: 0,
        min: 0,
        sec: 0,
        percent: 0,
        discount: 0,
      },
      switchTab: "review",
      isLoggedIn: false,
      flashSales: [],
      listRequire: [],
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
      },
      statusShopNow: false,
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
        /*simulateTouch:false,*/
        navigation: {
          nextEl: ".swiper-button-next.gallery-thumb",
          prevEl: ".swiper-button-prev.gallery-thumb",
        },
        breakpoints: {
          1366: {
            spaceBetween: 20,
            slidesPerView: 4,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 4,
          },
          0: {
            spaceBetween: 5,
            slidesPerView: 4,
          },
        },
        checker: {},
      },
      stockStatus: true,
      outOfStockId: [],
      stockLimit: 0,
      beforeAmount: 0,
      preOrderStatus: false,
      productDetail: [],
      flashSaleStatus: false,
    };
  },
  computed: {
    couponList() {
      return this.$store.state.coupon.couponList
    },
    // brand() {
    //   return this.$store.state.brand.brand;
    // },
    myCoupons() {
      return this.$store.state.coupon.myCoupons;
    },
    cart() {
      const cartStore = JSON.parse(JSON.stringify(this.$store.state.cart.cart));
      cartStore.items = cartStore.items.filter((item) => item.isCheck === true);
      // const installment = cartStore.items.filter(item => item.canInstallment === false)
      // if (installment.length > 0) {
      //   this.canInstallment = false
      // }
      cartStore.point = 0;
      cartStore.items.map(item => {
        cartStore.point = cartStore.point + (item.point * item.amount);
      })

      return cartStore;
    },
    // brands() {
    //   return this.$store.state.brand.brand;
    // },
    question() {
      return this.$store.state.product.question;
    },
    review() {
      return this.$store.state.product.review;
    },
  },
  watch: {
    async questionPage(number) {
      const getQuestion = {
        id: this.$route.query.p,
        questionPage: this.questionPage,
      };
      await this.$store.dispatch("product/showQuestion", getQuestion);
    },
    async reviewPage(number) {
      const getReview = {
        id: this.$route.query.p,
        reviewPage: this.reviewPage,
      };
      await this.$store.dispatch("product/showReview", getReview);
    },
  },
  async fetch() {
    if (this.$auth.loggedIn) {
      await this.$store.dispatch("coupon/myCoupon", this.$auth.user.custId);
    }

    await this.$store.dispatch('coupon/fetchCoupon')

    const view = {
      catalog: this.$route.query.p,
      customer: this.isLoggedIn ? this.$auth.user._id : null,
    };

    await this.$store.dispatch("count-view/createView", view);

    const getReview = {
      id: this.$route.query.p,
      reviewPage: this.reviewPage,
    };
    await this.$store.dispatch("product/showReview", getReview);

    const getQuestion = {
      id: this.$route.query.p,
      questionPage: this.questionPage,
    };
    await this.$store.dispatch("product/showQuestion", getQuestion);

    const getProduct = await this.$store.dispatch(
      "product/getProduct",
      this.$route.query.p
    );
    this.product = JSON.parse(JSON.stringify(getProduct));

    this.meta.title =
      this.$i18n.locale === "th"
        ? this.product.itemDescription
        : this.product.itemDescription;
    this.meta.hid =
      this.$i18n.locale === "th"
        ? this.product.itemDescription
        : this.product.itemDescription;
    this.meta.name =
      this.$i18n.locale === "th"
        ? this.product.itemDescription
        : this.product.itemDescription;
    this.meta.content =
      this.$i18n.locale === "th"
        ? this.product.itemDescription
        : this.product.itemDescription;

    // const getPromotionDiscount = await this.$store.dispatch(
    //   "promotion/getPromotionDiscount",
    //   this.product.options.attributes[0].product._id
    // );
    // this.promotion_discount = JSON.parse(JSON.stringify(getPromotionDiscount)).data;

    // if(Object.keys(this.promotion_discount).length > 0){
    //   var fDate = Date.parse(this.promotion_discount[0].startDate);
    //   var lDate = Date.parse(this.promotion_discount[0].endDate);
    //   var cDate = Date.parse(new Date());

    //   if((cDate <= lDate && cDate >= fDate)) {
    //     this.have_discount = true;
    //     this.discount_price = this.product.options.attributes[0].product.unitPrice;
    //   }else{
    //     this.product.price;
    //   }
    // }

    const random = await this.$store.dispatch(
      "product/randomProduct",
      this.product.listCategory[0].itemCategory._id
    );
    this.random = JSON.parse(JSON.stringify(random));

    if (this.product.brand) {
      const brand = await this.$store.dispatch(
        "brand/getBrand",
        this.product.brand
      );
      this.brand = JSON.parse(JSON.stringify(brand));
    }

    await this.countStar();

    this.oldImage = this.product.images[0];
  },
  async beforeCreate() {
    this.flashSales = await this.$store.dispatch("flash-sale/fetchFlashSale");
  },
  async created() {
    this.isLoggedIn = this.$auth.loggedIn;
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      await this.$store.dispatch("coupon/myCoupon", this.$auth.user.custId);
    }

    const view = {
      catalog: this.$route.query.p,
      customer: this.isLoggedIn ? this.$auth.user._id : null,
    };

    await this.$store.dispatch("count-view/createView", view);

    const getReview = {
      id: this.$route.query.p,
      reviewPage: this.reviewPage,
    };
    await this.$store.dispatch("product/showReview", getReview);

    const getQuestion = {
      id: this.$route.query.p,
      questionPage: this.questionPage,
    };
    await this.$store.dispatch("product/showQuestion", getQuestion);

    const getProduct = await this.$store.dispatch(
      "product/getProduct",
      this.$route.query.p
    );
    this.product = JSON.parse(JSON.stringify(getProduct));

    const random = await this.$store.dispatch(
      "product/randomProduct",
      this.product.listCategory[0].itemCategory._id
    );
    this.random = JSON.parse(JSON.stringify(random));

    if (this.product.brand) {
      const brand = await this.$store.dispatch(
        "brand/getBrand",
        this.product.brand
      );
      this.brand = JSON.parse(JSON.stringify(brand));
    }

    await this.countStar();

    this.oldImage = this.product.images[0];

    this.flashSales.map((flashSale) => {
      // const indexProduct = flashSale.products.findIndex(
      //   (single) => single.product._id === this.product._id
      // );

      var indexProduct = -1;
      var checkMinPrice = 0;
      flashSale.products.map((flashCat, index) => {
        if (flashCat.catalogs[0]?._id === this.product._id) {
          if (checkMinPrice == 0 || checkMinPrice > flashCat.discount) {
            this.checker = flashCat;

            indexProduct = index;

            checkMinPrice = flashCat.discount;

            this.flash_sale_price = flashCat.discount;
            this.flash_sale_min = flashCat.discount;
          }

          if (
            this.flash_sale_max == 0 ||
            this.flash_sale_max < flashCat.discount
          ) {
            this.flash_sale_max = flashCat.discount;
          }
        }
      });

      if (indexProduct > -1) {
        const nowDate = new Date();
        if (
          nowDate > new Date(flashSale.startDate) &&
          nowDate < new Date(flashSale.endDate)
        ) {
          this.flashSale.endDate = flashSale.endDate;
          this.flashSale.status = true;
          this.flashSale.sale = flashSale.products[indexProduct].sale;
          this.flashSale.quantity = flashSale.products[indexProduct].quantity;
          this.flashSale.discount = flashSale.products[indexProduct].discount;
          this.flashSale.id = flashSale._id;
          return 0;
        } else if (
          nowDate < new Date(flashSale.startDate) &&
          nowDate > new Date(flashSale.endDate)
        ) {
          this.flashSale.status = false;
          this.flashSale.prepare = true;
          this.flashSale.startDate = flashSale.startDate;
        }
      }
    });

    this.flashSale.percent =
      (this.flashSale.sale * 100) / this.flashSale.quantity;
    if (this.flashSale.status) {
      setInterval(() => {
        this.startTimer(this.flashSale.endDate);
      }, 1000);
    }
    if (this.flashSale.prepare) {
      setInterval(() => {
        this.startTimer(this.flashSale.startDate);
      }, 1000);
    }

    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });

    if (this.isLoggedIn) {
      this.favorites = JSON.parse(JSON.stringify(this.$auth.user.favorites));
      const index = this.favorites.findIndex(
        (item) => item?._id === this.product._id
      );
      if (index !== -1) {
        this.like = true;
      }
    }

    const detail = this.product?.options?.attributes[0];

    this.product?.options?.attributes.map((prodVal, index) => {
      // var prodData = Object(prodVal.product);
      if (index <= 0) {
        this.price_min = prodVal.price;

        // if (prodData.length > 0) {
        if (prodVal?.product?.discountType == "bath") {
          const productDiscStart = detail?.product?.discountStartDate;
          const productDiscEnd = detail?.product?.discountEndDate;
          if (new Date() >= new Date(productDiscStart) && new Date() < new Date(productDiscEnd)) {
            this.discount_min =
              prodVal?.product.unitPrice - prodVal?.product.discountValue;
            this.discount_max =
              prodVal?.product.unitPrice - prodVal?.product.discountValue;
          }else{
            this.discount_min = prodVal?.product.unitPrice;
            this.discount_max = prodVal?.product.unitPrice;
          }
        }
        // }
      } else {
        if (this.price_min > prodVal.price) {
          this.price_min = prodVal.price;
        }

        if (this.price_max < prodVal.price) {
          this.price_max = prodVal.price;
        }

        this.selectOption.startDate = detail?.product?.discountStartDate;
        this.selectOption.endDate = detail?.product?.discountEndDate;
        this.selectOption.id = detail?.product._id;

        if (this.flashSale) {
          this.selectOption.point = 0;
        } else {
          this.selectOption.point = Math.floor(
            (this.selectOption.price - this.selectOption.discount) / 100
          );
        }

        // this.checkButtonShopNow();
      }
    });

    if (detail?.product) {
      const productDiscStart = detail?.product?.discountStartDate;
      const productDiscEnd = detail?.product?.discountEndDate;

      this.selectOption.price = detail.price;

      if (this.flashSale.status) {
        this.selectOption.discount = 0;
      } else if (
        this.brand &&
        new Date() >= new Date(this.brand.promotion.startDate) &&
        new Date() < new Date(this.brand.promotion.endDate)
      ) {
        if (this.brand.promotion.type === "percent") {
          this.selectOption.discount =
            this.selectOption.price * (this.brand.promotion.discount / 100) ||
            0;
        } else {
          this.selectOption.discount = this.brand.promotion.discount || 0;
        }
      } else if (
        new Date() >= new Date(productDiscStart) &&
        new Date() < new Date(productDiscEnd)
      ) {
        if (detail.product?.discountType === "percent") {
          this.selectOption.discount =
            this.selectOption.price * (detail.product.discountValue / 100) || 0;
        } else {
          this.selectOption.discount = detail.product.discountValue || 0;
        }
      }

      this.selectOption.name = this.product.options.name;
      this.selectOption.name_en = this.product.options.name_en != undefined ? this.product.options.name_en : this.product.options.name;
      this.selectOption.attribute = "";
      this.selectOption.itemNo = detail.itemNo;

      this.selectOption.startDate = detail.product?.discountStartDate;
      this.selectOption.endDate = detail.product?.discountEndDate;
      this.selectOption.id = detail.product?._id;

      if (this.flash_sale_max) {
        this.selectOption.point = Math.floor(this.flash_sale_max / 100);
      } else if (this.selectOption.discount) {
        this.selectOption.point = Math.floor(
          (this.selectOption.price - this.selectOption.discount) / 100
        );
      } else {
        this.selectOption.point = Math.floor(this.product.unitPrice / 100);
      }

      // this.checkButtonShopNow();
    }
  },
  methods: {
    checkCouponBrand(brandId, productId) {
      var checkBrand = false;

      if(brandId != undefined && brandId != null){
        this.couponList.map((item) => {
          if(item.brands.length > 0){
            item.brands.map((subItem) => {
              // console.log(subItem);
              if(subItem._id === brandId){
                checkBrand = true;
              }
            })
          }else if (item.excludeBrands.indexOf(brandId) !== 0 ){
            checkBrand = true;
          }
        })

        // console.log(brandId);
        // console.log(checkBrand);
      }


      return checkBrand;
    },
    shareFacebook() {
      const id = this.product._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
      // const url = `https://www.facebook.com/dialog/share?app_id=${appId}&href=${encodeURIComponent(`https://www.munkongonline.com/product/detail?p=${id}&openExternalBrowser=1`)}`;
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(
            `${window.location.origin}/product/detail?p=${id}&openExternalBrowser=1`
          )
      );
    },
    shareTwitter() {
      const id = this.product._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
      const url = `${window.location.origin}/product/detail?p=${id}&openExternalBrowser=1`;

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
      const id = this.product._id;
      const url = `${window.location.origin}/product/detail?p=${id}&openExternalBrowser=1`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const id = this.product._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
      const url = `${window.location.origin}/product/detail?p=${id}`;

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
    checkIsMyCoupon(id) {
      const index = this.myCoupons.findIndex(item => item.coupon._id == id)
      if (index !== -1) {
        return true
      } else {
        return false
      }
    },
    async checkButtonShopNow() {
      if (this.isShowRequireOption) {
        this.statusShopNow =
          this.selectOption.subValue !== "" && this.selectOption.subName !== "";
      } else this.statusShopNow = this.selectOption.name !== "";

      if(this.preOrderStatus == true && this.stockLimit > 0){
        this.stockStatus = true;
        this.statusShopNow = true;
      }else{
        await this.checkStock(this.selectOption.itemNo);
        if (this.outOfStockId.length !== 0) {
          this.stockStatus = false;
          this.statusShopNow = false;
        } else {
          this.stockStatus = true;
        }
      }
    },
    addQuestion(question) {
      this.$store.commit("product/ADD_QUESTION", question);
    },
    showFAQModal() {
      $("#FAQModal").appendTo("body").modal("show");
    },
    startTimer(dateTime) {
      const end = new Date(dateTime) / 1000;
      const now = new Date() / 1000;
      const timeLeft = end - now;

      let days = Math.floor(timeLeft / 86400);
      let hours = Math.floor((timeLeft - days * 86400) / 3600);
      let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
      let seconds = Math.floor(
        timeLeft - days * 86400 - hours * 3600 - minutes * 60
      );

      if (days < "10") {
        days = "0" + days;
      }
      if (hours < "10") {
        hours = "0" + hours;
      }
      if (minutes < "10") {
        minutes = "0" + minutes;
      }
      if (seconds < "10") {
        seconds = "0" + seconds;
      }

      this.$refs.flashDays.innerHTML = days;
      this.$refs.flashHours.innerHTML = hours;
      this.$refs.flashMin.innerHTML = minutes;
      this.$refs.flashSec.innerHTML = seconds;
    },
    countStar() {
      for (let i = 0; i < this.rating?.length; i++) {
        this.rating[i] = this.review.data.filter(
          (item) => item.star >= i + 1 && item.star < i + 2
        )?.length;
      }
    },
    async favorite(id) {
      if (this.isLoggedIn) {
        let favorites = [];
        this.favorites.map((item) => {
          favorites.push(item?._id);
        });

        const index = favorites.findIndex((item) => item === id);

        if (index !== -1) {
          favorites.splice(index, 1);
        } else {
          favorites.push(id);
        }

        const userData = JSON.parse(JSON.stringify(this.$auth.user));
        userData.favorites = favorites;
        const result = await this.$store.dispatch(
          "customer/updateProfile",
          userData
        );
      } else {
        window.location.href = "/auth/sign-in";
      }
    },
    manageAmount(type) {
      if (type === "-") {
        if (this.selectOption.amount >= 1) {
          this.selectOption.amount -= 1;
        } else {
          this.selectOption.amount = 1;
        }

      } else {
        if (this.selectOption.amount < 5) {
          this.selectOption.amount += 1;
        }

      }
    },
    toggleOption() {
      this.isSelectOption =
        this.prevOption === "" ||
        this.prevOption !==
          this.selectOption.attribute + this.selectOption.subValue;

      if (!this.isSelectOption && !this.isNotToggle) {
        this.product.images[0] = this.oldImage;
        this.selectOption = {
          id: "",
          flashSale: null,
          name: "",
          attribute: "",
          subName: "",
          subValue: "",
          itemNo: "",
          price: "",
          discount: this.selectOption.discount,
          startDate: "",
          endDate: "",
          amount: 1,
          point: 0,
        };
      }
    },
    chooseOption(index, optionName) {
      this.productDetail = this.product?.options?.attributes[index];

      this.product?.options?.attributes.map((prodVal, index) => {
        // var prodData = Object(prodVal.product);
        if (index <= 0) {
          this.price_min = prodVal.price;

          // if (prodData.length > 0) {
          if (prodVal?.product?.discountType == "bath") {
            const productDiscStart = this.productDetail?.product?.discountStartDate;
            const productDiscEnd = this.productDetail?.product?.discountEndDate;
            if (new Date() >= new Date(productDiscStart) && new Date() < new Date(productDiscEnd)) {
              this.discount_min =
                prodVal?.product.unitPrice - prodVal?.product.discountValue;
              this.discount_max =
                prodVal?.product.unitPrice - prodVal?.product.discountValue;
            }else{
              this.discount_min = prodVal?.product.unitPrice;
              this.discount_max = prodVal?.product.unitPrice;
            }
          }
          // }
        } else {
          if (this.price_min > prodVal.price) {
            this.price_min = prodVal.price;
          }

          if (this.price_max < prodVal.price) {
            this.price_max = prodVal.price;
          }

          this.selectOption.startDate = this.productDetail?.product?.discountStartDate;
          this.selectOption.endDate = this.productDetail?.product?.discountEndDate;
          this.selectOption.id = this.productDetail?.product._id;

          if (this.flashSale) {
            this.selectOption.point = 0;
          } else {
            this.selectOption.point = Math.floor(
              (this.selectOption.price - this.selectOption.discount) / 100
            );
          }

          // this.checkButtonShopNow();
        }
      });

      this.selectOption.amount = 1;
      const detail = this.product.options?.attributes[index];
      this.prevOption =
        this.selectOption.attribute + this.selectOption.subValue;
      if (detail.product) {
        this.preOrderStatus = detail.product.preOrderStatus;

        if (detail.product.preOrderStatus) {
          this.stockLimit = detail.product.preOrderStock < 5 ? detail.product.preOrderStock : 5;
        } else {
          this.stockLimit = 0;
        }

        if (detail.subAttribute.subValues?.length > 0) {
          this.isShowRequireOption = true;
          this.listRequire =
            this.product.options?.attributes[index].subAttribute;
          this.selectOption.name = optionName;
          this.selectOption.attribute = detail.name;

          this.selectOption.subName = "";
          this.selectOption.subValue = "";
        } else {
          const productDiscStart = detail.product?.discountStartDate;
          const productDiscEnd = detail.product?.discountEndDate;

          this.selectOption.price = detail.price;
          this.selectOption.specialShipmentCost =
            detail.product?.specialShipmentCost;
          this.selectOption.typeShipping = detail.product?.typeShipping;

          if (this.flashSale.status) {
            // this.selectOption.discount = this.selectOption.price * (this.flashSale.discount);

            this.flash_sale_min = 0;
            this.flash_sale_max = 0;
            var indexProduct = -1;
            var checkMinPrice = 0;
            var prodID = "";
            this.flashSales.map((flashSale) => {
              flashSale.products.map((flashCat, index) => {
                if (flashCat.product._id === detail.product?._id) {
                  if (
                    this.flash_sale_min == 0 ||
                    this.flash_sale_min > flashCat.discount
                  ) {
                    indexProduct = index;
                    checkMinPrice = flashCat.discount;
                    this.flash_sale_price = flashCat.discount;
                  }

                  if (
                    this.flash_sale_min == 0 ||
                    this.flash_sale_min > flashCat.discount
                  ) {
                    this.flash_sale_min = flashCat.discount;
                    this.flash_sale_max = flashCat.discount;
                  }
                }
              });
            });

            if (this.flash_sale_min == 0) {
              if (
                new Date() >= new Date(productDiscStart) &&
                new Date() < new Date(productDiscEnd)
              ) {
                this.flash_sale_min = detail.product.unitPrice - detail.product.discountValue;
                this.flash_sale_max = detail.product.unitPrice - detail.product.discountValue;
              }else{
                this.flash_sale_min = detail.product.unitPrice;
                this.flash_sale_max = detail.product.unitPrice;
              }
            }
          } else if (
            this.brand &&
            new Date() >= new Date(this.brand.promotion.startDate) &&
            new Date() < new Date(this.brand.promotion.endDate)
          ) {
            if (this.brand.promotion.type === "percent") {
              this.selectOption.discount =
                this.selectOption.price *
                  (this.brand.promotion.discount / 100) || 0;
            } else {
              this.selectOption.discount = this.brand.promotion.discount || 0;
            }
          } else if (
            new Date() >= new Date(productDiscStart) &&
            new Date() < new Date(productDiscEnd)
          ) {
            if (detail.product?.discountType === "percent") {
              this.selectOption.discount =
                this.selectOption.price *
                  (detail.product.discountValue / 100) || 0;
            } else {
              this.selectOption.discount = detail.product.discountValue || 0;
            }

            this.have_discount = true;
          } else {
            this.have_discount = false;
            this.selectOption.discount = 0;
          }
          this.discount_price = detail.product.unitPrice;

          this.selectOption.name = optionName;
          this.selectOption.attribute = detail.name;
          this.selectOption.itemNo = detail.itemNo;

          this.selectOption.startDate = detail.product?.discountStartDate;
          this.selectOption.endDate = detail.product?.discountEndDate;
          this.selectOption.id = detail.product?._id;
        }

        this.product.images[0] = detail.image;
        this.toggleOption();
        this.checkButtonShopNow();

        if (this.statusShopNow) {
          this.price_min = detail.product.unitPrice;
          this.price_max = detail.product.unitPrice;

          if (this.flash_sale_min) {
            this.selectOption.point = Math.floor(this.flash_sale_min / 100);
          } else if (this.selectOption.discount) {
            if(this.isSelectOption == true){
              this.selectOption.point = Math.floor(
                (this.selectOption.price - this.selectOption.discount) / 100
              );
            }else{
              this.selectOption.point = Math.floor((this.price_max - this.selectOption.discount) / 100);
            }
          } else {
            this.selectOption.point = Math.floor(this.price_min / 100);
          }
        } else {
          this.product.options?.attributes.map((prodVal, index) => {
            this.flashSales.map((flashSale) => {
              var indexProduct = -1;
              var checkMinPrice = 0;
              flashSale.products.map((flashCat, index) => {
                if (flashCat.catalogs[0]?._id === this.product?._id) {
                  if (checkMinPrice == 0 || checkMinPrice > flashCat.discount) {
                    indexProduct = index;
                    checkMinPrice = flashCat.discount;
                    this.flash_sale_price = flashCat.discount;
                    this.flash_sale_min = flashCat.discount;
                  }

                  if (
                    this.flash_sale_max == 0 ||
                    this.flash_sale_max < flashCat.discount
                  ) {
                    this.flash_sale_max = flashCat.discount;
                  }
                }
              });

              if (indexProduct > -1) {
                const nowDate = new Date();
                if (
                  nowDate > new Date(flashSale.startDate) &&
                  nowDate < new Date(flashSale.endDate)
                ) {
                  this.flashSale.endDate = flashSale.endDate;
                  this.flashSale.status = true;
                  this.flashSale.sale = flashSale.products[indexProduct].sale;
                  this.flashSale.quantity =
                    flashSale.products[indexProduct].quantity;
                  this.flashSale.discount =
                    flashSale.products[indexProduct].discount;
                  this.flashSale.id = flashSale?._id;
                  return 0;
                } else if (
                  nowDate < new Date(flashSale.startDate) &&
                  nowDate < new Date(flashSale.endDate)
                ) {
                  this.flashSale.prepare = true;
                  this.flashSale.startDate = flashSale.startDate;
                }
              }
            });

            if (this.price_min > prodVal.price) {
              this.price_min = prodVal.price;
            }

            if (this.price_max < prodVal.price) {
              this.price_max = prodVal.price;
            }
          });

          if (this.flash_sale_max) {
            this.selectOption.point = Math.floor(this.flash_sale_max / 100);
          } else if (this.selectOption.discount) {
            this.selectOption.point = Math.floor(
              (this.product.unitPrice - this.selectOption.discount) / 100
            );
          } else {
            if (this.selectOption.discount) {
              (this.selectOption.price - this.selectOption.discount) / 100;
            } else {
              this.selectOption.point = Math.floor(
                this.product.unitPrice / 100
              );
            }
          }
        }

        if(this.flashSale.status){
          this.flashSaleStatus = true;
        }

        this.selectOption.flashSaleStatus = this.flashSaleStatus;

        // console.log(this.productDetail);
        // console.log(this.discount_min);
        // console.log(this.price_min);
        // console.log(this.price_max);
        // console.log(this.have_discount);
        console.log(detail);
        console.log(this.selectOption.discount)
        console.log(this.flashSale.status)
        console.log(this.flash_sale_min)
        console.log(this.flash_sale_max)
      }

      if(this.isSelectOption == false){
        this.statusShopNow = false;
        this.stockStatus = true;
      }
    },
    chooseRequireOption(index) {
      this.prevOption =
        this.selectOption.attribute + this.selectOption.subValue;

      this.selectOption.subName = this.listRequire.name;
      const detail = this.listRequire.subValues[index];

      const productDiscStart = detail.product?.discountStartDate;
      const productDiscEnd = detail.product?.discountEndDate;

      this.selectOption.price = detail.price;

      if (this.flashSale.status) {
        this.selectOption.discount = 0;
      } else if (
        this.brand &&
        new Date() >= new Date(this.brand.promotion.startDate) &&
        new Date() < new Date(this.brand.promotion.endDate)
      ) {
        this.selectOption.discount =
          this.selectOption.price * (this.brand.promotion.discount / 100) || 0;
      } else if (
        new Date() >= new Date(productDiscStart) &&
        new Date() < new Date(productDiscEnd)
      ) {
        if (detail.product?.discountType === "percent") {
          this.selectOption.discount =
            this.selectOption.price * (detail.product.discountValue / 100) || 0;
        } else {
          this.selectOption.discount = detail.product.discountValue || 0;
        }
      } else {
        this.selectOption.discount = 0;
      }

      this.selectOption.itemNo = detail.itemNo;
      this.selectOption.subValue = detail.name;

      this.selectOption.startDate = detail.product?.discountStartDate;
      this.selectOption.endDate = detail.product?.discountEndDate;
      this.selectOption.id = detail.product?._id;

      this.selectOption.point = Math.floor(
        (this.selectOption.price - this.selectOption.discount) / 100
      );

      this.toggleOption();
      this.checkButtonShopNow();
    },

    addItem(type) {
      const product = {
        isCheck: true,
        canInstallment: this.product.isInstallment,
        image: this.product.images[0],
        point: this.selectOption.point,
        price: this.flashSaleStatus == true ? this.flash_sale_min : this.selectOption.price,
        brand: this.product.brand,
        flashSale: this.flashSale.id,
        listCategory: [],
        // discount: this.flashSale.products.discount,
        name: this.product.itemDescription,
        amount: this.selectOption.amount,
        option: this.selectOption,
        _id: this.product._id,
        stockLimit: this.stockLimit,
        preOrderStatus: this.preOrderStatus,
        flashSaleStatus: this.flashSaleStatus
        // specialShipmentCost: this.product.options?.attributes.map(produc=> produc.product?.specialShipmentCost)
      };

      this.product.listCategory.map((item) => {
        product.listCategory.push(item.itemCategory._id);
      });

      this.$store.commit(
        "cart/ADD_TO_CART",
        JSON.parse(JSON.stringify(product))
      );

      const createCart = {
        catalog: this.product._id,
        amount: this.selectOption.amount,
        // discount: this.selectOption.discount
      };

      this.$store.dispatch("cart/createCart", createCart);

      this.$gtm.push({ event: 'add_to_cart' })

      if (type !== "shopNow") {
        $("#successModal").appendTo("body").modal("show");
        setInterval(() => {
          $("#successModal").modal("hide");
        }, 3000);
      }

      if (type === "shopNow") {
        window.location.href = "/cart";
      }else{
        this.beforeAmount = this.beforeAmount + this.selectOption.amount;

        if(this.beforeAmount >= this.stockLimit || this.beforeAmount >= 5){
          this.statusShopNow = false;
        }

        this.selectOption.amount = 1;
      }
    },
    async checkStock(checkItemNo) {
      // Check Amount Before Cart
      if (this.cart.items.length) {
        const beAmount = this.cart.items.map((item) => {
          if(item["option"].itemNo == checkItemNo){
            this.beforeAmount = item['amount'];
          }else{
            this.beforeAmount = 0;
          }
        });
      }else{
        this.beforeAmount = 0
      }

      // const checkItemNo = this.cart.items.map((item) => item.option.itemNo);
      try {
        const response = await this.$axios.$post(
          "https://oms.hili.asia/api/wms.dev.get_stock?app_key=5f8e1e8f-6606-46e2-bb60-a820819930d4&custkey=c4f2e654-da53-4832-bc99-fd096bd8f530",
          {
            DATA: {
              Product_Code: [checkItemNo],
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.outOfStockId = response["RESULT"]
          .filter(
            (item) =>
              item["Error_Description"] &&
              (item["Error_Description"] === "OUT OF STOCK" ||
                item["Error_Description"] === "NOT FOUND PRODUCT")
          )
          .map((item) => item["Product_Code"]);

        if(this.outOfStockId.length <= 0){
          const stock = response['RESULT']
                .filter(
                  (item) => item["Balance_Qty"]
                )
                .map((item) => item["Balance_Qty"]);

          this.stockLimit = stock.length > 0 ? stock[0] : 0;
          this.stockLimit = this.stockLimit > 5 ? 5 : stock[0];

        }else{
          this.stockLimit = 0
        }

        if(this.beforeAmount >= this.stockLimit || this.beforeAmount >= 5){
          this.statusShopNow = false;
        }

      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import "./css/dropdownCoupon.css";

.card-coupon {
  display: flex;
  margin: 0 0 20px;
  cursor: pointer;
}

.card-coupon .card-percent {
  width: 110px;
  height: 110px;
}

.card-coupon .card-body {
  height: 110px;
}
.card-coupon .btn.keep{
  top:50%;
  width:auto;
  min-width:65px;
  margin-top:-14px;
  font-size:14px;
  border-radius:50px;
  height: 32px;
  line-height: 30px;
}
.card-coupon .btn.keep > span:nth-child(2){display:none}
.card-coupon p.f-16{
  line-height:1.1;
}
.card-coupon .card-percent,
.card-coupon .card-body{
  height:120px;
  display:flex
}
.card-coupon .card-body{
 align-items: center;
}

.card-coupon .codeisout-text-lineheight{ line-height:1.1;}

.codeisout-text-lineheight {
  padding-top: 5px;
  line-height: 0.5rem;
}

.btn.keep-coupon:before {
  right: 7px !important;
}

.btn.keep-coupon:after {
  right: 7px !important;
}

.dropdown-menu.coupon .scroll-inner{
  max-height:412px
}

@media (min-width: 768px) and (max-width: 1133px) {
  .dropdown-menu.coupon[data-v-0e9671aa] {
    width: 465px;
  }
  .card-coupon{width:100%}
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .dropdown-menu.coupon{
    right:0;
    left:auto;
  }

}

@media (max-width: 767px) {
  .section-blog .container-inner {
    padding: 0px;
  }

  .mobile-line-height {
    line-height: 0.5rem;
  }
  .card-coupon{width:100%}

  .card-coupon .card-percent{
   width: 100px;
    min-height: 100px;
    height:auto;
  }
  .card-coupon .card-body{
    min-height: 100px;
    height:auto;
  }

  .codeisout-text-lineheight {
    padding-top: 10px;
    line-height: 0.8rem;
    font-size: 18px;
  }

  .card-coupon .codeisout .btn.keep span {
    font-size: 14px;
  }


  .codeisout-text-11 {
    font-size: 11px;
  }

 .codeisout-text-lineheight.fs-20{
     padding-top:5px;
  }
  .card-coupon .btn.keep{
      font-size: 13px;
      height: 28px;
      line-height: 26px;
  }
}
</style>
