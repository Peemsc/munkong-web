<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('forgotPassword') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup">
      <p class="pl-3">หากคุณลืมรหัสผ่านให้ทำตามขั้นตอนต่อไปนี้ แล้วระบบจะส่งรหัสผ่านไปยัง Email ของท่าน</p>
      <div class="form-content pb-2">
        <div class="form-group">
          <label class="title pl-3 pb-1">Email</label>
          <div class="group">
            <input type="text" class="form-control focus pw" placeholder="" value="*********@gmail.co" name="">
            <label class="icon right"><span class="icons icon-true"></span></label>
          </div>
        </div>
      </div><!--form-content-->

    </div><!--bgroup-->

    <div class="bgroup pt-1 d-flex">
      <a class="btn btn-black w-180 effect ml-auto" href="/forgot-password-2"><span>ส่งไปยังระบบ</span></a>
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
