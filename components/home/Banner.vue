<template>
  <div class="section section-banner m-md-0 mt-2">
    <div class="swiper-container swiper-banner" v-if="banners.length > 0">
      <swiper :options="swiperOption">
        <template v-for="(banner, index) in banners">
          <swiper-slide :key="index" v-if="banner.type === 'video'">
            <video playsinline="" loop="true" autoplay="" muted="">
              <!-- autoplay=""-->
              <source :src="banner.video" type="video/mp4" />
            </video>
            <a
              class="scroll-downs wow fadeInUp target"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              href="#sectionIntro"
              v-if="banner.type === 'video'"
            >
              <div class="mousey">
                <div class="scroller"></div>
              </div>
            </a>
          </swiper-slide>
          <swiper-slide :key="index" v-if="banner.type === 'image'">
            <a
              :href="banner.callActionURL ? banner.callActionURL : '#'"
              :target="banner.newWindow ? '_blank' : ''"
            >
              <img class="banner-image" :src="banner.imageBanner" alt="" />
            </a>
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div v-if="hasVideoBanners" class="swiper-button swiper-button-next banner">
        <span class="arrow-right"></span>
      </div>
      <div v-if="hasVideoBanners" class="swiper-button swiper-button-prev banner">
        <span class="arrow-left"></span>
      </div>
    </div>
    <!--swiper-banner-->
    <div class="swiper-container swiper-banner" v-else>
      <swiper :options="swiperOption">
        <template v-for="(banner, index) in allBanner">
          <swiper-slide :key="index" v-if="banner.type === 'video'">
            <video playsinline="" loop="true" autoplay="" muted="">
              <!-- autoplay=""-->
              <source :src="banner.video" type="video/mp4" />
            </video>
            <a
              class="scroll-downs wow fadeInUp target"
              data-wow-delay="0.2s"
              data-wow-offset="0"
              href="#sectionIntro"
              v-if="banner.type === 'video'"
            >
              <div class="mousey">
                <div class="scroller"></div>
              </div>
            </a>
          </swiper-slide>
          <swiper-slide :key="index" v-if="banner.type === 'image'">
            <a
              :href="banner.callActionURL ? banner.callActionURL : '#'"
              :target="banner.newWindow ? '_blank' : ''"
            >
              <img class="banner-image" :src="banner.imageBanner" alt="" />
            </a>
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div v-if="hasVideoBanners" class="swiper-button swiper-button-next banner">
        <span class="arrow-right"></span>
      </div>
      <div v-if="hasVideoBanners" class="swiper-button swiper-button-prev banner">
        <span class="arrow-left"></span>
      </div>
    </div>
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
    allBanner: {type: Array},
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
        loop: this.hasVideoBanners,
        effect: "slide",
        observer: true,
        observeParents: true,
        watchOverflow: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination.banner",
          clickable: true,
        },
        navigation: {
          nextEl: this.hasVideoBanners ? ".swiper-button-next.banner" : null,
          prevEl: this.hasVideoBanners ? ".swiper-button-prev.banner" : null,
        },
      },
    };
  },
  computed: {
    hasVideoBanners() {
      return this.banners.some(banner => banner.type === 'video')
    },
    hasVideoAllBanners() {
      return this.allBanner.some(banner => banner.type === 'video')
    }
  },
};
</script>
