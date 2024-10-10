
<template>
  <div class="section section-banner m-0" >
    <div class="swiper-container swiper-banner" >
      <swiper :options="swiperOption">
        <template v-for="(banner, index) in banners" v-lazy-container="{ selector: 'img' }">
          <swiper-slide :key="index" >
            <!--            <div class="d-flex justify-content-center"-->
            <!--                 :style="{backgroundColor: banner.backgroundColor ? banner.backgroundColor : '#fffff'}"-->
            <!--            >-->
            <!--              <img class="banner-image" :src="banner.bannerImage" alt="">-->
            <!--            </div>-->
            <div v-if="banner.bannerImage">
              <a :href="banner.url">
                <img class="w-100" :src="banner.bannerImage.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')" alt="" />
              </a>
            </div>
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div class="swiper-button swiper-button-next banner">
        <span class="arrow-right"></span>
      </div>
      <div class="swiper-button swiper-button-prev banner">
        <span class="arrow-left"></span>
      </div>
    </div>
    <!--swiper-banner-->
  </div>
  <!--section-banner-->
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "@/assets/css/swiper.css";

export default {
  layout: "blank",
  props: {
    banners: { type: Array },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 700,
        loop: true,
        effect: "slide",
        observer: true,
        observeParents: true,
        watchOverflow: true,
        autoplay: {
          delay: 50500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination.banner",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next.banner",
          prevEl: ".swiper-button-prev.banner",
        },
      },
    };
  },
};
</script>
