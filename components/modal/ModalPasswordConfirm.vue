<template>
  <div id="passConfirmModal" class="modal modal-alert logout fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <h4 class="modal-title mb-4">{{ $t('confirmNewPassword') }}</h4>

        <div class="d-flex flex-column w-180 m-auto">
          <button class="btn btn-black effect" data-dismiss="modal"><span>{{ $t('submit') }}</span></button>
          <button class="btn btn-black-outline effect mt-3" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    show: {type: Boolean}
  },
  methods: {
    closeModal() {
      $('#buyConfirmModal').modal('hide')
    }
  }
}
</script>

<style scoped>

</style>
