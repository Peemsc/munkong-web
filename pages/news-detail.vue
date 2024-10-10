<template>
  <div class="page" v-if="news" style="background-color: #f5f5f5;">
    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">{{ $t('home') }}</a></li>
                <li><a href="/news">{{ $t('newsBlog') }}</a></li>
                <li class="active"><a href="#">{{ $i18n.locale === "th" ? news.title : news.titleEN }}</a></li>
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
                      <p>{{ $t('share')  }} :</p>
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

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>{{ $t('newsBlog') }}</h5>
            </div>

            <div class="blog-details">

              <div class="details wow fadeIn">
                <h3 class="text-center">{{ $i18n.locale === "th" ? news.title : news.titleEN }}</h3>

                <div class="d-block text-center pt-md-4 pt-3">
                  <a :href="news.cover" data-fancybox>
                    <img class="img-fluid" :src="news.cover" alt="">
                  </a>
                </div>

                <p v-if="$i18n.locale === 'th'" v-html="news.desc"></p>
                <p v-if="$i18n.locale === 'en'" v-html="news.descEN"></p>

              </div>

              <hr class="my-5">

              <div class="details wow fadeIn">
                <h2 class="text-center">{{ $t('otherNews') }}</h2>
              </div>

              <div class="row news-list">

                <div class="col-md-4" v-for="(item, index) in randomNews" :key="index">
                  <div class="card-blog normal news">
                    <a :href="'/news-detail?n='+item._id" class="card-link"></a>
                    <div class="card-photo">
                      <div class="photo" :style="{ backgroundImage: 'url(' + item.homeCover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + ')' }">
                        <img src="/img/thumb/frame-100x100.png" alt="">
                      </div>
                    </div>
                    <div class="card-body">
                      <h3>{{ item.title }}</h3>
<!--                      <span v-html="item.desc"></span>-->

                      <div class="date">
                        <div class="d-flex pr-3">
                          <span class="icons icon-calendar"></span> {{ item.createdAt | luxon('date_short') }}
                        </div>
                        <div class="d-flex">
                          <span class="icons icon-clock"></span> {{ item.createdAt | luxon('T') }}
                        </div>

                        <div class="viewmore d-lg-flex d-md-none ">
                          <a :href="{ path:'/news-detail', query: { n:item._id }}">
                            {{ $t('readAll') }}
                          </a>
                          <span class="icons icon-arrow-tail"></span>
                        </div>
                      </div>
                    </div><!--card-body-->
                  </div>
                </div><!--col-md-4-->

              </div><!--row-->

            </div><!--blog-details-->
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->

  </div><!--page-->
</template>

<script>
import ModalSocialShareNewsDetail from '../components/modal/ModalSocialShareNewsDetail.vue';
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalSocialShareNewsDetail },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content
        }
      ]
    }
  },
  data() {
    return {
      meta: {
        title: '',
        hid: '',
        name: '',
        content: '',
      }
    };
  },
   async fetch () {
    const view = {
      news: this.$route.query.n,
      customer: this.$auth.loggedIn ? this.$auth.user._id : null
    }
    await this.$store.dispatch('count-view/createView', view)
    await this.$store.dispatch('news/getNews', this.$route.query.n)
    await this.$store.dispatch('news/randomNews')

    this.meta.title = this.$i18n.locale === 'th' ? this.news.title : this.news.titleEN;
    this.meta.hid = this.$i18n.locale === 'th' ? this.news.title : this.news.titleEN;
    this.meta.name = this.$i18n.locale === 'th' ? this.news.title : this.news.titleEN;
    this.meta.content = this.$i18n.locale === 'th' ? this.news.title : this.news.titleEN;
  },
  computed: {
    news () {
      return this.$store.state.news.news
    },
    randomNews () {
      return this.$store.state.news.random
    }
  },
  methods: {
        shareFacebook() {
            const id = this.news._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(`${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`))
        },
        shareTwitter() {
            const id = this.news._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`;

            // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
        },
        // shareMessenger() {
        //     const id = this.news._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
        //     const url = `${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`;

        //     // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
        //     window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
        // },
        shareLine() {
            const id = this.detail._id;
            const url = `${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`;

            // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
            const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

            // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
            window.open(lineUrl);
        },

        copyToClipboard() {
            const id = this.news._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/news-detail?n=${id}`;

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
}
</script>

<style scoped>
@media (max-width: 767px) {
  .section-blog .container-inner {
    padding: 0px;
  }
}
</style>
