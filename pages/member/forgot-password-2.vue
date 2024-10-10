<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('createNewPass') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup">
      <p class="pl-3">คุณสามารถสร้างรหัสใหม่ได้ที่นี่ โปรดสร้างรหัสผ่านใหม่ ที่ไม่ซ้ำกับรหัสเดิม</p>
      <div class="form-content pb-2">
        <div class="form-group">
          <label class="title pl-3 pb-1">New Password</label>
          <div class="group">
            <input type="password" class="form-control focus pw" placeholder="" value="" name="">
            <label class="icon right"><span class="icons icon-eye"></span></label>
          </div>
        </div>

        <div class="form-group">
          <label class="title pl-3 pb-1">Confirm Password</label>
          <div class="group">
            <input type="password" class="form-control focus pw" placeholder="" value="" name="">
            <label class="icon right"><span class="icons icon-eye"></span></label>
          </div>
        </div>
      </div><!--form-content-->

    </div><!--bgroup-->

    <div class="bgroup pt-1 d-flex">
      <button class="btn btn-black w-150 effect ml-auto" type="button" data-target="#passConfirmModal" data-toggle="modal"><span>{{ $t('save') }}</span></button>
    </div>
  </div><!--setting-content-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "member",
}
</script>

<style scoped>

</style>
