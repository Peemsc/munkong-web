<template>
  <div id="addressDeleteModal" class="modal modal-alert logout fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <h4 class="modal-title mb-4">คุณต้องการลบที่อยู่?</h4>

        <div class="d-flex flex-column w-180 m-auto">
          <button class="btn btn-black effect" @click="checkDelete"><span>ยืนยัน</span></button>
          <button class="btn btn-black-outline effect mt-3" data-dismiss="modal"><span>ยกเลิก</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    index: { type: Number },
    type: { type: String },
  },
  name: "ModalDeleteAddress",
  methods: {
    async checkDelete() {
      if (this.type === 'shipAddress') {
        await this.shipAddress()
      } else {
        await this.shipTaxAddress()
      }
    },
    async shipAddress() {
      let shipAddress = JSON.parse(JSON.stringify(this.$auth.user.shipAddress))
      shipAddress.splice(this.index, 1)

      const userData = JSON.parse(JSON.stringify(this.$auth.user))
      userData.shipAddress = shipAddress

      const result = await this.$store.dispatch('customer/updateProfile', userData)

      if (result.status) {
        window.location.reload()
      }
    },
    async shipTaxAddress() {
      let shipTaxAddress = JSON.parse(JSON.stringify(this.$auth.user.shipTaxAddress))
      shipTaxAddress.splice(this.index, 1)

      const userData = JSON.parse(JSON.stringify(this.$auth.user))
      userData.shipTaxAddress = shipTaxAddress

      const result = await this.$store.dispatch('customer/updateProfile', userData)

      if (result.status) {
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>

</style>
