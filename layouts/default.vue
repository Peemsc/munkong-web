<template>
  <div>
    <client-only>
      <div class="cookie-overlay p-4" style="text-align: center;display:block;" v-if="isAcceptCookie === 'false'">
        <div class="container d-flex">
          <div class="mr-3 row mx-4 ">
            <div class="col-8 col-lg-10 col-md-12 col-xs-12 col-sm-7 " style="padding: 8px 10px 0 0;">
              <p>เราใช้คุกกี้ที่มีความจำเป็นอย่างยิ่งต่อการทำงานของเว็บไซต์ของเรา
                และเรามีความประสงค์จะใช้คุกกี้ทางเลือกเพื่อช่วยให้เราสามารถปรับปรุงเว็บไซต์ของเรา
                ท่านสามารถศึกษารายละเอียดของการใช้คุกกี้ได้ <a href="/">นโยบายการใช้คุกกี้</a></p>
            </div>
            <div class="col-4 col-lg-2 col-md-12 col-xs-12  col-sm-2 ">
              <button id="cookie-button" class="btn btn-primary mt-3 accept-cookies d" @click="accept">ยอมรับ</button>
              <button id="cookie-cancel-button" class="btn btn-primary mt-3 denied-cookies"
                      @click="accept">ปฏิเสธ</button>
            </div>
          </div>
        </div>
      </div>
    </client-only>
    <!--    <div class="preload">-->
    <!--      <div class="preload-group">-->
    <!--        <div class="line line-1"></div>-->
    <!--        <div class="line line-2"></div>-->
    <!--        <div class="line line-3"></div>-->
    <!--        <div class="line line-4"></div>-->
    <!--        <div class="line line-5"></div>-->
    <!--      </div>-->
    <!--    </div>-->
    <Header />
    <div>
      <Nuxt />
    </div>
    <Footer />
    <template v-if="isMobile">
      <div class="mt-4"></div>
      <BottomNavigator />
    </template>
  </div>
</template>
<script>
import ModalPDPA from "~/components/modal/ModalPDPA";
export default {
  components: { ModalPDPA },
  data() {
    return {
      lang: null,
      isAcceptCookie: "false"
    }
  },

  methods: {
    accept() {
      this.isAcceptCookie = "true"
      localStorage.setItem('pdpa', "true")
    },
    checkWidth(width) {
      if (width < 760) {
        this.$store.commit("CHECK_MOBILE", true)
      } else {
        this.$store.commit("CHECK_MOBILE", false)
      }
    }
  },
  mounted() {
    this.checkWidth(screen.width)
    window.addEventListener('resize', () => {
      this.checkWidth(window.innerWidth)
    })

    this.lang = localStorage.getItem('lang') || 'th'
    this.$i18n.setLocale(this.lang)
    this.isAcceptCookie = localStorage.getItem('pdpa') || "false"
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    }
  }
}
</script>

<style>
.cookie-overlay {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgb(0 0 0);
  z-index: 1000000;
  color: #fff;
  padding: 40px;
}
</style>
