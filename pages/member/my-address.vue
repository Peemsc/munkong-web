<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('myAddress') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup d-md-flex align-items-center">
      <ul class="nav nav-button address mt-1 mb-1">
        <li class="pt-0 pb-0" :class="{'active': tabSelect === 'shipAddress'}" @click="tabSelect = 'shipAddress'"><a class="outline w-180" href="#">{{ $t('shippingAddress') }}</a></li>
        <li class="pt-0 pb-0" :class="{'active': tabSelect === 'shipTaxAddress'}" @click="tabSelect = 'shipTaxAddress'"><a class="outline w-180" href="#">{{ $t('taxAddress') }}</a></li>
      </ul>

      <a class="btn btn-trans btn-add ml-auto" href="/member/my-address-edit?tab=shipAddress" v-if="tabSelect === 'shipAddress'">
        <img class="svg-js" src="/img/icons/icon-plus.png" alt="">
      </a>

      <a class="btn btn-trans btn-add ml-auto" href="/member/my-address-edit?tab=shipTaxAddress" v-if="tabSelect === 'shipTaxAddress'">
        <img class="svg-js" src="/img/icons/icon-plus.png" alt="">
      </a>
    </div><!--bgroup-->

    <div class="bgroup pt-0 pb-0"><hr class="m-0"></div>

    <div class="bgroup">
      <h3 class="title-md"><img class="mr-3" src="/img/icons/icon-ribbon.svg" alt=""> {{ $t('default') }}</h3>

      <template v-if="shipAddress && tabSelect === 'shipAddress'">
        <div class="address-box" v-for="(item, index) in shipAddress" :key="index" ref="addressBox" @click="addressClick(index)">
          <div class="address-click"></div>
          <div class="info">
            <span v-if="index === 0"><img class="mr-3" src="/img/icons/icon-ribbon.svg" alt=""></span>
            <p>{{item.shipCustName}} {{item.shipCustAddress}}
              {{item.shipCustCity}} {{item.shipCustPostCode}}
              {{ item.shipCustMobileNo == '' ? '' :  $t("telFooter") +'. ' + item.shipCustMobileNo }}
            </p>
          </div>
          <div class="manage active">
            <a class="item next" :href='"/member/my-address-edit?tab=shipAddress&type=update&index="+index'>
              <span class="icons icon-arrow"></span>
            </a>
            <a class="item delete" @click="showModalDelete(index, 'shipAddress')">
              <span class="icons icon-delete"></span>
            </a>
          </div>
        </div><!--address-box-->
      </template>

      <template v-if="shipAddress && tabSelect === 'shipTaxAddress'">
        <div class="address-box" v-for="(item, index) in shipTaxAddress" :key="index" ref="addressBox" @click="addressClick(index)">
          <div class="address-click"></div>
          <div class="info">
            <span v-if="index === 0"><img class="mr-3" src="/img/icons/icon-ribbon.svg" alt=""></span>
            <p>{{item.taxCustName}} {{ item.taxCustBranchNo }} {{item.taxCustAddress}}
              {{item.taxCustCity}} {{item.taxCustPostCode}}
              {{ item.taxCustMobileNo == '' ? '' :  $t("telFooter") +'. ' + item.taxCustMobileNo }} {{ item.taxCustTaxId == '' ? '' : $t('taxNo') + ': ' + item.taxCustTaxId }}
            </p>
          </div>
          <div class="manage active">
            <a class="item next" :href='"/member/my-address-edit?tab=shipTaxAddress&type=update&index="+index'>
              <span class="icons icon-arrow"></span>
            </a>
            <a class="item delete" @click="showModalDelete(index, 'shipTaxAddress')">
              <span class="icons icon-delete"></span>
            </a>
          </div>
        </div><!--address-box-->
      </template>
    </div><!--bgroup-->
    <ModalDeleteAddress :index="deleteIndex" :type="tabSelect"/>
  </div><!--setting-content-->
</template>

<script>
import ModalDeleteAddress from "@/components/modal/ModalDeleteAddress";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {ModalDeleteAddress},
  layout: "member",
  data () {
    return {
      shipAddress: [],
      shipTaxAddress: [],
      tabSelect: 'shipAddress',
      deleteIndex: null,
      deleteType: null
    }
  },
  methods: {
    showModalDelete (index, type) {
      this.deleteIndex = index
      this.deleteType = `${type}-${Math.random(0)}`
      setTimeout(() => {
        $('#addressDeleteModal').appendTo("body").modal({
          backdrop: 'static',
          keyboard: true,
          show: true
        })
      }, 300)
    },
    addressClick (index) {
      if (this.$refs.addressBox[index].classList.contains('active')) {
        this.$refs.addressBox[index].classList.remove('active')
      } else {
        this.$refs.addressBox[index].classList.add('active')
      }
    }
  },
  mounted() {
    this.shipAddress = JSON.parse(JSON.stringify(this.$auth.user.shipAddress))
    this.shipTaxAddress = JSON.parse(JSON.stringify(this.$auth.user.shipTaxAddress))
  }
}
</script>

<style scoped>

</style>
