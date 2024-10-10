<template>
  <div class="page p-0">
    <Nuxt/>
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
    this.lang = localStorage.getItem('lang') || 'th'
    this.$i18n.setLocale(this.lang)
  }
}
</script>

<style scoped>

</style>
