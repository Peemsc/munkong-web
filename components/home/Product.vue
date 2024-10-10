<template>
  <div class="card-product" :class="flashSale ? 'card-flash-sale' : ''" v-if="product?.images" v-lazy-container="{ selector: 'img' }">

    <a class="card-photo" :href="'/product/detail?p=' + product?._id" ref="gotoProduct">
      <div class="photo" v-lazy:background-image="product?.images[0].replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + '?tr=w-300'">
        <img data-src="/img/thumb/frame-100x100.png" alt="">
      </div>
      <span class="discound" v-show="maxValue !== null && maxValue !== 0">
        <span>{{ $t('shortDiscount') }}</span>
        <span v-if="maxValue > minPrice"> {{ ((maxValue - minPrice) / maxValue * 100) | numFormat }}%</span>
        <span v-if="maxValue < minPrice"> {{ ((minPrice - maxValue) / minPrice * 100) | numFormat }}%</span>
        <!-- <span>{{ maxValue }}%</span> -->
        <!--        <span v-if="discountType === 'baht'">~</span>-->
      </span>
    </a>
    <div class="card-body">
      <h3 style="cursor: pointer" :data-title="product.itemDescription">
        <a :href="'/product/detail?p=' + product?._id">{{ product.itemDescription }}</a>
      </h3>

      <div class="price-wrap" v-show="maxValue !== null && maxValue !== 0">
        <span class="price">฿{{ maxValue | numFormat }}</span>
        <span class="price-old d-md-inline-block  d-none">฿{{ minPrice | numFormat }}</span>
        <span class="price-old d-lg-none d-md-none d-block">฿{{ minPrice | numFormat }}</span>
        <!-- <span class="price" v-if="discountType !== 'percent'">
            ฿{{ maxPrice - discountValue | numFormat }}
          </span>
          <span class="price" v-if="discountType === 'percent'">
            ฿{{ maxPrice - (maxPrice*(maxValue/100)) | numFormat }}
          </span>
          <span class="price-old">฿{{ maxPrice | numFormat }}</span> -->
      </div>

      <div class="price-wrap" v-show="maxValue === null || maxValue === 0">
        <span class="price">฿{{ minPrice | numFormat }}</span>
        <span v-if="have_discount == true" class="price-old" >
          ฿{{ maxPrice | numFormat }}
        </span>
      </div>

      <div class="buttons">
        <div class="additional-option align-items-center" v-if="minPrice > setting?.shipmentFee">
          <img data-src="/img/icons/icon-free-ship.png" height="60%" alt="free ship" />
          <span class="ml-1">ฟรี</span>
        </div>

        <div class="additional-option align-items-center" v-if="minPrice >= 3000">
          <img data-src="/img/icons/icon-discount.png" width="12px" alt="discount" />
          <span class="ml-1">0%</span>
        </div>
        <div class=" align-items-center" v-if="minPrice < 3000">
          <span class="ml-1"> &nbsp;</span>
        </div>
      </div>
    </div><!--card-body-->
    <!-- <ModalBuyConfirm ref="modal" :key="product?._id + product.createdAt" :productId="product?._id" /> -->
  </div><!--card-product-->



  <!-- New Flash Sale -->
  <div class="card-product" :class="flashSale ? 'card-flash-sale' : ''" v-else-if="product.catalogs">
    <a class="card-photo" :href="'/product/detail?p=' + product.catalogs[0]?._id" ref="gotoProduct">
      <div class="photo" :style="{ backgroundImage: 'url(' + product.catalogs[0]?.images[0].replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + '?tr=w-300)' }">
        <img src="/img/thumb/frame-100x100.png" alt="">
      </div>
      <span class="discound">
            <span>{{ $t('shortDiscount') }}</span>
            <span>{{ ( (product.product.unitPrice - product.discount) / product.product.unitPrice * 100) | numFormat }}%</span>
          </span>

    </a>
    <div class="card-body">
      <h3 style="cursor: pointer">
        <a :href="'/product/detail?p=' + product.catalogs[0]?._id">{{ product.catalogs[0]?.itemDescription }}</a>
      </h3>

      <!-- <div class="price-wrap" v-show="product.discountValue != null || product.discountValue != 0 ">
        <span class="price">฿{{ minPrice - Number(product.discountValue) | numFormat }}</span>
        <span class="price-old d-md-inline-block  d-none">฿{{ product.discountValue | numFormat }}</span>
        <span class="price-old d-lg-none d-md-none d-block">฿{{ minPrice | numFormat }}</span>
      </div> -->

      <div class="price-wrap">
        <span class="price">฿{{product.discount | numFormat }}</span>
        <span class="price-old ">฿{{ product.product.unitPrice | numFormat }}</span>
      </div>

      <div class="buttons">
        <div class="additional-option align-items-center" v-if="product.discount > 500">
          <img src="../../assets/img/icons/icon-free-ship.png" height="60%" alt="Free ship" />
          <span class="ml-1">ฟรี</span>
        </div>

        <div class="additional-option align-items-center" v-if="product.discount >= 3000">
          <img src="../../assets/img/icons/icon-discount.png" width="12px" alt="discont" />
          <span class="ml-1">0%</span>
        </div>
        <!-- <div class="align-items-center" v-if="product.discount < 3000">
          <span class="ml-1">0%</span>
        </div> -->
      </div>
    </div><!--card-body-->
    <!-- <ModalBuyConfirm ref="modal" :key="product?._id + product.createdAt" :productId="product?._id" /> -->
  </div><!--card-product-->
</template>

<script>
import ModalBuyConfirm from "@/components/modal/ModalBuyConfirm";
export default {
  components: { ModalBuyConfirm },
  props: {
    product: { type: Object },
    bundle: { type: Boolean, default: false },
    flashSale: { type: Boolean, default: false }
  },
  data() {
    return {
      maxPrice: null,
      have_discount: false,
      maxValue: null, //ส่วนลด เช่น 20%, 30%
      minPrice: null,
      discountType: "baht",
      discountValue: 0,
      isLike: false,
      isLoggedIn: false,
      favorites: [],
    }
  },
  fetch() {
    this.$store.dispatch("flash-sale/fetchFlashSale")
  },
  methods: {
    shopNow() {
      if (!this.bundle) {
        this.$store.commit('product/SELECT_PRODUCT_MODAL', this.product?._id)
        if (this.isLoggedIn) {
          if (this.flashSales) {
            window.location.href = `/product/detail?p=${this.product.catalogs[0]?._id}`
          } else {
            window.location.href = `/product/detail?p=${this.product?._id}`
          }

        } else {
          $('#buyConfirmModal').appendTo("body").modal('show');
        }
      }

    },
    async favorite(id) {
      if (this.isLoggedIn) {
        this.isLike = !this.isLike
        let favorites = []
        this.favorites.map(item => {
          favorites.push(item?._id)
        })

        const index = favorites.findIndex(item => item === id)
        if (index !== -1) {
          favorites.splice(index, 1)
        } else {
          favorites.push(id)
        }

        const userData = JSON.parse(JSON.stringify(this.$auth.user))
        userData.favorites = favorites
        const result = await this.$store.dispatch('customer/updateProfile', userData)
        if (result.status && index !== -1) {
          this.$emit('removeFavorite', index)
        }
      } else {
        //show alert login
        window.location.href = '/auth/sign-in'
      }
    },
  },
  computed: {
    flashSales() {
      return this.$store.getters['flash-sale/filterFlashSale']
    },
    setting() {
      return this.$store.state.setting.setting
    },
  },
  mounted() {
    this.isLoggedIn = this.$auth.loggedIn

    if (this.bundle) {
      this.$refs.gotoProduct.removeAttribute('href')
    }

    if (this.isLoggedIn) {
      this.favorites = JSON.parse(JSON.stringify(this.$auth.user.favorites))
      if (this.favorites.length > 0) {
        const index = this.favorites.findIndex(item => item?._id === this.product._id)
        if (index !== -1) {
          this.isLike = true
        }
      }
    }
    this.minPrice = this.product.unitPrice
    this.maxPrice = this.product.unitPriceMax

    let index = -2;
    console.log(this.flashSales);
    if (this.flashSales.length > 0) {
      // index = this.flashSales[0].products.findIndex(single => single.product?._id === this.product?.options.attributes.product_id)
      index = -1;

      this.flashSales[0].products.findIndex((single, indexKey) => {
        if(this.product.options !== undefined && this.product.options !== null){
          this.product?.options.attributes?.map((prod) => {
            // console.log(prod.product);
            if(typeof prod.product == "string" || prod.product == null){
              if(prod.product === single.product?._id){
                index = indexKey;
              }
            }else{
              if(prod.product._id === single.product?._id){
                index = indexKey;
              }
            }
          })
        }

      })
    }

    if (index > -1) {
      this.maxValue = this.flashSales[0].products[index].discount
    } else if (this.product.brand !== null
      && this.product.brand?.promotion?.startDate
      && new Date() >= new Date(this.product.brand?.promotion?.startDate)
      && new Date() < new Date(this.product.brand?.promotion?.endDate)) {
      if (this.product.brand?.promotion.discount != 0
        && this.product.brand?.promotion?.type == 'percent'
      ) {
        this.discountType = 'percent'
        this.maxValue = this.product.brand?.promotion?.discount
      } else {
        this.maxValue = (this.product.brand?.promotion?.discount / this.maxPrice) * 100
        this.maxValue = Math.round(this.maxValue)
        this.discountValue = this.product.brand?.promotion?.discount
      }
    } else if (this.product.options) {
      const nowDate = new Date()

      this.product.options.attributes.map(item => {
        if (item.subAttribute.subValues.length === 0 && item.product !== null) {
          if (nowDate >= new Date(item.product.discountStartDate) && nowDate < new Date(item.product.discountEndDate)) {
            if ((item.product.discountType === 'percent' && item.product.discountValue > this.maxValue)
              || (item.product.discountType === 'percent' && this.maxValue === null)
              || (item.product.discountType === 'percent' && this.maxValue === 0)) {
              this.maxValue = item.product.discountValue
              this.discountType = 'percent'
            }
            if (item.product.discountType === 'baht') {
              this.maxValue = (item.product.discountValue / this.maxPrice) * 100
              this.maxValue = Math.round(this.maxValue)
              this.discountValue = item.product.discountValue
            }

            var newMinPrice = item.product.unitPrice - item.product.discountValue;
            this.have_discount = true;
            if(this.minPrice > newMinPrice){
              this.minPrice = newMinPrice
            }
          }
          else if (nowDate >= new Date(item.discountStartDate) && nowDate < new Date(item.discountEndDate)) {

            if ((item.discountType === 'percent' && item.discountValue > this.maxValue)
              || (item.discountType === 'percent' && this.maxValue === null)
              || (item.discountType === 'percent' && this.maxValue === 0)) {
              this.maxValue = item.discountValue
              this.discountType = 'percent'
            }
            if (item.discountType === 'baht') {
              this.maxValue = (item.discountValue / this.maxPrice) * 100
              this.maxValue = Math.round(this.maxValue)
              this.discountValue = item.discountValue
            }

            var newMinPrice = item.price - item.discountValue;
            this.have_discount = true;
            if(this.minPrice > newMinPrice){
              this.minPrice = newMinPrice
            }
          }
        }
        if (item.subAttribute.subValues.length > 0) {
          item.subAttribute.subValues.map(value => {
            if (value.product) {
              if (nowDate >= new Date(value.product.discountStartDate) && nowDate < new Date(value.product.discountEndDate)) {
                if ((value.product.discountType === 'percent' && value.product.discountValue > this.maxValue)
                  || (value.product.discountType === 'percent' && this.maxValue === null)
                  || (value.product.discountType === 'percent' && this.maxValue === 0)) {
                  this.maxValue = value.product.discountValue
                  this.discountType = 'percent'
                }
                if (value.product.discountType === 'baht') {
                  this.maxValue = (value.product.discountValue / this.maxPrice) * 100
                  this.maxValue = Math.round(this.maxValue)
                  this.discountValue = item.product.discountValue
                }
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .card-flash-sale {
    margin: 6px !important;
  }
@media (max-width: 887px) {
  .price-wrap {
    display: flex;
    position: relative;
  }

  .price-wrap .price-old {
    display: inline-flex;
    text-decoration: line-through;
    color: rgba(17, 17, 17, 0.5);
    font-size: 12px !important;
    /* font-size: var(--f-15); */
    padding-left: 5px;
    margin-bottom: auto;
    padding-top: 10px;
    font-weight: 400;
  }

  .price-wrap .price {
    font-size: 18px !important;
    /* font-size: var(--f-22); */
    color: #D0011B;
    color: var(--red-dark);
    display: inline-block;
    font-weight: 600;
  }
}
</style>
