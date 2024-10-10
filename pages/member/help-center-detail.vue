<template>
  <div class="setting-content">
    <div class="bgroup">
      <a class="goback" href="/member/help-center"><span class="icons"></span> {{ $t('back') }}</a>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup">
      <div class="article">
        <span v-if="$i18n.locale === 'th'" v-html="helpCenterDetail.desc" />
        <span v-if="$i18n.locale === 'en'" v-html="helpCenterDetail.descEN" />
      </div><!--article-->
    </div>
  </div><!--setting-content-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "member",
  async fetch () {
    await this.$store.dispatch('help-center/getHelpCenter', this.$route.query.id)
  },
  computed: {
    helpCenterDetail () {
      return this.$store.getters['help-center/helpCenter']
    }
  }
}
</script>

<style scoped>

</style>
