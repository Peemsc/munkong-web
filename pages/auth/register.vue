<template>
  <div class="container-fluid">
    <div class="section-separate">
      <div class="row flex-row-reverse">
        <div class="col-md-6 col-form">
          <div class="container-fluid">
            <template class="form">
              <div class="form-header">
                <div class="nav nav-pills nav-fill">
                  <a class="nav-item nav-link" href="/auth/sign-in">{{ $t('login') }}</a>
                  <a class="nav-item nav-link active" href="/auth/register">{{ $t('register') }}</a>
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
                    <input :type="typePassword" class="form-control outline focus pw" v-model="data.password">
                    <label class="icon right"><span class="icons icon-eye" @click="togglePassword"></span></label>
                    <span v-if="errorMessagePassword !== ''" style="color: red;">{{ errorMessagePassword }}</span>

                  </div>
                </div>

                <div class="form-group">
                  <label class="title pl-3">Confirm Password</label>
                  <div class="group">
                    <input :type="typeConfirmPassword" class="form-control outline focus pw"
                      v-model="data.confirmPassword" @keypress.enter="submit">
                    <label class="icon right"><span class="icons icon-eye"
                        @click="toggleConfirmPassword"></span></label>
                    <span class="valid-message" v-show="errorMessage !== ''">{{ errorMessage }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <p class="m-0 text-pivacy">{{ $t('offerMessage') }}
                    <a class="link-underline" href="/policy" target="_blank">{{ $t('policy') }} </a>
                  </p>
                </div>
                <div class="form-group pt-md-4 pb-md-4 pt-2 pb-2 mb-0">
                  <button class="btn btn-black lg effect w-100" :disabled="isDisabled" @click="submit" @keypress.enter="submit"><span>{{
                    $t('register')
                  }}</span></button>
                </div>

                <div class="form-group d-flex pt-4 pb-4">
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

              <!-- <p class="mt-auto pb-4 kanit">{{ $t('ifDontHavAccount') }}
                <a class="link-underline" href="/auth/sign-in">{{ $t('createAccountNow') }}</a>
              </p> -->
            </div><!--article-register-->
          </div>
        </div><!--col-md-6-->

      </div><!--row-->
      <ModalSuccess message="ลงทะเบียนสำเร็จ" />
      <ModelDuplicateEmail message="อีเมล์นี้ลงทะเบียนแล้ว" />
    </div><!--section-->
  </div>
</template>

<script>
import ModalSuccess from "@/components/modal/ModelSuccess";
import ModelDuplicateEmail from "@/components/modal/ModelDuplicate";
import LineButton from "@/components/social/LineButton";
import Google from "@/components/social/Google";
import Facebook from "@/components/social/Facebook";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { LineButton, Google, Facebook, ModalSuccess, ModelDuplicateEmail },
  layout: "only-header",
  data() {
    return {
      data: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      isDisabled: false,
      errorMessage: '',
      typePassword: 'password',
      typeConfirmPassword: 'password',
      errorMessageEmail: '',
      errorMessagePassword: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    togglePassword() {
      if (this.typePassword === 'password') {
        this.typePassword = 'text'
      } else {
        this.typePassword = 'password'
      }
    },
    toggleConfirmPassword() {
      if (this.typeConfirmPassword === 'password') {
        this.typeConfirmPassword = 'text'
      } else {
        this.typeConfirmPassword = 'password'
      }
    },
    validField() {
      if (this.data.email === '') {
        this.isDisabled = false;
        this.errorMessageEmail = 'Please input email'
      } else if (!this.reg.test(this.data.email)) {
        this.isDisabled = false;
        this.errorMessageEmail = 'Email not correct!'
      } else {
        this.errorMessageEmail = ''
      }

      // if (this.data.password === '') {
      //   this.errorMessagePassword = 'Please input password'
      // }

      if(this.data.password.length < 6 || this.data.password.length > 12){
        this.isDisabled = false;
        this.errorMessagePassword = 'Please input password between 6 - 12 charecter'
      }else{
        this.errorMessagePassword = ''
      }
    },
    async submit() {
      this.isDisabled = true;
      this.validField()
      if (this.data.password === this.data.confirmPassword && this.errorMessageEmail === '' && this.errorMessagePassword === '') {
        try {
          const result = await this.$axios.$post('api/customer/auth/register?from=website', this.data)
          if (result.success) {
            $('#successModal').appendTo("body").modal('show');

            setTimeout(() => {
              $('#successModal').modal('hide');
            }, 500);

            setTimeout(() => {
              this.$router.push('/auth/sign-in');
            }, 1000);
          }else{
            this.isDisabled = false;
            if(result.message == 'EMAIL_ALREADY_REGISTER'){
              $('#duplicateEmailModal').appendTo("body").modal('show');
            }
          }
        } catch (e) {
          this.isDisabled = false;
          $('#duplicateEmailModal').appendTo("body").modal('show');
          console.log(e)
        }
      } else {
        this.isDisabled = false;
        this.errorMessage = 'Password not matching!'
      }
    }
  }
}
</script>

<style scoped>
@media (min-width:1820px) {
  .container-fluid {
    width: 100% !important;
  }
}
</style>
