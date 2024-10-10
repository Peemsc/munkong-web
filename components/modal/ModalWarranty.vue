<template>
  <div id="warrantyModal" class="modal modal-alert warranty fade" v-if="warrantyData">
    <div class="modal-dialog modal-dialog-centered">

      <div class="modal-content">
        <h2 class="modal-title">ความคุ้มครองสินค้าของคุณ</h2>

        <h4>{{ warrantyData.ItemDescription}}</h4>
        <p>หมายเลขซีเรียล {{ warrantyData.SerialNo }}</p>

<!--        <div class="p-md-5 p-4 d-flex">-->
<!--          <img class="m-auto w-100" style="max-width: 250px" src="img/thumb/photo-w480&#45;&#45;1.jpg" alt="">-->
<!--        </div>-->

        <h5 class="mb-4">สถานะการคุ้มครองซ่อมและบริการ</h5>

        <div class="d-flex align-items-center justify-content-center">
          <img class="mr-3" src="/img/icons/icon-warranty-true.svg" alt="">
          <span class="f-20 kanit">มีผลใช้ได้</span>
        </div>

        <p class="mt-4">วันสิ้นสุดความคุ้มครอง {{ warrantyData.WarrantyDate }}</p>


      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  name: "ModalWarranty",
  computed: {
    warrantyData () {
      return this.$store.state.claim.warranty
    }

  }
}
</script>

<style scoped>

</style>
