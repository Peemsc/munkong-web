<template>
  <!-- <button class="btn btn-line effect" type="button" @click="loginWithLine"><span class="icons icon-line"></span></button> -->
  <button class="btn btn-line effect" type="button" @click="loginWithLine"> <img src="../../assets/img/icons/Line_Login.svg" alt=""> </button>
</template>

<script>
export default {
  methods: {
    async loginWithLine () {
      const redirectUrl = 'https://www.munkongonline.com/auth/sign-in'
      const clientId = process.env.lineClientId || '1656831815'
      const state = Math.random().toString(36).substr(2, 5);
      const urlLogin = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&scope=profile%20openid%20email`
      window.location.replace(urlLogin)
    },
    async getLineData () {
      try {
        this.$auth.options.redirect = false;
        const code = this.$route.query.code
        const result = await this.$axios.$get(`/api/customer/auth/line?code=${code}`)

        await this.$auth.setUserToken(result.accessToken, result.refreshToken)
        this.$axios.setHeader('Authorization', 'Bearer ' + result.accessToken)
        this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + result.accessToken)

        $('#successModal').appendTo("body").modal('show');
        setTimeout(() => {
          if (this.$route.query.redirect) {
            window.location.href = `/${this.$route.query.redirect}`
          } else {
            window.location.href = '/'
          }
        },1500);
      } catch (e) {
        const data = {
          "title": "LINE LOGIN WEB",
          "detail": JSON.stringify(e)
        }
        const result = await this.$axios.$post('api/customer/login-log/create', data)
        $('#failModal').appendTo("body").modal('show');
      }
    }
  },
  async mounted() {
    if (this.$route.query.code && this.$route.query.state) {
      if (process.browser) {
        await this.getLineData()
      }
    }
  }
}
</script>

<style scoped>

</style>
