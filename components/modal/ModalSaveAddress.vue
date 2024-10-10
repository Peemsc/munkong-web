<template>
  <div id="saveAddressModel" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title py-3">บันทึกที่อยู่</h4>

        <hr class="m-0">

        <div class="d-flex p-3">
          <span class="kanit m-auto">คุณต้องการบันทึกเป็นที่อยู่หลักใช้ในการสั่งซื้อครั้งต่อไปหรือไม่</span>
        </div>

        <hr class="m-0">

        <div class="d-flex p-3 justify-content-center">
          <button class="btn btn-gray effect w-150 m-2" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
          <button class="btn btn-black effect w-150 m-2" @click="saveAddress"><span>{{ $t('submit') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    data : {type: Object}
  },
  data () {
    return {
      canUsePoint: 0,
      usePoint: null,
      message: '',
    }
  },
  methods: {
    async saveAddress () {
      const address = {
        shipCustName: this.data.shipCustName || '',
        shipCustAddress: this.data.shipCustAddress,
        shipCustCity: this.data.shipCustCity,
        shipCustPostCode: this.data.shipCustPostCode,
        shipCustPhoneNo: this.data.shipCustPhoneNo,
        shipCustMobileNo: this.data.shipCustMobileNo || '',
        shipCustEmail: this.data.shipCustEmail || '',
        shipDefault: true,
      }

      let shipAddress = JSON.parse(JSON.stringify(this.$auth.user.shipAddress))
      shipAddress.push(address)

      const userData = JSON.parse(JSON.stringify(this.$auth.user))
      userData.shipAddress = shipAddress

      // TaxAddress
      if (this.data.taxCustTaxId) {
        const taxAddress = {
          taxCustName: this.data.taxCustName || '',
          taxCustAddress: this.data.sameAddress === "yes" ? this.data.shipCustAddress : (this.data.taxCustAddress || ''),
          taxCustCity: this.data.sameAddress === "yes" ? this.data.shipCustCity : (this.data.taxCustCity || ''),
          taxCustPostCode: this.data.sameAddress === "yes" ? this.data.shipCustPostCode : (this.data.taxCustPostCode || ''),
          taxCustTaxId: this.data.taxCustTaxId || '',
          taxCustBranchNo: this.data.taxCustBranchNo || '',
          taxDefault: true,
        }

        let shipTaxAddress = JSON.parse(JSON.stringify(this.$auth.user.shipTaxAddress))
        shipTaxAddress.push(taxAddress)

        userData.shipTaxAddress = shipTaxAddress
      }
      // TaxAddress

      const result = await this.$store.dispatch('customer/updateProfile', userData)
      if (result.status) {
        $('#saveAddressModel').modal('hide')
      }
    }
  },
  fetch() {
    // console.log(this.data);
  }
}
</script>

<style scoped>

</style>
