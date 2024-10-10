<template>
  <div class="section section-gadget pt-xl-0 pb-xl-0 wow fadeIn">
    <div class="no-scroll-x card-box d-md-none d-flex" v-if="isMobile">
      <div class="d-flex" v-if="highlights.length > 0">
        <div v-for="(highlight, index) in highlights" :key="index">
          <div class="w-144">
            <div class="card-gadget">
              <a :href="'/highlight-detail?h=' + highlight._id">
                <div class="card-photo">
                  <div
                    class="photo"
                    :style="{ backgroundImage: 'url(' + highlight.cover + ')' }"
                  >
                    <img src="/img/thumb/frame-100x100.png" alt="" />
                  </div>
                </div>
              </a>
              <!--card-gadget-->
            </div>
            <!--card-gadget-->
          </div>
        </div>
      </div>
      <div
        class="d-flex"
        v-else
        v-for="(highlight, index) in highlightAll"
        :key="index"
      >
        <div class="w-144">
          <div class="card-gadget">
            <a :href="'/highlight-detail?h=' + highlight._id">
              <div class="card-photo">
                <div
                  class="photo"
                  :style="{ backgroundImage: 'url(' + highlight.cover + ')' }"
                >
                  <img src="/img/thumb/frame-100x100.png" alt="" />
                </div>
              </div>
            </a>
            <!--card-gadget-->
          </div>
          <!--card-gadget-->
        </div>
      </div>
    </div>

    <!-- tablet -->
    <div v-if="highlights.length > 0">
      <div
        id="sectionIntro"
        class="d-lg-none d-md-flex d-none section-target"
      ></div>
      <swiper
        :options="swiperOption"
        class="swiper-container swiper-gadget d-lg-none d-md-flex d-none"
      >
        <swiper-slide v-for="(highlight, index) in highlights" :key="index">
          <div class="card-gadget">
            <a
              class="card-link"
              :href="'/highlight-detail?h=' + highlight._id"
            ></a>
            <div class="card-photo">
              <div
                class="photo"
                :style="{ backgroundImage: 'url(' + highlight.cover + ')' }"
              >
                <img src="/img/thumb/frame-100x100.png" alt="" />
              </div>
              <div class="card-body">
                <h3>
                  {{
                    $i18n.locale === "th" ? highlight.name : highlight.nameEN
                  }}
                </h3>
                <div class="buttons d-flex">
                  <a
                    class="btn btn-red effect"
                    v-if="highlight.callLinkProduct"
                    :href="highlight.callLinkProduct"
                  >
                    <span>{{ $t("shopNow") }}</span>
                  </a>
                  <a
                    class="btn btn-white-outline effect mb-3"
                    v-if="highlight.content"
                    :href="highlight.callLinkContent"
                  >
                    <span>{{ $t("detail") }}</span>
                  </a>
                </div>
              </div>
            </div>
            <!--card-gadget-->
          </div>
          <!--card-gadget-->
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div class="swiper-button swiper-button-next gadget">
        <span class="arrow-right"></span>
      </div>
      <div class="swiper-button swiper-button-prev gadget">
        <span class="arrow-left"></span>
      </div>
      <!--    <div class="swiper-pagination gadget"></div>-->
    </div>

    <div v-else>
      <div
        id="sectionIntro"
        class="d-lg-none d-md-flex d-none section-target"
      ></div>
      <swiper
        :options="swiperOption"
        class="swiper-container swiper-gadget d-lg-none d-md-flex d-none"
      >
        <swiper-slide v-for="(highlight, index) in highlightAll" :key="index">
          <div class="card-gadget">
            <a
              class="card-link"
              :href="'/highlight-detail?h=' + highlight._id"
            ></a>
            <div class="card-photo">
              <div
                class="photo"
                :style="{ backgroundImage: 'url(' + highlight.cover + ')' }"
              >
                <img src="/img/thumb/frame-100x100.png" alt="" />
              </div>
              <div class="card-body">
                <h3>
                  {{
                    $i18n.locale === "th" ? highlight.name : highlight.nameEN
                  }}
                </h3>
                <div class="buttons d-flex">
                  <a
                    class="btn btn-red effect"
                    v-if="highlight.callLinkProduct"
                    :href="highlight.callLinkProduct"
                  >
                    <span>{{ $t("shopNow") }}</span>
                  </a>
                  <a
                    class="btn btn-white-outline effect mb-3"
                    v-if="highlight.content"
                    :href="highlight.callLinkContent"
                  >
                    <span>{{ $t("detail") }}</span>
                  </a>
                </div>
              </div>
            </div>
            <!--card-gadget-->
          </div>
          <!--card-gadget-->
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div class="swiper-button swiper-button-next gadget">
        <span class="arrow-right"></span>
      </div>
      <div class="swiper-button swiper-button-prev gadget">
        <span class="arrow-left"></span>
      </div>
      <!--    <div class="swiper-pagination gadget"></div>-->
    </div>
    <!-- tablet -->

    <!-- Desktop -->
    <div v-if="!isMobile && highlights.length > 0">
      <div id="sectionIntro" class="d-lg-flex d-none section-target"></div>
      <swiper
        :options="swiperOption"
        class="swiper-container swiper-gadget d-lg-flex d-none"
      >
        <swiper-slide v-for="(highlight, index) in highlights" :key="index">
          <div class="card-gadget">
            <a
              class="card-link"
              :href="'/highlight-detail?h=' + highlight._id"
            ></a>
            <div class="card-photo">
              <div
                class="photo"
                :style="{ backgroundImage: 'url(' + highlight.cover + ')' }"
              >
                <img src="/img/thumb/frame-100x100.png" alt="" />
              </div>
              <div class="card-body">
                <h3>{{ highlight.name }}</h3>
                <div class="buttons d-flex">
                  <a
                    class="btn btn-red effect"
                    v-if="highlight.callLinkProduct"
                    :href="highlight.callLinkProduct"
                  >
                    <span>{{ $t("shopNow") }}</span>
                  </a>
                  <a
                    class="btn btn-white-outline effect mb-3"
                    v-if="highlight.callLinkContent"
                    :href="highlight.callLinkContent"
                  >
                    <span>{{ $t("detail") }}</span>
                  </a>
                </div>
              </div>
            </div>
            <!--card-gadget-->
          </div>
          <!--card-gadget-->
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div class="swiper-button swiper-button-next gadget">
        <span class="arrow-right"></span>
      </div>
      <div class="swiper-button swiper-button-prev gadget">
        <span class="arrow-left"></span>
      </div>
      <!--    <div class="swiper-pagination gadget"></div>-->
    </div>

    <!-- condition highlightAll -->
    <div v-else>
      <div id="sectionIntro" class="d-lg-flex d-none section-target"></div>
      <swiper
        :options="swiperOption"
        class="swiper-container swiper-gadget d-lg-flex d-none"
      >
        <swiper-slide v-for="(highlight, index) in highlightAll" :key="index">
          <div class="card-gadget">
            <a
              class="card-link"
              :href="'/highlight-detail?h=' + highlight._id"
            ></a>
            <div class="card-photo">
              <div
                class="photo"
                :style="{ backgroundImage: 'url(' + highlight.cover + ')' }"
              >
                <img src="/img/thumb/frame-100x100.png" alt="" />
              </div>
              <div class="card-body">
                <h3>{{ highlight.name }}</h3>
                <div class="buttons d-flex">
                  <a
                    class="btn btn-red effect"
                    v-if="highlight.callLinkProduct"
                    :href="highlight.callLinkProduct"
                  >
                    <span>{{ $t("shopNow") }}</span>
                  </a>
                  <a
                    class="btn btn-white-outline effect mb-3"
                    v-if="highlight.callLinkContent"
                    :href="highlight.callLinkContent"
                  >
                    <span>{{ $t("detail") }}</span>
                  </a>
                </div>
              </div>
            </div>
            <!--card-gadget-->
          </div>
          <!--card-gadget-->
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination single d-black d-md-none"></div>
      <div class="swiper-button swiper-button-next gadget">
        <span class="arrow-right"></span>
      </div>
      <div class="swiper-button swiper-button-prev gadget">
        <span class="arrow-left"></span>
      </div>
      <!--    <div class="swiper-pagination gadget"></div>-->
    </div>
  </div>
  <!--section-->
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "@/assets/css/swiper.css";

export default {
  layout: "blank",
  props: {
    highlights: { type: Array },
    highlightAll: { type: Array },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        speed: 800,
        loop: true,
        observer: true,
        effect: "slide",
        observeParents: true,
        watchOverflow: true,
        pagination: {
          el: ".swiper-pagination.gadget",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next.gadget",
          prevEl: ".swiper-button-prev.gadget",
        },
        breakpoints: {
          1280: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          576: {
            slidesPerView: 4,
            spaceBetween: 0,
            speed: 700,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 700,
          },
        },
      },
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
  },
};
</script>
<style scoped>
@media (min-width: 1024px) and (max-width: 1240px) {
  .section {
    padding: 0px 0px !important;
  }
}

.card-gadget .card-body {
  padding: 20px 20px 30px 20px;
}
</style>
