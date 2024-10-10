<template>
  <div id="newPassModal" class="modal modal-360 fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <h4 class="modal-title pt-4">{{ $t('modalNewPassOne') }}<br>{{ $t('modalNewPassTwo') }}</h4>

        <div class="modal-body f-14">
          <p class="text-center black-50 bold">
            {{ $t('modalNewPassThree') }}
          </p>
        </div>

        <div class="modal-footer center">
          <button class="btn btn-black effect w-150" data-dismiss="modal"><span>{{ $t('closeWindow') }}</span></button>
        </div>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
