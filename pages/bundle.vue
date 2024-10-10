<template>
  <div class="section-setting" v-if="listBundle !== null">
    <div class="container">
      <div class="container-inner mw-1200">

        <div class="setting-content">
          <div class="bgroup mt-4">
            <h3 class="title-24 d-block kanit text-center">
              {{ listBundle.bundleName }}
            </h3>
          </div><!--bgroup-->

          <div class="bgroup">
            <div class="row product-list wow fadeIn">

              <div class="col-xl-3 col-md-4 col-6" v-for="(item, index) in listBundle.subBundle" :key="index" @click="selectItem(item)">
                <div class="card-product mb-4" data-target="#bundleModal" data-toggle="modal">
                  <product-card :product="item" :bundle="true"/>
                </div><!--card-product-->
              </div><!--cols-->

            </div><!--row-->
          </div><!--bgroup-->

          <div class="order-summary bundle h-60">
            <div class="inner">
              <div class="row ">
                <h5>Bundle Deal: </h5>
<!--                <h3 class="mx-2">฿2,924.35</h3>-->
                <h5>&nbsp; {{ listBundle.bundleName }}</h5>

                <div class="ml-auto">
                  <a class="btn btn-black effect w-150" href="/cart"><span>{{ $t('goToCart') }}</span></a>
                </div>
              </div>
            </div><!--inner-->
          </div><!--buy-again-summary-->

        </div><!--setting-content-->
      </div><!--container-inner-->
    </div><!--container-->
    <ModalBundle v-if="product !== null" :key="NaN"/>
  </div>
</template>

<script>
import ModalBundle from "@/components/modal/ModalBundle";
import ProductCard from "@/components/product-card/ProductCard";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {ProductCard, ModalBundle},
  layout: 'only-header',
  data () {
    return {
      showModal: false
    }
  },
  created () {
    this.$store.dispatch('bundle/getBundle', this.$route.query.b)
  },
  methods: {
    selectItem(item) {
      try {
        this.$store.commit('bundle/SET_ITEM_BUNDLE', item)
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    listBundle () {
      return this.$store.state.bundle.bundle
    },
    product () {
      return this.$store.state.bundle.selectItem
    }
  }
}
</script>

<style scoped>

</style>
