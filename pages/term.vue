<template>
  <div class="page" style="background-color: #f5f5f5;">

    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active"><a href="#">{{ $i18n.locale === "th" ? 'เงื่อนไขการใช้บริการ' : 'Term & Condition' }}</a></li>
              </ul>

              <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div>
            </div>

            <hr class="my-1">

<!--            <div class="blog-row my-2">-->
<!--              <h5>สาขามั่นคง</h5>-->
<!--            </div>-->

            <div class="blog-details">

              <div class="details wow fadeIn">

                <p v-if="$i18n.locale === 'th'"> เงื่อนไขการใช้บริการ </p>
                <p v-if="$i18n.locale === 'en'"> Terms & Condition </p>

              </div>

<!--              <hr class="my-5">-->

<!--              <div class="details wow fadeIn">-->
<!--                <h2 class="text-center">{{ $t('otherNews') }}</h2>-->
<!--              </div>-->

<!--              <div class="row news-list">-->

<!--                <div class="col-md-4" v-for="(item, index) in randomNews" :key="index">-->
<!--                  <div class="card-blog normal news">-->
<!--                    <a :href="'/news-detail?n='+item._id" class="card-link"></a>-->
<!--                    <div class="card-photo">-->
<!--                      <div class="photo" :style="{ backgroundImage: 'url(' + item.cover + ')' }">-->
<!--                        <img src="/img/thumb/frame-100x100.png" alt="">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="card-body">-->
<!--                      <h3>{{ item.title }}</h3>-->
<!--&lt;!&ndash;                      <span v-html="item.desc"></span>&ndash;&gt;-->

<!--                      <div class="date">-->
<!--                        <div class="d-flex pr-3">-->
<!--                          <span class="icons icon-calendar"></span> {{ item.createdAt | luxon('date_short') }}-->
<!--                        </div>-->
<!--                        <div class="d-flex">-->
<!--                          <span class="icons icon-clock"></span> {{ item.createdAt | luxon('time24') }}-->
<!--                        </div>-->

<!--                        <div class="viewmore">-->
<!--                          <a :href="{ path:'/news-detail', query: { n:item._id }}">-->
<!--                            {{ $t('readAll') }}-->
<!--                          </a>-->
<!--                          <span class="icons icon-arrow-tail"></span>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>&lt;!&ndash;card-body&ndash;&gt;-->
<!--                  </div>-->
<!--                </div>&lt;!&ndash;col-md-4&ndash;&gt;-->

<!--              </div>&lt;!&ndash;row&ndash;&gt;-->

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
  },
  computed: {

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
