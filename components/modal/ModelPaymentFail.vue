<template>
  <div id="paymentFailModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center">

        <div class="p-4 d-flex">
          <img class="m-auto w-100" style="max-width: 120px" src="/img/icons/icon-fail.png" alt="">
        </div>

        <template v-if="!isLoggedIn">
          <h2 class="mb-3">{{ $t('paymentFailed') }}</h2>
          <p class="f-18 kanit mb-4">คำสั่งซื้อถูกยกเลิก กรุณาสั่งซื้อใหม่</p>
        </template>

        <template v-if="isLoggedIn">
          <h2 class="mb-3">{{ $t('paymentFailed') }}</h2>
          <p class="f-18 kanit mb-4">{{ $t('tryAgain') }}</p>
        </template>

      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    message: { type:String, default: "กรุณาลองใหม่อีกครั้ง" }
  },
  name: "ModelPaymentFail",
  data () {
    return {
      isLoggedIn: false
    }
  },
  created() {
    this.isLoggedIn = this.$auth.loggedIn
  },
}
</script>

<style scoped>

</style>
