<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('buyAgain') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup mt-lg-2">
      <div class="row product-list wow fadeIn">

        <div class="col-xl-3 col-md-4 col-6" v-for="(item, index) in buyAgainList" :key="index">
          <ProductCard :product="item.product" :key="item._id"/>
        </div><!--cols-->

      </div><!--row-->
    </div><!--bgroup-->

  </div><!--setting-content-->
</template>

<script>
import ProductCard from "@/components/product-card/ProductCard";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {ProductCard},
  layout: "member",
  created() {
    this.$store.dispatch('buy-again/getBuyAgain', this.$auth.user.custId)
  },
  computed: {
    buyAgainList () {
      return this.$store.getters['buy-again/getBuyAgainList']
    }
  }
}
</script>

<style scoped>

</style>
