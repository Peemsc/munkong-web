<template>
  <div id="recoverPassModal" class="modal modal-alert fade">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-0">
          <h4 class="modal-title pt-4">แจ้งเตือนระบบ</h4>

          <div class="modal-body f-14">
            <p class="text-center black-50 bold">
              {{ $t('recoveryPassword') }}
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-black effect w-100" data-dismiss="modal"><span>{{
              $t('closeWindow')
            }}</span></button>
          </div>
        </div><!--modal-content-->
      </div><!--modal-dialog-->
    </div><!--modal-alert-->
</template>

<script>
export default {
  props: {
    email: { type: String, default: '' }
  },
}
</script>

<style scoped>

</style>
