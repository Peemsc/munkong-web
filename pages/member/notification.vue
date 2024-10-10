<template>

  <div class="setting-content">
    <div class="bgroup">
      <h3 class="title-lg mt-2">{{ $t('settingNotification') }}</h3>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="bgroup pt-0" v-if="notification">
      <ul class="nav setting">
        <li>
          <div class="cols">
            <h3>{{ $t('notifyNews') }}</h3>
            <p>{{ $t('detailNotifyNews') }}</p>
          </div>
          <div class="cols">
            <p>{{ $t('email') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.newsEmail">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="cols">
            <p>{{ $t('notify') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.newsNotify">
              <span class="slider round"></span>
            </label>
          </div>
        </li>

        <li>
          <div class="cols">
            <h3>{{ $t('notifyOrder') }}</h3>
            <p>{{ $t('detailNotifyOrder') }}</p>
          </div>
          <div class="cols">
            <p>{{ $t('email') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.orderEmail">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="cols">
            <p>{{ $t('notify') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.orderNotify">
              <span class="slider round"></span>
            </label>
          </div>
        </li>

        <li>
          <div class="cols">
            <h3>{{ $t('notifyCoupon') }}</h3>
            <p>{{ $t('detailNotifyCoupon') }}</p>
          </div>
          <div class="cols">
            <p>{{ $t('email') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.coupnEmail">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="cols">
            <p>{{ $t('notify') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.couponNotify">
              <span class="slider round"></span>
            </label>
          </div>
        </li>

        <li>
          <div class="cols">
            <h3>{{ $t('notifyPromotion') }}</h3>
            <p>{{ $t('detailNotifyPromotion') }}</p>
          </div>
          <div class="cols">
            <p>{{ $t('email') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.promotionEmail">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="cols">
            <p>{{ $t('notify') }}</p>
            <label class="switch-item xs">
              <input type="checkbox" checked="" v-model="notification.promotionNotify">
              <span class="slider round"></span>
            </label>
          </div>
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
  data () {
    return {
      notification: null
    }
  },
  created() {
    this.notification = JSON.parse(JSON.stringify(this.$auth.user.notification))
    if (process.browser){
      window.addEventListener('beforeunload', this.saveSetting);
    }
  },
  methods: {
    saveSetting () {
      const userData = JSON.parse(JSON.stringify(this.$auth.user))
      userData.notification = this.notification
      this.$store.dispatch('customer/updateProfile', userData)
    }
  },
  beforeDestroy() {

  }
}
</script>

<style scoped>

</style>
