<template>
  <div id="emptyEmailGmailModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center">

        <div class="p-4 d-flex">
          <img class="m-auto w-100" style="max-width: 120px" src="/img/icons/icon-fail.png" alt="">
        </div>

        <h2 class="mb-3">{{ this.message }}</h2>

      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  name: "ModelEmptyEmailGmail",
  props: {
    message: { type: String, default: 'อนุญาตให้ผู้ใช้มอบสิทธิ์เข้าถึงบัญชีอีเมล Gmail' }
  },
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
