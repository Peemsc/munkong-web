<template>
  <div class="page" style="background-color: #f5f5f5">
    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active">
                  <a href="#">{{ $t("promotion") }}</a>
                </li>
              </ul>

              <div class="icons-group d-flex ml-auto">
                <div class="dropdown share">
                  <button
                    class="btn btn-share"
                    data-toggle="dropdown"
                    data-display="static"
                    type="button"
                  ></button>

                  <div class="dropdown-menu">
                    <div class="d-flex">
                      <p>{{ $t('share')}} :</p>
                      <div class="share-lists">
                        <a
                          href="#"
                          class="icons icon-facebook"
                          @click="shareFacebook"
                        ></a>
                        <a
                          href="#"
                          class="icons icon-twitter"
                          @click="shareTwitter"
                        ></a>
                        <a
                          href="#"
                          class="icons icon-line"
                          @click="shareLine"
                        ></a>
                        <a
                          href="#"
                          class="icons icon-link"
                          @click="copyToClipboard"
                        ></a>
                      </div>
                    </div>
                    <!-- <a href="#" class="icons icon-copy"></a> -->
                  </div>
                </div>
              </div>
            </div>

            <hr class="my-1" />

            <div class="blog-row my-2">
              <h5>{{ $t("promotion") }}</h5>
            </div>

            <div class="blog-details text-center pl-0 pr-0">
              <swiper
                class="swiper-container swiper-single banner-brand"
                :options="swiperOption"
              >
                <swiper-slide
                  class="swiper-slide"
                  v-for="(item, index) in listPromotionPriority"
                  :key="index"
                >
                  <!--a class="background" style="background-image: url(/img/thumb/photo-1920x559--1.jpg);" href="/img/thumb/photo-1920x559--1.jpg" data-fancybox></a-->
                  <img class="w-100" :src="item.banner" alt="" />
                </swiper-slide>
                <div class="swiper-pagination"></div> </swiper
              ><!--swiper-banner-->

              <div class="filter-row d-flex pb-lg-5 pb-4">
                <ul class="nav nav-filter promo mx-auto"></ul>
              </div>

              <div class="details wow fadeIn">
                <h2 class="text-center">{{ $t("allPromotion") }}</h2>
              </div>

              <div class="row news-list pt-3">
                <div
                  class="col-md-4"
                  v-for="(promotion, index) in listPromotion"
                  :key="index"
                >
                  <div class="card-blog normal news">
                    <a
                      :href="'/promotion/promotion-detail?p=' + promotion._id"
                      class="card-link"
                    ></a>
                    <div class="card-photo">
                      <div
                        class="photo"
                        :style="{
                          backgroundImage:
                            'url(' +
                            promotion.image.replace(
                              'munkong.sgp1.cdn.digitaloceanspaces.com',
                              'ik.imagekit.io/munkong'
                            ) +
                            ')',
                        }"
                      >
                        <img src="/img/thumb/frame-100x67.png" alt="" />
                      </div>
                    </div>
                    <div class="card-body">
                      <h3>
                        {{
                          $i18n.locale === "th"
                            ? promotion.name
                            : promotion.nameEN
                        }}
                      </h3>
                      <p>
                        {{
                          $i18n.locale === "th"
                            ? promotion.shortDescription
                            : promotion.shortDescriptionEN
                        }}
                      </p>

                      <div class="date">
                        <div class="d-flex pr-3">
                          <span class="icons icon-calendar"></span>
                          {{ promotion.createdAt | luxon("date_short") }}
                        </div>
                        <div class="d-flex">
                          <span class="icons icon-clock"></span>
                          {{ promotion.createdAt | luxon("T") }}
                        </div>

                        <div class="viewmore">
                          {{ $t("readAll") }}
                          <span class="icons icon-arrow-tail"></span>
                        </div>
                      </div>
                    </div>
                    <!--card-body-->
                  </div>
                </div>
                <!--col-md-4-->
              </div>
              <!--row-->

              <ul
                class="pagination justify-content-center pt-4"
                v-if="pagination.pageTotal > 0"
              >
                <li :class="{ disabled: nowPage <= 1 }">
                  <nuxt-link
                    :to="{ path: '/promotion', query: { page: nowPage - 1 } }"
                  >
                    <span class="arrow"><span class="arrow-left"></span></span>
                  </nuxt-link>
                </li>
                <li
                  :class="{ active: isActivePage(page) }"
                  v-for="page in pagination.pageTotal"
                  :key="page"
                >
                  <template v-if="pagination.currentPage <= 2 && page <= 5">
                    <nuxt-link
                      :to="{ path: '/promotion', query: { page: page } }"
                      >{{ page }}</nuxt-link
                    >
                  </template>
                  <template
                    v-if="
                      pagination.currentPage > 2 &&
                      page <= pagination.currentPage + 2 &&
                      page >= pagination.currentPage - 2
                    "
                  >
                    <nuxt-link
                      :to="{ path: '/promotion', query: { page: page } }"
                      >{{ page }}</nuxt-link
                    >
                  </template>
                </li>
                <li
                  :class="{
                    disabled: parseInt(nowPage) === pagination.pageTotal,
                  }"
                >
                  <nuxt-link
                    :to="{ path: '/promotion', query: { page: nowPage + 1 } }"
                  >
                    <span class="arrow"><span class="arrow-right"></span></span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <!--blog-details-->
          </div>
          <!--blog-content-->
        </div>
        <!--container-inner-->
      </div>
      <!--container-->
    </div>
    <!--section-blog-->
  </div>
  <!--page-->
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ModalSocialSharePromotion from "../../components/modal/ModalSocialSharePromotion.vue";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content,
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ModalSocialSharePromotion,
  },
  data() {
    return {
      meta: {
        title: "",
        hid: "",
        name: "",
        content: "",
      },
      nowPage: this.$route.query.page ? this.$route.query.page : 1,
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
          delay: 5500,
          disableOnInteraction: false,
        },
      },
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.nowPage = to.query.page ? to.query.page : 1;
    next();
  },
  async fetch() {
    this.meta.title = this.$i18n.locale === "th" ? "โปรโมชั่น" : "Promotion";
    this.meta.hid = this.$i18n.locale === "th" ? "โปรโมชั่น" : "Promotion";
    this.meta.name = this.$i18n.locale === "th" ? "โปรโมชั่น" : "Promotion";
    this.meta.content = this.$i18n.locale === "th" ? "โปรโมชั่น" : "Promotion";
  },
  async created() {
    const page = this.$route.query.page ? this.$route.query.page : 1;
    await this.$store.dispatch("promotion/fetchPromotion", page);
    await this.$store.dispatch("promotion/showPriority");
  },
  watch: {
    "$route.query.page"(page) {
      this.$store.dispatch("promotion/fetchPromotion", page);
    },
  },
  computed: {
    isActivePage() {
      return (page) => parseInt(this.nowPage) === page;
    },
    pagination() {
      return this.$store.state.promotion.pagination;
    },
    listPromotion() {
      return this.$store.state.promotion.promotions;
    },
    listPromotionPriority() {
      return this.$store.state.promotion.listPriority;
    },
  },
  methods: {
        shareFacebook() {

            window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(`${window.location.origin}/promotion`))
        },
        shareTwitter() {

            const url = `${window.location.origin}/promotion`;

            // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
        },
        // shareMessenger() {

        //     const url = `${window.location.origin}/promotion`;

        //     // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
        //     window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
        // },
        shareLine() {
            const url = `${window.location.origin}/promotion`;

            // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
            const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

            // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
            window.open(lineUrl);
        },

        copyToClipboard() {

            const url = `${window.location.origin}/promotion`;

            // สร้างตัวแปรสำหรับ <textarea> element
            const textarea = document.createElement('textarea');
            textarea.value = url;

            // เพิ่ม <textarea> element ลงใน DOM
            document.body.appendChild(textarea);

            // เลือกและคัดลอก URL จาก <textarea>
            textarea.select();
            document.execCommand('copy');

            // ลบ <textarea> element ออกจาก DOM
            document.body.removeChild(textarea);

            alert('ลิงก์ถูกคัดลอกลงในคลิปบอร์ดแล้ว');
        },

    }
};
</script>

<style scoped></style>
