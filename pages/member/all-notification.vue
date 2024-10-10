<template>
  <div class="section-setting" style="background-color: #f5f5f5;">
    <div class="container">
      <div class="container-inner mw-1200" style="background-color: #f5f5f5;">
        <div class="setting-content noti">
          <div class="bgroup d-flex align-items-center">
            <h3 class="title-24">
              <img class="w-32 mr-2" src="/img/icons//nav/icon-notify.svg" alt="">
              {{ $t('notification') }} <br><span class="note kanit f-16 d-none d-md-flex">{{ $t('youhave') }} {{
                notifications.length }} {{ $t('notification') }}</span>
            </h3>

            <div class="checkbox-group ml-auto">
              <input id="a1" type="checkbox" name="a" value="a1" v-model="isChecked">
              <label for="a1" class="kanit f-18 pr-0">{{ $t('allRead') }}</label>
            </div>


          </div><!--bgroup-->
          <div class="order-box d-md-block d-none" v-for="(notification, index) in notifications" :key="index"
            :style="{ backgroundColor: notification.status ? '#ffffff' : '#eff0f1' }"
            @click="updateNotificationStatus(notification)">
            <template>
              <div class="card-order cart noti">
                <div class="card-photo" v-if="notification.image">
                  <div class="photo" :style="{ backgroundImage: 'url(' + notification.image + ')' }"></div>
                </div>

                <div class="card-photo" v-else-if="notification.type === 'news'">
                  <img v-if="!filterNews.map(item => item.homeCover)" src="../../assets/img/icons/nav/news-noti.svg"
                    class="photo" alt="" />
                  <img v-else :src="filterNews.map(item => item.homeCover)" class="photo" alt="" />
                </div>
                <div class="card-photo" v-else-if="notification.type === 'coupon'">
                  <img src="../../assets/img/icons/nav/coupon-noti.svg" class="photo" alt="">
                </div>
                <div class="card-photo" v-else-if="notification.type === 'promotion'">
                  <img src="../../assets/img/icons/nav/promotion-noti.svg" class="photo" alt="">
                </div>

                <div class="card-body">
                  <div class="cols ml-0">
                    <h3>{{ notification.title }}</h3>
                    <p class="black-50">{{ notification.detail }}</p>
                    <div class="dategroup">
                      <div class="d-flex pr-3">
                        <span class="icons icon-calendar"></span> {{ notification.updatedAt | luxon('date_short') }}
                      </div>
                      <div class="d-flex">
                        <span class="icons icon-clock"></span> {{ notification.updatedAt | luxon('T') }}
                      </div>
                    </div>
                  </div>

                  <a class="cols price total mr-0" v-if="notification.type !== 'shipment' && notification.link"
                    :href="notification.link">
                    <div class="view-more">
                      <span>ดูรายละเอียด</span>
                      <i class="fas fa-angle-down rotate-icon"></i>
                    </div>
                  </a>

                  <a class="cols price total mr-0" v-if="notification.type === 'order'"
                    :href="`/member/purchase-detail?orderId=${notification.orderId}`">
                    <div class="view-more">
                      <span>ดูรายละเอียด</span>
                      <i class="fas fa-angle-down rotate-icon"></i>
                    </div>
                  </a>
                  <a class="cols price total mr-0" v-if="notification.type === 'promotion' && notification.promotionLink"
                    :href="`/promotion/promotion-detail?p=${notification?.promotionLink}`">
                    <div class="view-more">
                      <span>ดูรายละเอียด</span>
                      <i class="fas fa-angle-down rotate-icon"></i>
                    </div>
                  </a>
                  <a class="cols price total mr-0" v-if="notification.type === 'promotion' && !notification.promotionLink"
                    :href="`/promotion`">
                    <div class="view-more">
                      <span>ดูรายละเอียด</span>
                      <i class="fas fa-angle-down rotate-icon"></i>
                    </div>
                  </a>
                  <a class="cols price total mr-0" data-toggle="collapse" :href="'#moreDetail' + index" role="button"
                    aria-expanded="false" :aria-controls="'moreDetail' + index" v-if="notification.type === 'shipment'">
                    <div class="view-more">
                      <span>ดูรายละเอียด</span>
                      <i class="fas fa-angle-down rotate-icon"></i>
                    </div>
                  </a>
                </div><!--card-body-->
              </div><!--card-order-->
              <div class="collapse multi-collapse" :id="'moreDetail' + index"
                style="background: rgba(17, 17, 17, 0.03); width: 100%" v-if="notification.type === 'shipment'">
                <div class="card pt-4">
                  <div class="box-timeline" v-for="(shipStatus, indexShip) in notification.shipmentStatus"
                    :key="indexShip + 1">
                    <div class="entry">
                      <div class="indicator">
                        <span></span>
                      </div>
                      <p class="content">
                        <span style="font-weight: 500;">{{ getTitleShipment(shipStatus.status)['title'] }}</span>
                        <span style="color: rgba(17, 17, 17, 0.5); font-size: 12px">
                          {{ getTitleShipment(shipStatus.status)['detail'] }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

          </div><!--order-box-->

          <div class="order-box d-md-none d-block" v-for="(notification, index) in notifications" :key="index"
            :style="{ backgroundColor: notification.status ? '#ffffff' : '#eff0f1' }"
            @click="updateNotificationStatus(notification)">
            <template>
              <div class="card-order cart noti">
                <div class="card-photo" v-if="notification.image">
                  <div class="photo" :style="{ backgroundImage: 'url(' + notification.image + ')' }"></div>
                </div>

                <div class="card-photo" v-else-if="notification.type === 'news'">
                  <img v-if="!filterNews.map(item => item.homeCover)" src="../../assets/img/icons/nav/news-noti.svg"
                    class="photo" alt="" />
                  <img v-else :src="filterNews.map(item => item.homeCover)" class="photo" alt="" />
                </div>
                <div class="card-photo" v-else-if="notification.type === 'coupon'">
                  <img src="../../assets/img/icons/nav/coupon-noti.svg" class="photo" alt="">
                </div>
                <div class="card-photo" v-else-if="notification.type === 'promotion'">
                  <img src="../../assets/img/icons/nav/promotion-noti.svg" class="photo" alt="">
                </div>

                <div class="card-body">
                  <div class="cols ml-0">
                    <h3>{{ notification.title }}</h3>
                    <p class="black-50">{{ notification.detail }}</p>
                    <div class="dategroup">
                      <div class="d-flex pr-3">
                        <span class="icons icon-calendar"></span> {{ notification.updatedAt | luxon('date_short') }}
                      </div>
                      <div class="d-flex">
                        <span class="icons icon-clock"></span> {{ notification.updatedAt | luxon('T') }}
                      </div>
                    </div>
                  </div>

                  <a class="card-link" :href="notification.link" v-if="notification.link"></a>
                  <a class="card-link" :href="`/member/?status=all`" v-if="notification.type === 'order'"></a>
                  <a class="card-link" :href="`/promotion/promotion-detail?p=${notification?.promotionLink}`" v-if="notification.type === 'promotion' && notification.promotionLink"></a>
                  <a class="card-link" :href="`/promotion`" v-if="notification.type === 'promotion' && !notification.promotionLink"></a>
                </div><!--card-body-->
              </div><!--card-order-->
              <div class="collapse multi-collapse" :id="'moreDetail' + index"
                style="background: rgba(17, 17, 17, 0.03); width: 100%" v-if="notification.type === 'shipment'">
                <div class="card pt-4">
                  <div class="box-timeline" v-for="(shipStatus, indexShip) in notification.shipmentStatus"
                    :key="indexShip + 1">
                    <div class="entry">
                      <div class="indicator">
                        <span></span>
                      </div>
                      <p class="content">
                        <span style="font-weight: 500;">{{ getTitleShipment(shipStatus.status)['title'] }}</span>
                        <span style="color: rgba(17, 17, 17, 0.5); font-size: 12px">
                          {{ getTitleShipment(shipStatus.status)['detail'] }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

          </div><!--order-box-->
        </div><!--setting-content-->
      </div><!--container-inner-->
    </div><!--container-->
  </div><!--section-setting-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: 'only-header',
  data() {
    return {
      isLoggedIn: false,
      notifications: [],
      isChecked: false,
      filter: 'news',
      nowPage: 1,
    }
  },
  async fetch() {
    await this.fetchData()
    await this.fetchNews()
  },
  watch: {
    isChecked(value) {
      if (value) {
        this.updateAllNotificationsStatus()
        setTimeout(() => {
          this.fetchData()
        }, 1000);
      }
    }
  },

  computed: {
    filterNews() {
      return this.$store.state.news.newsList
    },
    pagination() {
      return this.$store.state.news.pagination
    },
    notificationStatus() {
      return this.$store.getters.notificationStatus
    },
    notificationsWithBackground() {
      if (this.notifications.status) {
        return this.notifications.map((notification) => {
          return {
            ...notification,
            backgroundColor: this.isAllRead ? '#eff0f1' : (notification.status ? '#eff0f1' : '#ffffff')
          }
        })
      } else {
        return this.notifications.status
      }
    },
    isAllRead() {
      return this.notifications.every(notification => notification.status === true)
    }
  },
  methods: {
    clickLink() {
      const check = this.notifications.filter(item => item.type == 'promotion')
      if (check) {
        this.$router.push(`/promotion/promotion-detail?p=${check.promotionLink}`)
      }
    },
    async fetchNews() {
      const queryFilter = {
        page: 1,
        type: this.filter
      }
      await this.$store.dispatch('news/fetchNews', queryFilter)
    },
    async fetchData() {
      this.isLoggedIn = this.$auth.loggedIn
      if (this.isLoggedIn) {
        const result = await this.$store.dispatch('notification/fetchNotificationAll', this.$auth.user._id)
        this.notifications = JSON.parse(JSON.stringify(result))
      }
    },
    updateAllNotificationsStatus() {
      this.notifications.forEach(notification => {
        const payload = { params: { _id: notification._id }, update: { status: true } }
        this.$store.dispatch('notification/updateNotificationStatus', payload)
      })
    },
    updateNotificationStatus(notification) {
      const payload = { params: { _id: notification._id }, update: { status: true } }
      this.$store.dispatch('notification/updateNotificationStatus', payload)
    },
    getTitleShipment(status) {

      let returnData = {
        title: '',
        detail: ''
      }

      if (status.status_code === '010') {
        returnData.title = 'สินค้าถูกจัดส่งแล้ว'
        returnData.detail = `${returnData.title} หมายเลขพัสดุ ${status.con_no}`
      } else if (status.status_code === '101') {
        returnData.title = 'รับพัสดุเข้าสาขา'
        returnData.detail = 'บริษัทขนส่งรับพัสดุเข้าสาขาต้นทาง'
      } else if (status.status_code === '102') {
        returnData.title = 'คัดแยกพัสดุ'
        returnData.detail = 'พัสดุถึงศูนย์คัดแยกสินค้า'
      } else if (status.status_code === '103') {
        returnData.title = 'กำลังจัดส่งปลายทาง'
        returnData.detail = 'พัสดุถึงสาขาปลายทาง'
      } else if (status.status_code === '045') {
        returnData.title = 'กำลังนำจ่ายพัสดุ'
        returnData.detail = 'กำลังนำจ่ายพุสดุไปยังผู้รับ'
      } else {
        returnData.title = 'จัดส่งสินค้าสำเร็จ'
        returnData.detail = 'กรุณาตรวจสอบสินค้าที่คุณได้รับ และรับสูงสุด 1 Munkong Coins หากคุณรีวิวสินค้าในคำสั่งซื้อ'
      }

      return returnData
    }
  }
}
</script>

<style scoped>
.order-box {
  padding: 0;
}

.box-timeline {
  width: 9%;
  position: relative;
  text-align: center;
}

.box-timeline::before {
  position: absolute;
  left: 50%;
  content: '';
  width: 2px;
  height: 100%;
  background-color: rgb(231, 230, 230);
  border-radius: 5px;
}

.entry {
  position: relative;
}

.indicator {
  position: absolute;
  top: -5px;
  left: calc(50% - 7px);
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.indicator span {
  position: relative;
  top: -5px;
  width: 10px;
  height: 10px;
  display: inline-block;
  background-color: #C4C4C4;
  border-radius: 50%;
}

.content {
  width: 30rem;
  margin-left: 50px;
  font-size: 12px;
  transform: translateY(-9px);
  text-align: right;
}

.entry:nth-child(odd) .content {
  margin-left: 5rem;
  text-align: left;
}

.content span {
  font-size: 17px;
  display: block;
  color: rgba(17, 17, 17, 0.5);
}

.entry:nth-child(even) .time {
  left: 53%;
}

@media only screen and (max-width: 1500px) {
  .container {
    margin: 0;
  }

  .entry:nth-child(even) .content,
  .entry:nth-child(odd) .content {
    margin-left: 50px;
    text-align: left;
  }

  .content {
    width: 30rem;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0;
  }

  .entry:nth-child(even) .content,
  .entry:nth-child(odd) .content {
    margin-left: 30px;
    text-align: left;
  }

  .content {
    width: 20rem;
  }
}

@media only screen and (max-width: 444px) {
  .container {
    margin: 0;
  }

  .entry:nth-child(even) .content,
  .entry:nth-child(odd) .content {
    margin-left: 30px;
    text-align: left;
  }

  .content {
    width: 12rem;
  }
}
</style>
