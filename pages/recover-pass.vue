<template>
  <div class="container-fluid">

    <div class="section-separate">
      <div class="row flex-row-reverse">
        <div class="col-md-6 col-form">
          <div class="container-fluid">
            <form class="form " action="#">
              <div class="form-header">
                <h3>{{ $t('stepRecoveryPass') }}</h3>
              </div>

              <div class="form-body">
                <p class="pt-3 pb-4">{{ $t('messageRecoverPassword') }}</p>

                <div class="form-group">
                  <label class="title pl-3">Email</label>
                  <div class="group">
                    <input type="text" class="form-control outline focus" placeholder="*********@gmail.com"
                      v-model="email" name="">
                    <label class="icon right"><span class="icons icon-true"></span></label>
                  </div>
                  <p v-if="message !== ''" class="valid-message">{{ message }}</p>
                </div>

                <div class="form-group pt-md-4 pb-md-4 pt-2 pb-2 mb-0">
                  <button @click="submitData" class="btn btn-black lg effect w-100" type="button"><span>{{
                    $t('submit')
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

              <p class="mt-auto pb-4 kanit">{{ $t('ifDontHavAccount') }} <a class="link-underline"
                  href="/auth/register">{{ $t('createAccountNow') }}</a></p>
            </div><!--article-register-->
          </div>
        </div><!--col-md-6-->

      </div><!--row-->

      <div id="recoverPassModal" class="modal modal-alert fade">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-0">
            <h4 class="modal-title pt-4">แจ้งเตือนระบบ</h4>

            <div class="modal-body f-14">
              <p class="text-center black-50 bold">
                {{ $t('recoveryOne') }}<br>
                {{ $t('recoveryTwo') }} ({{ email }}) {{ $t('recoveryThree') }}
              </p>
            </div>

            <div class="modal-footer">
              <button class="btn btn-black effect w-100" data-dismiss="modal"><span>{{
                $t('closeWindow')
              }}</span></button>
            </div>
          </div><!--modal-content-->
        </div><!--modal-dialog-->
      </div><!--modal-alert-->

    </div><!--section-->
  </div>
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "only-header",
  data() {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    async submitData() {
      const result = await this.$axios.$post('/api/setting/forgot-password', { email: this.email })
      if (result.status) {
        $('#recoverPassModal').appendTo('body').modal('show')
        this.message = ''
      } else {
        this.message = 'Email not found'
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
