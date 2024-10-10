<template>
  <div id="pointModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title py-3">{{ $t('usePoint') }}</h4>

        <hr class="m-0">

        <div class="d-block px-4 py-3">
          <div class="order-summary h-auto">
            <div class="row p-0">
              <h5><span class="icons icon-dollar mr-2"></span>{{ $t('pointCanUse') }}</h5>
              <h4 class="ml-auto yellow regular">{{ parseInt(canUsePoint) || 0 }} {{ $t('point') }}</h4>
            </div>
          </div>
        </div>

        <hr class="m-0">

        <div class="d-block p-4">
          <div class="form-group has-button m-0">
            <input type="text" class="form-control kanit" :placeholder="$t('inputPoint')" v-model="usePoint" @keypress="isNumber($event)"/>
            <span v-show="message !== ''" style="color: red; margin-top: 20px;">{{ message }}</span>
          </div><!--form-group-->
        </div>

        <hr class="m-0">

        <div class="d-flex p-4">
          <a class="link-underline kanit m-auto" :href="'/howto-point-detail?id=63db41472886d660ca9463f7'">{{ $t('whatPointMunkong') }}</a>
        </div>

        <hr class="m-0">

        <div class="d-flex p-4 justify-content-center">
          <button class="btn btn-gray effect w-150 m-2" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
          <button class="btn btn-black effect w-150 m-2" @click="submitData"><span>{{ $t('submit') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    total : {type: Number}
  },
  data () {
    return {
      canUsePoint: 0,
      usePoint: null,
      message: '',
    }
  },
  async created() {
    const result = await this.$store.dispatch('point-cashback/getPointCashback')
    if (result && this.$auth.loggedIn) {
      let point = this.total * (result.pointDiscount/100)
      if (point > result.maxPointDiscount) {
        point = result.maxPointDiscount
      }

      if (Math.floor(point) > this.$auth.user.customerPoint) {
        this.canUsePoint = this.$auth.user.customerPoint
      } else {
        this.canUsePoint = point
      }

      this.canUsePoint = Math.floor(this.canUsePoint)
    }
  },
  methods: {
    isNumber (event) {
      const keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        event.preventDefault()
      }
    },
    submitData () {
      if (this.usePoint > this.canUsePoint) {
        this.message = 'เกินพ้อยท์ที่สามารถใช้ได้'
      } else if (this.$auth.user.customerPoint < this.usePoint){
        this.message = 'พ้อยท์คงเหลือไม่เพียงพอ'
      } else {
        this.message = ''
        this.$emit('point', this.usePoint)
        $('#pointModal').modal('hide')
      }
    }
  }
}
</script>

<style scoped>

</style>
