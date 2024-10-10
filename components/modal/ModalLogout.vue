<template>
  <div id="logoutModal" class="modal modal-alert logout fade">
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
    async logout () {
      try {
        const result = await this.$auth.logout()
        $('#logoutModal').modal('hide')
        this.$emit('logout')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
