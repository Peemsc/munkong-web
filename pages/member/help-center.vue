<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('helpCenter') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup pt-0">

      <ul class="nav navlist help bold">
        <li v-for="(item, index) in listHelpCenter" :key="index">
          <a class="d-flex has-arrow circle" :href="`/member/help-center-detail?id=${item._id}`">
            <p class="title">{{ $i18n.locale === "th" ? item.title : item.titleEN }}</p>
          </a>
        </li>
      </ul>
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
    await this.$store.dispatch('help-center/fetchHelpCenter')
  },
  computed: {
    listHelpCenter () {
      return this.$store.getters['help-center/getHelpCenter']
    }
  }
}
</script>

<style scoped>

</style>
