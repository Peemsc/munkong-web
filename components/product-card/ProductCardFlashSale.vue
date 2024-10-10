<template>
    <div class="cols pr-0 pl-0" v-if="product.catalogs[0]">
      <div class="card-product">
        <!-- <a class="card-photo" @click="shopNow"> -->
          <a class="card-photo" :href="'/product/detail?p=' + product.catalogs[0]._id">
          <div class="photo" :style="{ backgroundImage: 'url(' + product.catalogs[0].images[0].replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + '?tr=w-300)' }">
            <img src="/img/thumb/frame-100x100.png" alt="">
          </div>
          <span class="discound">
            <span>{{ $t('shortDiscount') }}</span>
            <span>{{ ( (product.product.unitPrice - product.discount) / product.product.unitPrice * 100) | numFormat }}%</span>
          </span>
        </a>
          <div class="card-body">
            <h3><a :href="'/product/detail?p=' + product.catalogs[0]._id">{{ product.catalogs[0].itemDescription }}</a></h3>
            <div class="price-wrap">
              <span class="price">฿{{product.discount | numFormat }}</span>
              <span class="price-old ">฿{{ product.product.unitPrice | numFormat }}</span>
            </div>

            <!-- <div class="progress-box">
              <div class="progress">
                <div class="progress-bar" :style="{ width: percent + '%' }"></div>
              </div>

              <p class="sold" v-if="percent === 100">สินค้าหมดแล้ว</p>
              <p class="sold" v-else>{{ $t('sold') }} {{ product.sale }} {{ $t('piece') }}</p>

            </div> -->
            <!--progress-box-->

           <div class="d-flex justify-content-center">
            <div class="buttons">
              <button style="border-radius: 30px;" class="btn btn-red effect" @click="shopNow">
                <span>{{ $t('shopNow') }} <img class="pl-1 img-shake" src="../../assets/img/icons/thunder.svg" alt=""></span>
              </button>

              <!-- <button class="btn btn-bag ml-auto" type="button" @click="shopNow"></button>
              <button class="btn btn-like" type="button" :class="{'active': isLike}" @click="favorite(product._id)"></button> -->
            </div>
           </div>
          </div><!--card-body-->
      </div><!--card-product-->
      <ModalBuyConfirm ref="modal"/>
    </div>
</template>

<script>
import ModalBuyConfirm from "@/components/modal/ModalBuyConfirm";
export default {
  components: {ModalBuyConfirm},
  props: {
    product: {type: Object},
    flashSale: {type: String}
  },
  data () {
    return {
      loading: false,
      percent: 0,
      maxPrice: null,
      minPrice: null,
      isLike: false,
      isLoggedIn: false,
    }
  },
  beforeMount() {
    this.percent = (this.product.sale * 100)/this.product.quantity
  },
  methods: {
    shopNow () {
      this.$store.commit('product/SELECT_PRODUCT_MODAL', this.product.catalogs[0]._id)
      if (this.isLoggedIn) {
        window.location.href = `/product/detail?p=${this.product.catalogs[0]._id}`
      } else {
        $('#buyConfirmModal').appendTo("body").modal('show');
      }
    },
    async favorite (id) {
      if (this.isLoggedIn) {
        this.isLike = !this.isLike
        let favorites = []
        this.favorites.map(item => {
          favorites.push(item._id)
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
      } else {
        //show alert login
        window.location.href = '/auth/sign-in'
      }
    },
  },
  updated() {
    this.isLoggedIn = this.$auth.loggedIn
    if (this.isLoggedIn) {
      this.favorites = JSON.parse(JSON.stringify(this.$auth.user.favorites))
      const index = this.favorites.findIndex(item => item?._id === this.product?._id)
      if (index !== -1) {
        this.isLike = true
      }
    }

    if (this.product.product.options) {
      this.product.product.options.attributes.map(item => {
        const unitPrice = item.product ? item.product.unitPrice : 0
        if (unitPrice < this.minPrice || this.minPrice === null)  {
          this.minPrice = unitPrice
        }
        if (unitPrice > this.maxPrice || this.maxPrice === null)  {
          this.maxPrice = unitPrice
        }
      })
    }
  }
}
</script>

<style scoped>

.filter-opened .product-list.in-filter .cols {
  width: 16.6%;
}
@media (max-width: 767px) {
  .product-list.in-filter .cols {
    padding: 0px 5px 0;
}
}

.img-shake {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
