<template>
  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('editProfile') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup">
      <div class="profile-upload">
        <div v-if="image === null && data.avatar === null" class="d-block">
          <div class="avatar"></div>
          <span class="icons"></span>
        </div>

        <div v-if="data.avatar !== null && image === null" class="d-block has-upload">
          <div class="avatar" :style="{ backgroundImage: 'url(' + data.avatar + ')' }"></div>
        </div>

        <div v-if="image !== null" class="d-block has-upload">
          <div class="avatar" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
        </div>

        <label class="btn btn-upload" for="profile-image">
          <input type="file" id="profile-image" class="d-none" @change="inputImage">
          <span class="icons"></span> {{ $t('editImgProfile') }}
        </label>
      </div>

    </div><!--bgroup-->

    <div class="bgroup pb-0">
      <ul class="nav navlist bold">
        <li class="d-flex align-items-center">
          <p class="title">{{ $t('fullName') }}</p>
          <div class="ml-auto">
            <input type="text" class="form-control trans" :placeholder="$t('placeholderFullName')" v-model="data.custName">
          </div>
        </li>
      </ul>
      <ul class="nav navlist bold">
        <li class="d-flex align-items-center">
          <p class="title">{{ $t('userName') }}</p>
          <div class="ml-auto">
            <input type="text" class="form-control trans" :placeholder="$t('placeholderUserName')" v-model="data.userName">
          </div>
        </li>
      </ul>
    </div><!--bgroup-->

    <hr class="lg">

    <div class="bgroup pt-0 pb-0">
      <ul class="nav navlist bold">
        <li class="d-flex align-items-center">
          <p class="title">{{ $t('gender') }}</p>
          <div class="ml-auto">
            <input type="text" class="form-control trans" :placeholder="$t('placeholderGender')" v-model="data.gender">
          </div>
        </li>
        <li class="d-flex align-items-center">
          <p class="title">{{ $t('birthDate') }}</p>
          <div class="ml-auto">
<!--            <input v-model="data.birthDate" type="date" class="form-control trans">-->
            <client-only>
              <date-picker
                placeholder="YYYY/MM/DD"
                class="date-picker"
                v-model="data.birthDate"
                format="yyyy/MM/dd"
                input-class="date-picker-style"
              />
            </client-only>
          </div>
        </li>

        <li class="d-flex align-items-center">
          <p class="title">{{ $t('tel') }}</p>
          <div class="ml-auto">
            <input type="text" class="form-control trans" :placeholder="$t('tel')" v-model="data.custMobileNo" maxlength="10">
          </div>
        </li>

        <li>
          <a class="d-flex has-arrow pt-2 pb-2" href="#">
            <p class="title">{{ $t('email') }}</p>
            <p class="title ml-auto">{{data.custEmail}}</p>
          </a>
        </li>

        <li>
          <a class="d-flex pt-2 pb-2">
            <p class="title">{{ $t('account') }} Social media</p>
          </a>
        </li>

      </ul>

      <div style="display: flex; justify-content: space-between; padding: 20px">
        <div class="d-flex align-items-center">
          <img src="/img/icons/social_facebook.png" style="width: 32px; height: 32px;"/>
          <div style="display: flex; flex-direction: column">
            <span class="ml-4 title">{{ $t('connectFacebook') }}</span>
            <span class="ml-4" style="font-size: 12px" v-if="social.facebook">({{ social.facebookEmail }})</span>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <span class="social-title" @click="social.facebook ? disconnectAccount('facebook') : actionConnectAccount('facebook')">
            {{ social.facebook ? $t('disconnectLink') : $t('connectLink') }}
          </span>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 20px">
        <div class="d-flex align-items-center">
          <img src="/img/icons/social_icon.png" style="width: 32px; height: 32px;"/>
          <div style="display: flex; flex-direction: column">
            <span class="ml-4 title">{{ $t('connectLine') }}</span>
            <span class="ml-4" style="font-size: 12px" v-if="social.line">({{ social.lineEmail }})</span>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <span class="social-title" @click="social.line ? disconnectAccount('line') : actionConnectAccount('line')">
            {{ social.line ? $t('disconnectLink') : $t('connectLink') }}
          </span>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 20px">
        <div class="d-flex align-items-center">
          <img src="/img/icons/social_gmail.png" style="width: 32px; height: 32px;"/>
          <div style="display: flex; flex-direction: column">
            <span class="ml-4 title">{{ $t('connectGoogle') }}</span>
            <span class="ml-4" style="font-size: 12px" v-if="social.google">({{ social.googleEmail }})</span>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <span class="social-title" @click="social.google ? disconnectAccount('google') : actionConnectAccount('google')">
            {{ social.google ? $t('disconnectLink') : $t('connectLink') }}
          </span>
        </div>
      </div>

      <hr class="m-0">
    </div><!--bgroup-->

    <div class="bgroup d-flex mt-4">
      <button class="btn btn-black w-150 effect ml-auto" type="button" @click="updateProfile"><span>{{ $t('save') }}</span></button>
    </div>

    <modal-success />
    <modal-fail message="ไม่สามารถบันทึกได้" />
  </div><!--setting-content-->
</template>

<script>
import ModalSuccess from "@/components/modal/ModelSuccess";
import ModalFail from "@/components/modal/ModelFail";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {ModalFail, ModalSuccess},
  layout: "member",
  data () {
    return {
      image: null,
      file: null,
      social: {},
      data: {
        custName: this.$auth.user.custName,
        userName: this.$auth.user.userName,
        custMobileNo: this.$auth.user.custMobileNo,
        custEmail: this.$auth.user.custEmail,
        avatar: this.$auth.user.avatar || null,
        birthDate: this.$auth.user.birthDate || "",
        gender: this.$auth.user.gender || '',
        custId: this.$auth.user.custId
      },
      message: ""
    }
  },
  created() {
    this.social = JSON.parse(JSON.stringify(this.$auth.user.social))
  },
  async mounted() {
    if (this.$route.query.code && this.$route.query.state) {
      if (process.browser) {
        await this.getLineToken()
      }
    }
  },
  methods: {
    getLineToken () {
      try {
        this.$auth.options.redirect = false
        const code = this.$route.query.code
        const querystring = require('querystring');
        const clientId =  process.env.lineClientId
        const channelSecret =  process.env.lineSecretId
        const payload = querystring.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: `${window.location.origin}/member/my-profile`,
          client_id: clientId,
          client_secret: channelSecret
        })
        this.$axios({
          method: 'POST',
          url: 'https://api.line.me/oauth2/v2.1/token',
          data: payload,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then((res) => {
          this.connectAccount("line", res.data.id_token)
        })
      } catch (error) {
        // console.log(error.response.data)
      }
    },
    async connectAccount (social, token) {
      const payload = {
        isConnect: true,
        token: token,
        custId: this.$auth.user.custId
      }
      try {
        let result = await this.$axios.$post(`/api/customer/auth/social?type=${social}`, payload)

        if (result.message === "CONNECT_SUCCESS") {
          $('#successModal').appendTo("body").modal('show');
          setTimeout(() => {
            window.location.href = `/member/my-profile`
          }, 700)
        }
      } catch (e) {
        $('#failModal').appendTo("body").modal('show');
      }
    },
    async disconnectAccount (social) {
      const payload = {
        custId: this.$auth.user.custId
      }
      try {
        let result = await this.$axios.$post(`/api/customer/auth/disconnect-social?type=${social}`, payload)
        $('#successModal').appendTo("body").modal('show');
        setTimeout(() => {
          window.location.href = `/member/my-profile`
        }, 700)
      } catch (e) {
        $('#failModal').appendTo("body").modal('show');
      }
    },
    async actionConnectAccount (social) {
      try {
        let provider = null
        let authData = null
        switch(social) {
          case "facebook":
            provider = new this.$fireModule.auth.FacebookAuthProvider()
            authData = await this.$fire.auth.signInWithPopup(provider)
            await this.connectAccount(social, authData.credential.accessToken)
            break;
          case "line":
            await this.loginWithLine()
            break;
          case "google":
            provider = new this.$fireModule.auth.GoogleAuthProvider()
            provider.addScope('email');
            authData = await this.$fire.auth.signInWithPopup(provider)
            await this.connectAccount(social, authData.credential.accessToken)
            break;
          default:
            console.log('')
        }
      } catch (e) {
        console.log(e)
        $('#failModal').appendTo("body").modal('show');
      }
    },
    async loginWithLine () {
      const redirectUrl = `${window.location.origin}/member/my-profile`
      const clientId = process.env.lineClientId
      const state = Math.random().toString(36).substr(2, 5);
      const urlLogin = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&scope=profile%20openid%20email`
      window.location.replace(urlLogin)
    },
    inputImage (e) {
      this.file = e.target.files[0]
      this.image = URL.createObjectURL(this.file)
    },
    async updateProfile () {
      if (this.file !== null) {
        const formData = new FormData()
        formData.append('file', this.file, this.file.name)
        const image = await this.$store.dispatch('upload_file/uploadFile', formData)
        this.data.avatar = image.url
      }
      this.data._id = this.$auth.user._id
      this.data.social = this.social
      const result = await this.$store.dispatch('customer/updateProfile', this.data)
      if (result.status) {
        this.image = null
        $('#successModal').appendTo("body").modal('show');

        setTimeout(() => {
          $('#successModal').modal('hide');
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
.social-title {
  font-weight: bold;
  cursor: pointer;
}
</style>
