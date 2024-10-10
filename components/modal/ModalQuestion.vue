<template>
  <client-only>
    <div id="FAQModal" class="modal modal-alert modal-500 fade">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-0">
          <h4 class="modal-title py-3">{{ $t('questionAboutProduct') }}</h4>

          <hr class="m-0">

          <div class="d-none px-4 py-3">
            <div class="order-summary h-auto">
              <div class="row p-0">
                <h5><span class="icons icon-dollar mr-2"></span>{{ $t('pointCanUse') }}</h5>
                <h4 class="ml-auto yellow regular">{{ canUsePoint }} {{ $t('point') }}</h4>
              </div>
            </div>
          </div>

          <hr class="m-0">

          <div class="d-block p-4">
            <div class="form-group has-button m-0">
              <textarea class="form-control kanit" :placeholder="$t('typeQuestion')" v-model="message"></textarea>
            </div><!--form-group-->
          </div>

          <hr class="m-0">

          <div class="d-none p-4">
            <a class="link-underline kanit m-auto" :href="'/howto-point-detail?id=63db41472886d660ca9463f7'" >{{ $t('whatPointMunkong') }}</a>
          </div>

          <hr class="m-0">

          <div class="d-flex p-4 justify-content-center">
            <button class="btn btn-gray effect w-150 m-2" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
            <button class="btn btn-black effect w-150 m-2" @click="askQuestion" data-dismiss="modal"><span>{{ $t('submit') }}</span></button>
          </div>
        </div><!--modal-content-->
      </div><!--modal-dialog-->
    </div><!--modal-alert-->
  </client-only>
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

  },
  methods: {
    async askQuestion () {
      const payload = {
        question: this.message,
        catalog: this.$route.query.p,
        customer: this.$auth.loggedIn ? this.$auth.user._id : null
      }
      const question = await this.$store.dispatch('product/askQuestion', payload)
      this.$emit('question', question)
    },
  }
}
</script>

<style scoped>

</style>
