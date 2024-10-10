<template>
  <div id="logoutModalSideBarMember" class="modal modal-alert logout fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <h4 class="modal-title mb-4">{{ $t('confirmLogout') }}?</h4>

        <a class="btn btn-black effect" @click="logout"><span>{{ $t('submit') }}</span></a>
        <button class="btn btn-black-outline effect mt-3" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        const result = await this.$auth.logout()
        $('#logoutModalSideBarMember').appendTo('body').modal('hide');
        this.$emit('logout')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.modal.show .modal-dialog {
  justify-content: center;
}
@media (max-width: 600px) {
  .modal.fade .modal-dialog {
    transition: transform .3s ease-out;
    transform: translate(30px, 0px) !important;
  }
}
</style>
