<template>
  <div class="page" style="background-color: #f5f5f5">
    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active" v-show="filter === 'blog'">
                  <a>{{ $t("blog") }}</a>
                </li>
                <li class="active" v-show="filter === 'review'">
                  <a>{{ $t("reviewProduct") }}</a>
                </li>
                <li class="active" v-show="filter === 'news'">
                  <a>{{ $t("news") }}</a>
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
              <h5 v-show="filter === 'blog'">{{ $t("blog") }}</h5>
              <h5 v-show="filter === 'review'">{{ $t("reviewProduct") }}</h5>
              <h5 v-show="filter === 'news'">{{ $t("news") }}</h5>
            </div>

            <div class="blog-details text-center pl-0 pr-0">
              <div class="filter-row d-flex pb-lg-5 pb-4">
                <ul class="nav nav-filter mx-auto">
                  <li>
                    <span
                      :class="{ active: filter === 'blog' }"
                      @click="filter = 'blog'"
                      >{{ $t("blog") }}</span
                    >
                  </li>
                  <li>
                    <span
                      :class="{ active: filter === 'review' }"
                      @click="filter = 'review'"
                      >{{ $t("review") }}</span
                    >
                  </li>
                  <li>
                    <span
                      :class="{ active: filter === 'news' }"
                      @click="filter = 'news'"
                      >{{ $t("news") }}</span
                    >
                  </li>
                </ul>
              </div>

              <div class="details wow fadeIn">
                <h2 class="text-center" v-show="filter === 'blog'">
                  {{ $t("blog") }}
                </h2>
                <h2 class="text-center" v-show="filter === 'review'">
                  {{ $t("reviewProduct") }}
                </h2>
                <h2 class="text-center" v-show="filter === 'news'">
                  {{ $t("news") }}
                </h2>
              </div>

              <div class="row news-list pt-3">
                <div
                  class="col-md-4"
                  v-for="(item, index) in filterNews"
                  :key="index"
                >
                  <div class="card-blog normal news">
                    <a
                      :href="'/news-detail?n=' + item._id"
                      class="card-link"
                    ></a>
                    <div class="card-photo">
                      <div
                        class="photo"
                        :style="{
                          backgroundImage:
                            'url(' +
                            item.homeCover.replace(
                              'munkong.sgp1.cdn.digitaloceanspaces.com',
                              'ik.imagekit.io/munkong'
                            ) +
                            ')',
                        }"
                      >
                        <img src="/img/thumb/frame-100x100.png" alt="" />
                      </div>
                    </div>
                    <div class="card-body">
                      <h3>
                        {{ $i18n.locale === "th" ? item.title : item.titleEN }}
                      </h3>
                      <!--                        <p>{{ item.desc.substr(0,50) | stripHTML }}</p>-->
                      <div class="date">
                        <div class="d-flex pr-3">
                          <span class="icons icon-calendar"></span>
                          {{ item.createdAt | luxon("date_short") }}
                        </div>
                        <div class="d-flex">
                          <span class="icons icon-clock"></span>
                          {{ item.createdAt | luxon("T") }}
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
                class="pagination justify-content-center pt-5"
                v-if="pagination.pageTotal > 0"
              >
                <li :class="{ disabled: nowPage <= 1 }" class="first">
                  <a style="cursor: pointer" @click="nowPage = 1">
                    <span class="arrow">
                      <span class="arrow-left"></span>
                      <span class="arrow-left" style="margin-left: 5px"></span>
                    </span>
                  </a>
                </li>

                <li :class="{ disabled: nowPage <= 1 }" class="first">
                  <a style="cursor: pointer" @click="nowPage -= 1">
                    <span class="arrow"
                      ><span class="arrow-left"></span
                      ><span class="arrow-left"></span
                    ></span>
                  </a>
                </li>

                <template v-for="page in displayPages">
                  <li
                    :class="{ active: parseInt(nowPage) === parseInt(page) }"
                    :key="page"
                  >
                    <a style="cursor: pointer" @click="nowPage = page">{{
                      page
                    }}</a>
                  </li>
                </template>

                <li
                  :class="{
                    disabled: parseInt(nowPage) === pagination.pageTotal,
                  }"
                  class="first"
                >
                  <a style="cursor: pointer" @click="nowPage += 1">
                    <span class="arrow"><span class="arrow-right"></span></span>
                  </a>
                </li>

                <li
                  :class="{
                    disabled: parseInt(nowPage) === pagination.pageTotal,
                  }"
                  class="first"
                >
                  <a
                    style="cursor: pointer"
                    @click="nowPage = pagination.pageTotal"
                  >
                    <span class="arrow">
                      <span
                        class="arrow-right"
                        style="margin-left: -5px"
                      ></span>
                      <span class="arrow-right"></span>
                    </span>
                  </a>
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
import ModalSocialShareNews from "../components/modal/ModalSocialShareNews.vue";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalSocialShareNews },
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
  data() {
    return {
      meta: {
        title: "",
        hid: "",
        name: "",
        content: "",
      },
      filter: "blog",
      nowPage: 1,
    };
  },
  async fetch() {
    const queryFilter = {
      page: 1,
      type: this.filter,
    };
    await this.$store.dispatch("news/fetchNews", queryFilter);
  },
  async created() {
    const queryFilter = {
      page: 1,
      type: this.filter,
    };
    await this.$store.dispatch("news/fetchNews", queryFilter);
  },
  watch: {
    filter(value) {
      this.nowPage = 1;
      const queryFilter = {
        page: this.nowPage,
        type: value,
      };
      this.$store.dispatch("news/fetchNews", queryFilter);
    },
    nowPage(value) {
      const queryFilter = {
        page: value,
        type: this.filter,
      };
      this.$store.dispatch("news/fetchNews", queryFilter);
    },
  },
  computed: {
    pagination() {
      return this.$store.state.news.pagination;
    },
    displayPages() {
      const totalPages = this.pagination.pageTotal;
      let currentPage = this.nowPage;

      if (totalPages < 5)
        return [...Array(totalPages).keys()].map((i) => i + 1);

      if ([1, 2].includes(currentPage)) currentPage = 3;
      else if ([totalPages - 1, totalPages].includes(currentPage))
        currentPage = totalPages - Math.trunc(5 / 2);

      return [...Array(5).keys()].map(
        (i) => i - Math.trunc(5 / 2) + currentPage
      );
    },
    filterNews() {
      return this.$store.state.news.newsList;
    },
  },
  fetch() {
    this.meta.title =
      this.$i18n.locale === "th"
        ? "รีวิว / วิดีโอ / บทความ"
        : "Review / Video / Blog";
    this.meta.hid =
      this.$i18n.locale === "th"
        ? "รีวิว / วิดีโอ / บทความ"
        : "Review / Video / Blog";
    this.meta.name =
      this.$i18n.locale === "th"
        ? "รีวิว / วิดีโอ / บทความ"
        : "Review / Video / Blog";
    this.meta.content =
      this.$i18n.locale === "th"
        ? "รีวิว / วิดีโอ / บทความ"
        : "Review / Video / Blog";
  },
  methods: {
    shareFacebook() {
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(`${window.location.origin}/news`)
      );
    },
    shareTwitter() {
      const url = `${window.location.origin}/news`;

      // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
      );
    },
    shareMessenger() {
      const url = `${window.location.origin}/news`;

      // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
      window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
    },
    shareLine() {
      const url = `${window.location.origin}/news`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const url = `${window.location.origin}/news`;

      // สร้างตัวแปรสำหรับ <textarea> element
      const textarea = document.createElement("textarea");
      textarea.value = url;

      // เพิ่ม <textarea> element ลงใน DOM
      document.body.appendChild(textarea);

      // เลือกและคัดลอก URL จาก <textarea>
      textarea.select();
      document.execCommand("copy");

      // ลบ <textarea> element ออกจาก DOM
      document.body.removeChild(textarea);

      alert("ลิงก์ถูกคัดลอกลงในคลิปบอร์ดแล้ว");
    },
  },
};
</script>

<style scoped></style>
