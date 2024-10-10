<template>
  <div class="page p-0">
    <Header/>
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
  methods: {
    checkWidth (width) {
      if (width < 760) {
        this.$store.commit("CHECK_MOBILE", true)
      } else {
        this.$store.commit("CHECK_MOBILE", false)
      }
    }
  },
  mounted() {
    this.lang = localStorage.getItem('lang') || 'th'
    this.$i18n.setLocale(this.lang)

    this.checkWidth(screen.width)
    window.addEventListener('resize', () => {
      this.checkWidth(window.innerWidth)
    })
  },
  computed: {
    isMobile () {
      return this.$store.state.isMobile
    }
  }
}
</script>

<style scoped>

</style>
