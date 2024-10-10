<template>
  <div id="pdpaModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title py-3">เว็บไซต์นี้ใช้คุกกี้</h4>
        <hr class="m-0">
        <div class="d-block p-4">
          <strong>โปรดอ่านเงื่อนไขอย่างละเอียด เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์</strong>
          <p></p>
          <p><b>คุกกี้พื้นฐานที่จำเป็น</b></p>
          <p>&emsp; คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่าง ๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม</p>
        </div>

        <hr class="m-0">

        <div class="d-flex p-4 justify-content-center">
          <button class="btn btn-black effect w-150 m-2" data-dismiss="modal" @click="accept"><span>{{ $t('submit') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  name: "ModalPDPA",
  methods: {
    accept() {
      localStorage.setItem('pdpa', "true")
    }
  }
}
</script>

<style scoped>

</style>
