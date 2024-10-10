<template>
  <div id="paymentSuccessModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center">

        <div class="p-4 d-flex">
          <img class="m-auto w-100" style="max-width: 120px" src="img/icons/icon-warranty-true.svg" alt="">
        </div>

        <h2 class="mb-3">{{ $t('modalPaymentSuccessOne') }}</h2>

        <p v-if="isLoggedIn" class="f-18 kanit mb-4">{{ $t('modalPaymentSuccessTwo') }}<br>{{ $t('modalPaymentSuccessThree') }}</p>
        <p v-if="!isLoggedIn" class="f-18 kanit mb-4">{{ $t('modalPaymentSuccessTwo') }}<br>{{ $t('modalPaymentSuccessFour') }}</p>

        <div class="d-flex w-300 flex-column m-auto pb-3">

          <a v-if="isLoggedIn" class="btn btn-black effect lg" href="/member/?status=all">
            <span>{{ $t('modalPaymentSuccessFive') }}</span>
          </a>

          <a class="btn btn-black-outline effect mt-3 lg" href="/product"><span>{{ $t('modalPaymentSuccessSix') }}</span></a>
        </div>

      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  name: "ModelPaymentSuccess",
  data () {
    return {
      isLoggedIn: false
    }
  },
  created() {
    this.isLoggedIn = this.$auth.loggedIn
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
