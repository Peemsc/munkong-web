<template>
  <div id="subscribeSuccessModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center">

        <div class="p-4 d-flex">
          <img class="m-auto w-100" style="max-width: 120px" src="img/icons/icon-warranty-true.svg" alt="">
        </div>

        <h5 class="mb-3">{{ this.message }}</h5>

      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  name: "ModelSubScribeSuccess",
  props: {
    message: { type: String, default: 'ลงทะเบียนรับสิทธิพิเศษเรียบร้อยแล้ว' }
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
