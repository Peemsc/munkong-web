<template>
  <div id="askQuestionModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title py-3">{{ $t('questionAboutProduct') }}</h4>
        <hr class="m-0">
        <div class="d-block p-4">
          <div class="form-group has-button m-0">
            <textarea class="form-control kanit" :placeholder="$t('typeQuestion')" v-model="askQ"></textarea>
          </div><!--form-group-->
        </div>

        <hr class="m-0">

        <div class="d-flex p-4 justify-content-center">
          <button class="btn btn-gray effect w-150 m-2" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
          <button class="btn btn-black effect w-150 m-2" data-dismiss="modal" @click="askQuestion" ><span>{{ $t('submit') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  data () {
    return {
      askQ: ''
    }
  },
  methods: {
    askQuestion () {
      const payload = {
        question: this.askQ,
        catalog: this.$route.query.p,
        customer: this.$auth.user._id
      }
      this.$store.dispatch('product/askQuestion', payload)
    }
  }
}
</script>

<style scoped>

</style>
