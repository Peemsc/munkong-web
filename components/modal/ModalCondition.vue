<template>
  <div id="conditionModal" class="modal modal-alert modal-500 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title py-3">{{ $t('titleTermCondition') }}</h4>
        <hr class="m-0">
        <div class="d-block p-4" v-html="$t('termCondition')">
        </div>

        <hr class="m-0">

        <div class="d-flex p-4 justify-content-center">
          <button class="btn btn-gray effect w-150 m-2" data-dismiss="modal"><span>{{ $t('closeWindow') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  name: "ModalCondition"
}
</script>

<style scoped>

</style>
