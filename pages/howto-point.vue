<template>
  <div class="page" style="background-color: #f5f5f5;">

    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active"><a href="#">{{ $t('pointMunkong') }}</a></li>
              </ul>

              <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div>
            </div>

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>{{ $t('pointMunkong') }}</h5>
            </div>

            <div class="blog-details px-0">

              <div class="details text-center wow fadeIn">
                <h2 class="text-center">{{ $t('howToUsePoint') }}</h2>
              </div>

              <ul class="nav navlist help bold mb-5">
                <li v-for="(item, index) in listHowToPoint" :key="index">
                  <a class="d-flex has-arrow circle" :href="`howto-point-detail?id=${item._id}`">
                    <p class="title">{{ $i18n.locale === "th" ? item.title : item.titleEN }}</p>
                  </a>
                </li>
              </ul>
            </div><!--blog-details-->
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->

  </div><!--page-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  name: "howto-point",
  async fetch() {
    await this.$store.dispatch('how-to-point/fetchHowToPoint')
  },
  computed: {
    listHowToPoint() {
      return this.$store.getters['how-to-point/getHowToPoint']
    }
  }
}
</script>

<style scoped>
@media (max-width: 767px) {
  .section-blog .container-inner {
    padding: 0px;
  }
}
</style>
