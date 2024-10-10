<template>
  <div class="page">
    <div class="section-blog" style="background-color: #f5f5f5;">
      <div class="container">
        <div class="container-inner" style="background-color: #f5f5f5;">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">{{ $t('home') }}</a></li>
                <li class="active"><a href="#">{{ $t('contactUs') }}</a></li>
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
              <h5>{{ $t('contactUs') }}</h5>
            </div>

            <client-only>
              <div class="blog-details text-center">
                <template v-if="setting">
                  <div v-if="$i18n.locale === 'th'" class="details" v-html="setting.branch"></div>
                  <div v-if="$i18n.locale === 'en'" class="details" v-html="setting.branchEN"></div>
                </template>

                <div class="row md pt-3" style="margin-top: 30px">

                  <!-- <div class="col-md-6 col-lg-4" v-for="(branch, index) in listBranch" :key="index">
                    <a class="card-blog normal" :href="'/branch?b='+branch._id">
                      <div class="card-photo">
                        <div class="photo" :style="{ backgroundImage: 'url(' + branch.branchImage + ')' }">
                          <img src="/img/thumb/frame-100x59.png" alt="">
                        </div>
                      </div>
                      <div class="card-body">
                        <h3>{{ $i18n.locale === "th" ? branch.name : branch.nameEN }}</h3>
                        <p>{{ $i18n.locale === "th" ? branch.shortDescription : branch.shortDescriptionEN }}</p>
                      </div>
                    </a>
                  </div> -->

                </div><!--row-->

                <div class="details">
                  <hr class="my-lg-5 my-2">

                  <h2 class="pt-4 wow fadeIn">{{ $t('helpCenter') }}</h2>

                  <template v-if="setting">
                    <p v-if="$i18n.locale === 'th'" v-html="setting.helpCenter"></p>
                    <p v-if="$i18n.locale === 'en'" v-html="setting.helpCenterEN"></p>
                  </template>
                </div><!--details-->

                <div class="row pt-md-3 pb-md-5 pb-3" v-if="setting">

                  <template v-for="(item, index) in setting.tels">
                    <div class="col-md-4 wow fadeInUp" :key="index">
                      <div style="margin-top: 30px"></div>
                      <a class="contact-item" :href="'tel:'+item.tel">
                        <span class="icons"></span>
                        <div class="my-auto">
                          <p>{{$i18n.locale === "th" ? item.name : item.nameEN }}</p>
                          <h4>{{ item.tel }}</h4>
                        </div>
                      </a>
                    </div>
                  </template>
                </div><!--row-->

                <hr class="my-lg-5 my-2">

                <div class="details">

                  <h2 class="pt-4 wow fadeIn">{{ $t('contactUs') }}</h2>

                  <p>{{ $t('detailHelpCenter') }}</p>
                </div><!--details-->
                <ValidationObserver v-slot="{ invalid }">
                  <div class="form-content text-left">
                    <div class="row">
                      <div class="col-md-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <label class="title pl-3 kanit">{{ $t('firstName') }}</label>
                          <input type="text" class="form-control kanit" :placeholder="$t('firstName')"
                                 v-model="contact.fname">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <label class="title pl-3 kanit">{{ $t('lastName') }}</label>
                          <input type="text" class="form-control kanit" :placeholder="$t('lastName')"
                                 v-model="contact.lname">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <label class="title pl-3 kanit">{{ $t('tel') }}</label>
                          <input
                            type="text"
                            class="form-control kanit"
                            :placeholder="$t('tel')"
                            @keypress="isNumber($event)"
                            v-model="contact.tel"
                            maxlength="10"
                          >
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
                          <label class="title pl-3 kanit">{{ $t('email') }}</label>
                          <input type="text" class="form-control kanit" :placeholder="$t('email')"
                                 v-model="contact.email">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-12">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <label class="title pl-3 kanit">{{ $t('topic') }}</label>
                          <input type="text" class="form-control kanit" :placeholder="$t('topic')"
                                 v-model="contact.title">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-12">
                        <label class="title pl-3 kanit">{{ $t('detail') }}</label>
                        <textarea class="form-control kanit" :placeholder="$t('detail')"
                                  v-model="contact.desc"></textarea>
                      </div>
                    </div><!--row-->


                    <div class="d-block">

                      <!--                  <div class="recaptcha d-flex justify-content-center">-->
                      <!--                    <img class="img-fluid" src="/img/thumb/recaptcha.png" alt="">-->
                      <!--                  </div>-->
                      <div class="d-flex mt-md-5 mt-4">
                        <button class="btn btn-black w-180 effect m-auto lg" type="button" :disabled="invalid"
                                @click="saveData">
                          <span>{{ $t('submit') }}</span>
                        </button>
                      </div>
                    </div>
                  </div> <!--form-content-->
                </ValidationObserver>


              </div><!--blog-details-->
            </client-only>
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->
    <modal-success :message="$t('sendDataSuccess')"/>
  </div><!--page-->
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";
import ModalSuccess from "@/components/modal/ModelSuccess";
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
    ModalSuccess,
    ValidationProvider,
    ValidationObserver,
    ModalSocialShareProduct
  },
  async fetch() {
    await this.$store.dispatch('branch/fetchBranch')
    await this.$store.dispatch('setting/getSetting', 'contactus')

    this.meta.title = this.$i18n.locale === 'th' ? 'ติดต่อเรา' : 'Contact Us';
    this.meta.hid = this.$i18n.locale === 'th' ? 'ติดต่อเรา' : 'Contact Us';
    this.meta.name = this.$i18n.locale === 'th' ? 'ติดต่อเรา' : 'Contact Us';
    this.meta.content = this.$i18n.locale === 'th' ? 'ติดต่อเรา' : 'Contact Us';
  },
  data() {
    return {
      meta: {
        title: '',
        hid: '',
        name: '',
        content: '',
      },
      contact: {
        fname: '',
        lname: '',
        tel: '',
        email: '',
        title: '',
        desc: ''
      }
    }
  },
  computed: {
    listBranch() {
      return this.$store.state.branch.branchs
    },
    setting() {
      return this.$store.state.setting.setting
    }
  },
  created() {
  },
  methods: {
    isNumber(event) {
      const keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        event.preventDefault()
      }
    },
    async saveData() {
      const result = await this.$store.dispatch('contact/createContact', this.contact)
      if (result.status) {
        $('#successModal').appendTo("body").modal('show');
        setTimeout(() => {
          $('#successModal').modal('show');
          window.location.reload();
        }, 1000);
      }
    },
    shareFacebook() {
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(
            `${window.location.origin}/contact?openExternalBrowser=1`
          )
      );
    },
    shareTwitter() {
      const url = `${window.location.origin}/contact?openExternalBrowser=1`;

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
      const url = `${window.location.origin}/contact?openExternalBrowser=1`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const url = `${window.location.origin}/contact`;

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
