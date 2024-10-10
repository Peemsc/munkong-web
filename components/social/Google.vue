<template>
  <!-- <button class="btn btn-google effect" type="button" @click="loginWithGoogle"><span class="icons icon-google"></span></button> -->
  <button class="btn btn-google effect" type="button" @click="loginWithGoogle"> <img src="../../assets/img/icons/Google_Login.svg" alt=""> </button>
</template>

<script>
export default {
  methods: {
    async loginWithGoogle () {
      try {
        this.$auth.options.redirect = false;
        const provider =  await new this.$fireModule.auth.GoogleAuthProvider()
        let authData = await this.$fire.auth.signInWithPopup(provider)

        // if (authData.additionalUserInfo.profile.email) {
          const createProfile = {
            googleKey: authData.additionalUserInfo.profile.id,
            custName: authData.additionalUserInfo.profile.name,
            avatar: authData.additionalUserInfo.profile.picture,
            custEmail: authData.additionalUserInfo.profile.email,
            social: {
              google: true,
              googleEmail: authData.additionalUserInfo.profile.email
            }
          }
          //call register api
          const result = await this.$axios.$post('/api/customer/auth/google', createProfile)

          if (result.status) {
            await this.$auth.setUserToken(result.accessToken, result.accessToken)
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
          }
        // } else {
        //   $('#emptyEmailGmailModal').appendTo("body").modal('show');
        // }

      } catch (e) {
        const data = {
          "title": "GOOGLE LOGIN WEB",
          "detail": JSON.stringify(e)
        }
        const result = await this.$axios.$post('api/customer/login-log/create', data)
        $('#failModal').appendTo("body").modal('show');
      }
    },
  }
}
</script>

<style scoped>

</style>
