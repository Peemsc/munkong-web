<template>
  <div id="buyConfirmModal" class="modal modal-alert fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <h4 class="modal-title mb-4">{{ $t('areYouToBuy') }}<br>{{ $t('yesOrNo') }}</h4>

        <p class="text-center text-opacity-50 pb-2 bold">{{ $t('buyConfirmOne') }}<br>
          {{ $t('buyConfirmTwo') }} <a class="link-underline" style="color: #111111" href="/how-to-point">{{ $t('pointMunkong') }}</a></p>

        <a class="btn btn-black effect" href="/auth/sign-in?redirect=checkout"><span>{{ $t('login') }}</span></a>
        <p class="text-center regular pt-4 mb-0" @click="closeModal">
          <a :href="checkout ? '/checkout' : `/product/detail?p=${productId}`" class="link-underline kanit">{{ $t('buyConfirmThree') }}</a>
<!--          <a href="/checkout?type=general" class="link-underline kanit">ซื้อสินค้าชิ้นนี้โดยไม่เข้าสู่ระบบ</a>-->
        </p>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    checkout: {type: Boolean, default: false},
  },
  methods: {
    closeModal() {
      $('#buyConfirmModal').modal('hide')
    }
  },
  computed: {
    productId () {
      return this.$store.state.product.modalProduct
    }
  }
}
</script>

<style scoped>

</style>
