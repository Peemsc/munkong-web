<template>
  <div class="setting-content">
    <ValidationObserver v-slot="{ invalid }">
      <div class="bgroup d-flex align-items-center">
        <h3 class="title-lg mt-2">{{ $t('changePassword') }}</h3>

        <a class="ml-auto black-50 f-15 kanit" href="/forgot-password-1"> ลืมรหัสผ่านคลิก</a>
      </div><!--bgroup-->
      <hr class="lg">

      <div class="bgroup">
          <div class="form-content pb-2">
            <div class="form-group">
              <label class="title pl-3 pb-1">Current Password</label>
              <div class="group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input :type="typeCurrentPassword" class="form-control focus pw" v-model="data.currentPassword">
                  <label class="icon right"><span class="icons icon-eye" @click="toggleCurrentPassword"></span></label>
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="form-group">
              <label class="title pl-3 pb-1">New Password</label>
              <div class="group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input :type="typePassword" class="form-control focus pw" v-model="data.newPassword">
                  <label class="icon right"><span class="icons icon-eye" @click="togglePassword"></span></label>
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>

              </div>
            </div>

            <div class="form-group">
              <label class="title pl-3 pb-1">Confirm Password</label>
              <div class="group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input :type="typeConfirmPassword" class="form-control focus pw" v-model="data.confirmPassword">
                  <label class="icon right"><span class="icons icon-eye" @click="toggleConfirmPassword"></span></label>
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div><!--form-content-->


        <p class="valid-message" v-show="errorMessage !== ''">{{ errorMessage }}</p>
      </div><!--bgroup-->

      <div class="bgroup pt-1 d-flex">
        <button class="btn btn-black w-150 effect ml-auto" type="button" :disabled="invalid" data-target="#passConfirmModal" data-toggle="modal" @click="submit">
          <span>{{ $t('save') }}</span>
        </button>
      </div>
    </ValidationObserver>
    <modal-success :message="$t('savePasswordSuccess')"/>
  </div><!--setting-content-->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ModalSuccess from "@/components/modal/ModelSuccess";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {
    ModalSuccess,
    ValidationProvider,
    ValidationObserver
  },
  layout: "member",
  data () {
    return {
      data: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      typePassword: 'password',
      typeCurrentPassword: 'password',
      typeConfirmPassword: 'password',
      errorMessage: ''
    }
  },
  methods: {
    togglePassword () {
      if(this.typePassword === 'password') {
        this.typePassword = 'text'
      } else {
        this.typePassword = 'password'
      }
    },
    toggleCurrentPassword () {
      if(this.typeCurrentPassword === 'password') {
        this.typeCurrentPassword = 'text'
      } else {
        this.typeCurrentPassword = 'password'
      }
    },
    toggleConfirmPassword () {
      if(this.typeConfirmPassword === 'password') {
        this.typeConfirmPassword = 'text'
      } else {
        this.typeConfirmPassword = 'password'
      }
    },
    async submit() {
      if (this.data.newPassword === this.data.confirmPassword) {
          const payload = {
            currentPassword: this.data.currentPassword,
            newPassword: this.data.newPassword,
            custId: this.$auth.user.custId,
          }
          try {
            const result = await this.$store.dispatch('customer/resetPassword', payload)
            if (result.status) {
              // this.data = {
              //   currentPassword: '',
              //   newPassword: '',
              //   confirmPassword: ''
              // }
              this.typePassword = 'password'
              this.typeCurrentPassword = 'password'
              this.typeConfirmPassword = 'password'
              this.errorMessage = ''
              $('#successModal').appendTo("body").modal('show');
              setInterval(() => {
                location.reload()
              },1000);
            }
          } catch (e) {
            this.errorMessage = 'Current password incorrect'
          }
      } else {
        this.errorMessage = 'Password not matching!'
      }
    }
  }
}
</script>

<style scoped>

</style>
