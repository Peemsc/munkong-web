<template>
  <div class="page" v-if="promotion" style="background-color: #f5f5f5;">
    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li><a href="/promotion/">{{ $t('promotion') }}</a></li>
                <li class="active"><a href="#">{{ $i18n.locale === "th" ? promotion.name:promotion.nameEN }}</a></li>
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

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>{{ $t('promotion') }}</h5>
            </div>

            <div class="blog-details">

              <div class="details wow fadeIn">
                <h3 class="text-center">{{ $i18n.locale === "th" ? promotion.name : promotion.nameEN }}</h3>

                <div class="d-block text-center pt-md-4 pt-3">
                  <a :href="promotion.image" data-fancybox>
                    <img class="img-fluid" :src="promotion.image" alt="">
                  </a>
                </div>

                <span v-if="$i18n.locale === 'th'" v-html="promotion.decription"></span>
                <span v-if="$i18n.locale === 'en'" v-html="promotion.decriptionEN"></span>

              </div>

              <hr class="my-5">

              <div class="details wow fadeIn">
                <h2 class="text-center">{{ $t('otherPromotion') }}</h2>
              </div>

              <div class="row news-list">
                <div class="col-md-4" v-for="(item, index) in randomPromotions" :key="index">
                  <div class="card-blog normal news">
<!--                    <a href="/promotion-detail" class="card-link"></a>-->
                    <div class="card-photo">
                      <div class="photo" :style="{ backgroundImage: 'url(' + item.image.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + ')' }">
                        <img :src="item.image" alt="">
                      </div>
                    </div>
                    <div class="card-body">
                      <h3>{{$i18n.locale === "th" ? item.name : item.nameEN }}</h3>
                      <p>{{ $i18n.locale === "th" ? promotion.shortDescription : promotion.shortDescriptionEN }}</p>

                      <div class="date">
                        <div class="d-flex pr-3">
                          <span class="icons icon-calendar"></span> {{ item.createdAt | luxon('date_short') }}
                        </div>
                        <div class="d-flex">
                          <span class="icons icon-clock"></span> {{ item.createdAt | luxon('T') }}
                        </div>

                        <div class="viewmore">
                          <a :href="'/promotion/promotion-detail?p='+ item._id">
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
import ModalSocialSharePromotionDetail from '../../components/modal/ModalSocialSharePromotionDetail.vue';
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalSocialSharePromotionDetail },
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
      },
    };
  },
  async fetch () {
    const view = {
      promotion: this.$route.query.p,
      customer: this.$auth.loggedIn ? this.$auth.user._id : null
    }
    await this.$store.dispatch('count-view/createView', view)
    await this.$store.dispatch('promotion/getPromotion', this.$route.query.p)
    await this.$store.dispatch('promotion/randomPromotion')

    this.meta.title = this.$i18n.locale === 'th' ? this.promotion.name : this.promotion.nameEN;
    this.meta.hid = this.$i18n.locale === 'th' ? this.promotion.name : this.promotion.nameEN;
    this.meta.name = this.$i18n.locale === 'th' ? this.promotion.name : this.promotion.nameEN;
    this.meta.content = this.$i18n.locale === 'th' ? this.promotion.name : this.promotion.nameEN;
  },
  computed: {
    promotion () {
      return this.$store.state.promotion.promotion
    },
    randomPromotions () {
      return this.$store.state.promotion.random
    }
  },
  methods: {
        shareFacebook() {
            const id = this.promotion._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(`${window.location.origin}/promotion/promotion-detail?p=${id}&openExternalBrowser=1`))
        },
        shareTwitter() {
            const id = this.promotion._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/promotion/promotion-detail?p=${id}&openExternalBrowser=1`;

            // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
        },
        // shareMessenger() {
        //     const id = this.promotion._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
        //     const url = `${window.location.origin}/promotion/promotion-detail?p=${id}&openExternalBrowser=1`;

        //     // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
        //     window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
        // },
        shareLine() {
            const id = this.promotion._id;
            const url = `${window.location.origin}/promotion/promotion-detail?p=${id}&openExternalBrowser=1`;

            // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
            const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

            // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
            window.open(lineUrl);
        },

        copyToClipboard() {
            const id = this.promotion._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/promotion/promotion-detail?p=${id}`;

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

</style>
