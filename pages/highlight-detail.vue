<template>
  <div class="page" v-if="highlight" style="background-color: #f5f5f5;">

    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active"><a href="#">{{ $i18n.locale === "th" ? highlight.name : highlight.nameEN }}</a></li>
              </ul>

              <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div>
            </div>

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>Highlight</h5>
            </div>

            <div class="blog-details">

              <div class="details wow fadeIn">
                <h3 class="text-center">{{ highlight.name }}</h3>

                <div class="d-block text-center pt-md-4 pt-3">
                  <a :href="highlight.cover" data-fancybox>
                    <img class="img-fluid" :src="highlight.cover" alt="">
                  </a>
                </div>

                <p v-if="$i18n.locale === 'th'" v-html="highlight.content"></p>
                <p v-if="$i18n.locale === 'en'" v-html="highlight.contentEN"></p>

              </div>

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
   fetch () {
    // const view = {
    //   news: this.$route.query.n,
    //   customer: this.$auth.loggedIn ? this.$auth.user._id : null
    // }
    // this.$store.dispatch('count-view/createView', view)
    this.$store.dispatch('highlight/getHighlight', this.$route.query.h)
  },
  computed: {
    highlight () {
      return this.$store.state.highlight.highlight
    },
  }
}
</script>

<style scoped>

</style>
