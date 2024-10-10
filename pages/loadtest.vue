<template>
  <div class="page" style="background-color: #FFF;">

    <h1>load test</h1>

  </div><!--page-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "blank",
   fetch () {
  },
  computed: {

  }
}
</script>

<style scoped>
@media (max-width: 767px) {
  .section-blog .container-inner {
    padding: 0px;
  }
}
</style>
