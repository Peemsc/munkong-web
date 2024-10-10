<template>
   <button class="btn btn-facebook effect" type="button" @click="loginWithFacebook"><img src="../../assets/img/icons/FB_Login.svg" /></button>
  <!-- <button class="btn btn-facebook effect" type="button" @click="loginWithFacebook"><span class="icons icon-facebook"></span></button> -->
</template>

<script>
export default {
  methods: {
    async loginWithFacebook() {
      try {
        this.$auth.options.redirect = false;
        const provider = await new this.$fireModule.auth.FacebookAuthProvider()
        await this.$fire.auth.signInWithPopup(provider).then( async (authData) => {

          // if (authData.additionalUserInfo.profile.email) {
            const newAccount = {
              facebookKey: authData.additionalUserInfo.profile.id,
              custName: authData.additionalUserInfo.profile.name,
              avatar: authData.additionalUserInfo.profile.picture.data.url,
              custEmail: authData.additionalUserInfo.profile.email,
              social: {
                facebook: true,
                facebookEmail: authData.additionalUserInfo.profile.email
              }
            }
            //call api
            const result = await this.$axios.$post('api/customer/auth/facebook', newAccount)

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
          // } else {
          //   $('#emptyEmailFacebookModal').appendTo("body").modal('show');
          // }
        })


      } catch (e) {
        const data = {
          "title": "FB LOGIN WEB",
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
