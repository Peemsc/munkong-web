<template>
  <div class="page" style="background-color: #f5f5f5;">

    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li><a href="/howto-point">{{ $t('pointMunkong') }}</a></li>
                <li class="active"><a href="#">{{ $i18n.locale === "th" ? howToPointDetail.title : howToPointDetail.titleEN }}</a></li>
              </ul>

              <!-- <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div> -->
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
                        <a href="#" class="icons icon-facebook" @click="shareFacebook"></a>
                        <a href="#" class="icons icon-twitter" @click="shareTwitter"></a>
                        <a href="#" class="icons icon-line" @click="shareLine"></a>
                        <a href="#" class="icons icon-link" @click="copyToClipboard"></a>
                      </div>
                    </div>
                    <!-- <a href="#" class="icons icon-copy"></a> -->
                  </div>
                </div>
              </div>

            </div>

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>
                <a class="goback" href="/howto-point"><span class="icons"></span> {{ $t('back') }}</a>
              </h5>
            </div>

            <div class="blog-details">

              <div class="details wow fadeIn">
                <span v-if="$i18n.locale === 'th'" v-html="howToPointDetail.desc" />
                <span v-if="$i18n.locale === 'en'" v-html="howToPointDetail.descEN" />
              </div>

            </div><!--blog-details-->
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->

  </div><!--page-->
</template>

<script>
import ModalSocialShareProduct from "../components/modal/ModalSocialShareProduct.vue";

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
          content: this.meta.content
        }
      ]
    }
  },
  components: {
    ModalSocialShareProduct
  },
  data() {
    return {
      meta: {
        title: '',
        hid: '',
        name: '',
        content: '',
      },
    };
  },
  name: "howto-point-detail",
  async fetch () {
    await this.$store.dispatch('how-to-point/getHowToPoint', this.$route.query.id)

    this.meta.title = this.$i18n.locale === 'th' ? 'วิธีใช้มั่นคงพ้อยท์' : 'How to use Munkong points';
    this.meta.hid = this.$i18n.locale === 'th' ? 'วิธีใช้มั่นคงพ้อยท์' : 'How to use Munkong points';
    this.meta.name = this.$i18n.locale === 'th' ? 'วิธีใช้มั่นคงพ้อยท์' : 'How to use Munkong points';
    this.meta.content = this.$i18n.locale === 'th' ? 'วิธีใช้มั่นคงพ้อยท์' : 'How to use Munkong points';
  },
  computed: {
    howToPointDetail () {
      return this.$store.getters['how-to-point/howToPoint']
    }
  },
  methods: {
    shareFacebook() {
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(
            `${window.location.origin}/howto-point-detail?id=63db41472886d660ca9463f7&openExternalBrowser=1`
          )
      );
    },
    shareTwitter() {
      const url = `${window.location.origin}/howto-point-detail?id=63db41472886d660ca9463f7&openExternalBrowser=1`;

      // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
      );
    },
    // shareMessenger() {
    //   const id = this.product._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
    //   const url = `${window.location.origin}/product/detail?p=${id}&openExternalBrowser=1`;

    //   // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
    //   window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
    // },
    shareLine() {
      const url = `${window.location.origin}/howto-point-detail?id=63db41472886d660ca9463f7&openExternalBrowser=1`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const url = `${window.location.origin}/howto-point-detail?id=63db41472886d660ca9463f7`;

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
