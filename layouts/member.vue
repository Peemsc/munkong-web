<template>
  <div class="page p-0" style="background-color: #E9E9E9;">
    <Header/>
    <div class="section-setting">
      <div class="container">
        <div class="container-inner" style="background-color: #E9E9E9;" v-if="$auth.loggedIn">
          <SideBarMember/>
          <Nuxt/>
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-setting-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: null
    }
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      window.location.href = '/'
    }
    this.lang = localStorage.getItem('lang') || 'th'
    this.$i18n.setLocale(this.lang)
  }
}
</script>

<style scoped>

</style>
