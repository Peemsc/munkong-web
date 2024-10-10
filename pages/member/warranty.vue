<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('checkWarranty') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup warranty-status">
      <h2 class="mt-3">{{ $t('warrantyPageOne') }} <br class="d-none d-md-block">{{ $t('warrantyPageTwo') }}</h2>

      <p class="f-20 mt-4">{{ $t('warrantyPageThree') }}</p>

      <div class="form-group mb-0 mt-md-5 mt-4">
        <input type="text" class="form-control text-center" :placeholder="$t('serialNumber')" v-model="serial">
      </div>
    </div><!--bgroup-->

    <div class="bgroup d-flex">
      <button class="btn btn-black effect lg w-180 m-auto" type="button" @click="checkWarranty"><span>{{ $t('submit') }}</span></button>
    </div>

    <modal-warranty />
  </div><!--setting-content-->
</template>

<script>
import ModalWarranty from "@/components/modal/ModalWarranty";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {ModalWarranty},
  layout: "member",
  data () {
    return {
      serial: '',
    }
  },
  methods: {
    async checkWarranty () {
      const url = `https://d365.munkongonline.com:7048/MKG/api/beta/sentWarrantys?$filter=SerialNo eq '${this.serial}' &$top=1&$orderby=WarrantyDate desc`
      const config = {
        headers: {
          'Authorization': 'Basic QVBJVVNFUjpwWGdqK2hBVUN4V1FkMUV0Q3c4bzFSMUljKzhYYnRGSlVvY0FkYTJka1JFPQ==',
          'Content-Type': 'application/json'
        },
      }

      try {
        const result = await this.$axios.$get(url, config)
        this.$store.commit('claim/CHECK_WARRANTY', result.value[0])

        setTimeout(() => {
          $('#warrantyModal').appendTo('body').modal('show')
        }, 500)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
