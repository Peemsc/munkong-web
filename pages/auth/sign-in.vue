<template>
  <!-- Responsive Mobile -->
  <div class="container-fluid">
    <div class="section-separate">
      <div class="row flex-row-reverse">
        <div class="col-md-6 col-form">
          <div class="container-fluid">
            <template class="form">
              <div class="form-header">
                <div class="nav nav-pills nav-fill">
                  <a class="nav-item nav-link active" href="/auth/sign-in">{{ $t('login') }}</a>
                  <a class="nav-item nav-link" href="/auth/register">{{ $t('register') }}</a>
                </div>
              </div>

              <div class="form-body">
                <div class="form-group">
                  <label class="title pl-3">Email</label>
                  <div class="group">
                    <input type="email" class="form-control outline focus" v-model="data.email"
                      placeholder="*****@gmail.com">
                    <label class="icon right"><span class="icons icon-true"></span></label>
                    <span v-if="errorMessageEmail !== ''" style="color: red;">{{ errorMessageEmail }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label class="title pl-3">Password</label>
                  <div class="group">
                    <input :type="typePassword" class="form-control outline focus pw" v-model="data.password"
                      @keypress.enter="onSubmit">
                    <label class="icon right"><span class="icons icon-eye" @click="togglePassword"></span></label>
                    <span v-if="errorMessagePassword !== ''" style="color: red;">{{ errorMessagePassword }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <p class="forgotpass"><a href="/recover-pass">{{ $t('forgotPassword') }}</a></p>
                  <div class="clearfix"></div>
                </div>

                <div class="form-group pt-md-4 pb-md-4 pt-2 pb-2 mb-0">
                  <button class="btn btn-black lg effect w-100" @click="onSubmit" @keypress.enter="onSubmit"><span>{{
                    $t('login')
                  }}</span></button>
                </div>

                <div class="form-group d-flex pt-4 mb-0">
                  <p class="mt-auto mb-auto kanit">{{ $t('orLoginWith') }}</p>
                  <div class="login-social">
                    <Facebook key="facebook" />
                    <Google key="google" />
                    <LineButton key="line" />
                  </div>

                </div>
              </div><!--form-body-->
            </template>
          </div>
        </div><!--col-md-6-->
        <div class="col-md-6 col-info">
          <div class="container-fluid">
            <div class="article-register">
              <h3>Munkong ONLINE</h3>
              <h5>{{ $t('smallSignin') }}</h5>
              <p v-if="this.$i18n.locale === 'en'">
                When you think about making a purchase online, Munkong ONLINE is the answer. All of our products come from authorized distributors in Thailand, and you can check the warranty with just one click. <br/><br/>
                Furthermore, we provide safe and convenient payment options for you. When it comes to after-sales service, we were born for it.
              </p>

              <p v-if="this.$i18n.locale === 'th'">
                เลือกซื้อสินค้าออนไลน์ ต้อง Munkong ONLINE สินค้าทุกชิ้น มั่นใจรับประกันศูนย์ไทย ตรวจสอบการรับประกันได้ง่าย ๆ เพียง 1 คลิก ชำระเงินผ่านช่องทางที่ท่านสะดวก ง่าย ๆ อย่างปลอดภัย และบริการหลังการขายที่คุณไว้วางใจ <br/><br/>
                สมัครสมาชิกเพื่อ พบกับโปรโมชั่นมากมาย ทั้งสินค้าลดราคา ผ่อน 0% และโค้ดส่วนลดต่าง ๆ รวมถึงสะสมมั่นคงพอยท์ เพื่อใช้เป็นส่วนลดสำหรับการซื้อในครั้งถัดไป
              </p>

              <p class="mt-auto pb-4 kanit">{{ $t('ifDontHavAccount') }} <a class="link-underline"
                  href="/auth/register">{{ $t('createAccountNow') }}</a></p>
            </div><!--article-register-->
          </div>
        </div><!--col-md-6-->
      </div><!--row-->
      <ModalSuccess :message="$t('loginSuccess')" />
      <ModalEmptyEmailFacebook :message="'อนุญาตให้ผู้ใช้มอบสิทธิ์เข้าถึงบัญชีอีเมล Facebook'" />
      <ModalEmptyEmailGmail :message="'อนุญาตให้ผู้ใช้มอบสิทธิ์เข้าถึงบัญชีอีเมล Gmail'" />
      <ModalFail />
      <ModelResetPassword :email="data.email" />
    </div><!--section-->
  </div>
</template>

<script>
import ModalSuccess from "@/components/modal/ModelSuccess";
import Facebook from "@/components/social/Facebook";
import Google from "@/components/social/Google";
import LineButton from "@/components/social/LineButton";
import ModalFail from "@/components/modal/ModelFail";
import ModalEmptyEmailFacebook from "@/components/modal/ModelEmptyEmailFacebook";
import ModalEmptyEmailGmail from "@/components/modal/ModelEmptyEmailGmail";
import ModelResetPassword from "@/components/modal/ModelResetPassword";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalFail, LineButton, Google, Facebook, ModalSuccess, ModalEmptyEmailFacebook, ModalEmptyEmailGmail,ModelResetPassword },
  layout: "only-header",
  data() {
    return {
      data: {
        email: '',
        password: '',
      },
      typePassword: 'password',
      errorMessageEmail: '',
      errorMessagePassword: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    validField() {
      if (this.data.email === '') {
        this.errorMessageEmail = 'Please input email'
      } else if (!this.reg.test(this.data.email)) {
        this.errorMessageEmail = 'Email not correct!'
      } else {
        this.errorMessageEmail = ''
      }

      if (this.data.password === '') {
        this.errorMessagePassword = 'Please input password'
      }
    },
    togglePassword() {
      if (this.typePassword === 'password') {
        this.typePassword = 'text'
      } else {
        this.typePassword = 'password'
      }
    },
    async onSubmit() {
      this.validField()
      const payload = {
        data: {
          email: this.data.email,
          password: this.data.password
        }
      }
      try {
        if (this.errorMessageEmail === '' && this.errorMessagePassword === '') {
          this.$auth.options.redirect = false;
          await this.$auth.loginWith('local', payload)
          $('#successModal').appendTo("body").modal('show');

          setTimeout(() => {
            if (this.$route.query.redirect) {
              window.location.href = `/${this.$route.query.redirect}`
            } else {
              window.location.href = '/'
            }
          }, 500);
        }
      } catch (err) {
        if(err.response.data.message == "USER_IS_IMPORT")
          $('#recoverPassModal').appendTo("body").modal('show');
        else
          $('#failModal').appendTo("body").modal('show');
      }
    },
  },
}
</script>

<style scoped>
@media (min-width:1820px) {
  .container-fluid {
    width: 100% !important;
  }
}
</style>
