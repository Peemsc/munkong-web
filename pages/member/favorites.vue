<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('favorite') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup mt-lg-2">
      <div class="row product-list wow fadeIn">
        <div class="col-xl-3 col-md-4 col-6" v-for="(product, index) in favorites" :key="index">
          <ProductCard :product="product" @removeFavorite="removeFavorite"/>
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
  data () {
    return {
      favorites: []
    }
  },
  created() {
    this.favorites = this.$auth.user.favorites
  },
  methods: {
    removeFavorite (index) {
      this.favorites.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
