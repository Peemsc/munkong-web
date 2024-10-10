<template>
  <div class="thumb-example">
    <!-- swiper1 -->
    <swiper class="swiper-container swiper-gallery" :options="swiperOptionTop" ref="swiperTop">
        <swiper-slide class="card-photo swiper-slide">
            <a class="photo" data-fancybox href="/img/thumb/photo-512x512--4.jpg" style="background-image: url(/img/thumb/photo-512x512--4.jpg);">
              <img src="/img/thumb/frame-100x100.png">
            </a>
        </swiper-slide>
      <swiper-slide class="card-photo swiper-slide">
        <a class="photo" data-fancybox href="/img/thumb/photo-512x512--3.jpg" style="background-image: url(/img/thumb/photo-512x512--3.jpg);">
          <img src="/img/thumb/frame-100x100.png">
        </a>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper class="swiper-container swiper-gallery-thumb" :options="swiperOptionThumbs" ref="swiperThumbs">
      <swiper-slide class="card-photo swiper-slide">
        <a class="photo" data-fancybox href="/img/thumb/photo-512x512--3.jpg" style="background-image: url(/img/thumb/photo-512x512--3.jpg);">
          <img src="/img/thumb/frame-100x100.png">
        </a>
      </swiper-slide>
      <swiper-slide class="card-photo swiper-slide">
        <a class="photo" data-fancybox href="/img/thumb/photo-512x512--4.jpg" style="background-image: url(/img/thumb/photo-512x512--4.jpg);">
          <img src="/img/thumb/frame-100x100.png">
        </a>
      </swiper-slide>
      <div class="swiper-button swiper-button-prev gallery-thumb"><span class="arrow-left"></span></div>
      <div class="swiper-button swiper-button-next gallery-thumb"><span class="arrow-right"></span></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: 'blank',
  name: 'swiper-example-thumbs-gallery',
  title: 'Thumbs gallery with Two-way control',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptionTop: {
        slidesPerView:1,
        spaceBetween:10,
        speed: 500,
        loop: false,
        observer: true,
        effect: 'slide',
        observeParents: true,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next.gallery',
          prevEl: '.swiper-button-prev.gallery',
        },
        pagination: {
          el: '.swiper-pagination.gallery',
          clickable: true,
        },
      },
      swiperOptionThumbs: {
        spaceBetween: 20,
        slidesPerView: 4,
        loop: false,
        effect: 'slide',
        watchSlidesVisibility: true,
        observeParents: true,
        watchOverflow: true,
        /*simulateTouch:false,*/
        navigation: {
          nextEl: '.swiper-button-next.gallery-thumb',
          prevEl: '.swiper-button-prev.gallery-thumb',
        },
        breakpoints: {
          1366: {
            spaceBetween: 20,
            slidesPerView: 4,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 4,
          } ,
          0: {
            spaceBetween: 5,
            slidesPerView: 4,
          }
        },
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  }
}
</script>

