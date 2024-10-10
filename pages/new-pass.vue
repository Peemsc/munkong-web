<template>
  <div class="section-separate">
    <div class="row flex-row-reverse">
      <div class="col-md-6 col-form">
        <div class="container-fluid">
          <form class="form " action="#">
            <div class="form-header">
              <h3>{{ $t('createNewPass') }}</h3>
            </div>

            <div class="form-body">
              <p class="pt-3 pb-4">{{ $t('detailCreateNewPassword') }}</p>

              <div class="form-group">
                <label class="title pl-3">New Password</label>
                <div class="group">
                  <input :type="typePassword" class="form-control outline focus pw" placeholder=""
                    v-model="data.newPassword">
                  <label class="icon right"><span class="icons icon-eye" @click="togglePassword"></span></label>
                </div>
              </div>

              <div class="form-group">
                <label class="title pl-3">Confirm Password</label>
                <div class="group">
                  <input :type="typeConfirmPassword" class="form-control outline focus pw" placeholder=""
                    v-model="data.confirmPassword">
                  <label class="icon right"><span class="icons icon-eye" @click="toggleConfirmPassword"></span></label>
                </div>
              </div>

              <p class="valid-message" v-show="errorMessage !== ''">{{ errorMessage }}</p>

              <div class="form-group pt-md-4 pb-md-4 pt-2 pb-2 mb-0">
                <button class="btn btn-black lg effect w-100" type="button" @click="submit"><span>{{ $t('submit')
                }}</span></button>
              </div>
            </div><!--form-body-->
          </form>
        </div>
      </div><!--col-md-6-->
      <div class="col-md-6 col-info">
        <div class="container-fluid">
          <div class="article-register">
            <h3>Munkong ONLINE</h3>
            <h5>{{ $t('smallSignin') }}</h5>
            <p v-html="$t('messageMunkongOne')"></p>

            <p class="mt-auto pb-4 kanit">{{ $t('ifDontHavAccount') }} <a class="link-underline" href="/auth/register">{{
              $t('createAccountNow') }}</a></p>
          </div><!--article-register-->
        </div>
      </div><!--col-md-6-->

    </div><!--row-->
    <div id="newPassModal" class="modal modal-360 fade">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-0">
          <h4 class="modal-title pt-4">{{ $t('modalNewPassOne') }}<br>{{ $t('modalNewPassTwo') }}</h4>

          <div class="modal-body f-14">
            <p class="text-center black-50 bold">
              {{ $t('modalNewPassThree') }}
            </p>
          </div>

          <div class="modal-footer center">
            <button @click="$router.push('/auth/sign-in')" class="btn btn-black effect w-150" data-dismiss="modal"><span>{{ $t('closeWindow') }}</span></button>
          </div>
        </div><!--modal-content-->
      </div><!--modal-dialog-->
    </div><!--modal-alert-->
    <ModalFail message="คุณทำรายการเกินเวลาที่กำหนดหรือโทเค็นไม่ถูกต้อง กรุณากดลืมรหัสผ่านใหม่อีกครั้ง" />

  </div><!--section-->
</template>

<script>
import ModalFail from "@/components/modal/ModelFail";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalFail },
  layout: "only-header",
  data() {
    return {
      data: {
        newPassword: '',
        confirmPassword: ''
      },
      typePassword: 'password',
      typeConfirmPassword: 'password',
      errorMessage: ''
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
    async submit() {
      if (this.data.newPassword === this.data.confirmPassword) {
        const payload = {
          newPassword: this.data.newPassword,
          token: this.$route.query.token,
        }
        try {
          let result = await this.$axios.$post('/api/setting/reset-password', payload)
          if (result.status) {
            this.data = {
              newPassword: '',
              confirmPassword: ''
            }
            this.typePassword = 'password'
            this.typeConfirmPassword = 'password'
            this.errorMessage = ''

            $('#newPassModal').appendTo("body").modal('show');
          }
        } catch (e) {
          $('#failModal').appendTo("body").modal('show');
          setInterval(() => {
            $('#failModal').modal('hide');
          }, 3000)
        }
      } else {
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
