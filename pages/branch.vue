<template>
  <div class="page" v-if="branch" style="background-color: #f5f5f5;">

    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li><a href="/news">{{ $t('branch') }}</a></li>
                <li class="active"><a href="#">{{ $i18n.locale === "th" ? branch.name : branch.nameEN }}</a></li>
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

<!--            <div class="blog-row my-2">-->
<!--              <h5>สาขามั่นคง</h5>-->
<!--            </div>-->

            <div class="blog-details">

              <div class="details wow fadeIn">
                <!-- <h3 class="text-center">{{ $i18n.locale === "th" ? branch.name : branch.nameEN }}</h3> -->

                <!-- <div class="d-block text-center pt-md-4 pt-3">
                  <a :href="branch.branchImage.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')" data-fancybox>
                    <img class="img-fluid" :src="branch.branchImage.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')" alt="">
                  </a>
                </div> -->

                <p v-if="$i18n.locale === 'th'" v-html="branch.description.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"></p>
                <p v-if="$i18n.locale === 'en'" v-html="branch.descriptionEN.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"></p>

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
  comments: {
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
   fetch () {
    // const view = {
    //   news: this.$route.query.n,
    //   customer: this.$auth.loggedIn ? this.$auth.user._id : null
    // }
    this.$store.dispatch('branch/viewBranch', this.$route.query.b)
    // this.$store.dispatch('count-view/createView', view)
    // this.$store.dispatch('news/getNews', this.$route.query.n)
    // this.$store.dispatch('news/randomNews')

    this.meta.title = this.$i18n.locale === 'th' ? this.branch.name : this.branch.nameEN;
    this.meta.hid = this.$i18n.locale === 'th' ? this.branch.name : this.branch.nameEN;
    this.meta.name = this.$i18n.locale === 'th' ? this.branch.name : this.branch.nameEN;
    this.meta.content = this.$i18n.locale === 'th' ? this.branch.name : this.branch.nameEN;
  },
  computed: {
    branch () {
      return this.$store.state.branch.branch
    },
    randomNews () {
      return this.$store.state.news.random
    }
  },
   methods: {
    shareFacebook() {
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(
            `${window.location.origin}/branch?b=63a180f6010d3c52ef034c72?openExternalBrowser=1`
          )
      );
    },
    shareTwitter() {
      const url = `${window.location.origin}/branch?b=63a180f6010d3c52ef034c72?openExternalBrowser=1`;

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
      const url = `${window.location.origin}/branch?b=63a180f6010d3c52ef034c72?openExternalBrowser=1`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const url = `${window.location.origin}/branch?b=63a180f6010d3c52ef034c72`;

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
