<template>
  <div>
    <header class="header">
      <div class="container-fluid mt-1 mt-lg-0">
        <button class="btn btn-icon navbar-toggle" type="button">
          <span class="group">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div class="navbar-brand">
          <a href="/">
            <img src="../assets/img/munkong-logo.svg?v=1" alt="" />
          </a>
        </div>

        <div class="search-genaral dropdown">
          <div class="form-group" data-toggle="dropdown" data-display="static">
            <input  class="form-control" :placeholder="$t('searchPlaceholder')" v-model="search"
              @keypress.enter="allProduct" />
            <span class="icons icon-search"></span>
          </div>

          <div class="dropdown-menu" style="overflow: auto" @click="keepDropdownActive">
            <ul class="nav">
              <template v-if="searchBrand.length > 0">
                <li class="title text-wrap"><span>{{ $t('brands') }}</span></li>
                <li v-for="(brand, index) in searchBrand" :key="index" class="position-relative border-bottom "
                  v-if="index < 3">
                  <a :href="'/select-brands/?b=' + brand._id" class="d-flex align-items-center py-3 brand-list"
                    style="background-color: #F3F3F5">
                    <img v-if="brand.logo != null" class="img-fluid search-icon-custom" :src="brand.logo" />
                    <img v-else src="/img/thumb/frame-100x100.png?v=1" class="img-fluid search-icon-custom" />
                    <div class=" d-flex">
                      <h5 class="text-wrap go-to">{{ $t('goTo') }} {{ brand.brandName }}</h5>
                    </div>
                  </a>

                  <a class="btn btn-allbrand text-wrap" :href="'/select-brands/?b=' + brand._id">
                    {{ $t("viewPromotion") }}
                  </a>
                </li>
              </template>
              <template v-else>
                <li class="title">
                  <span>{{ $t("remindMe") }}</span>
                </li>
              </template>
              <template v-if="searchProduct.length > 0">
                <div class="border-top-black">
                  <li class="title mt-3"><span>{{ $t('product') }}</span></li>
                  <li v-for="product in searchProduct" :key="product._id">
                    <a class="f-16" :href="'/product/detail?p=' + product._id">{{
                      product.itemDescription
                    }}</a>
                  </li>
                </div>
              </template>
            </ul>
          </div>
          <!--dropdown-menu-->
        </div>

        <div class="page-icon search">
          <a href="#"><span class="icons search"></span></a>
        </div>

        <div v-if="!isLoggedIn && !isMobile"></div>

        <!-- notification -->
        <div class="page-icon notify dropdown d-sm-block d-none" v-if="isLoggedIn && !isMobile">
          <a data-toggle="dropdown" data-display="static"><span class="icons main"></span>
            <span v-if="notifications.filter(notification =>
              notification.status === false).length != 0" class="badge-noti">{{ notifications.filter(notification =>
    notification.status === false).length }}</span>
          </a>
          <div class="dropdown-menu notify">
            <ul class="nav">
              <li>
                <h5 class="title">{{ $t("notification") }}</h5>
              </li>
              <li>
                <div class="card-notify" v-for="(notification, index) in notifications" :key="index"
                  :class="{ 'card-notify--unread': notification.status, 'card-notify': !notification.status }"
                  @click="updateNotificationStatus(notification)">
                  <a class="card-link" :href="notification.link" v-if="notification.link"></a>
                  <a class="card-link" :href="`/member/?status=all`" v-if="notification.type === 'order'"></a>
                  <a class="card-link" :href="`/promotion/promotion-detail?p=${notification?.promotionLink}`" v-if="notification.type === 'promotion' && notification.promotionLink"></a>
                  <a class="card-link" :href="`/promotion`" v-if="notification.type === 'promotion' && !notification.promotionLink"></a>
                  <div class="card-photo">
                    <div v-if="notification.image" class="photo" :style="{
                      backgroundImage: 'url(' + notification.image + ')',
                    }"></div>
                    <div class="card-photo" v-else-if="notification.type === 'news'">
                      <img :src="filterNews.map(item => item.homeCover)" class="img-notify" alt="" height="60px">
                    </div>
                    <div class="card-photo" v-else-if="notification.type === 'coupon'">
                      <img src="../assets/img/icons/nav/coupon-noti.svg" class="img-notify" alt="">
                    </div>
                    <div class="card-photo" v-else-if="notification.type === 'promotion'">
                      <img src="../assets/img/icons/nav/promotion-noti.svg" class="img-notify" alt="">
                    </div>
                  </div>
                  <div class="card-body">
                    <h3>{{ notification.title }}</h3>
                    <p>{{ notification.detail }}</p>
                    <div class="dategroup">
                      <div>
                        <span class="icons icon-calendar"></span>
                        {{ notification.updatedAt | luxon("date_short") }}
                      </div>
                      <div>
                        <span class="icons icon-clock"></span>
                        {{ notification.updatedAt | luxon("T") }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li class="viewmore">
                <a href="/member/all-notification">{{ $t("viewAll") }}
                  <span class="icons icon-arrow-tail"></span></a>
              </li>
            </ul>
          </div>
        </div>

        <div class="page-icon cart d-sm-block d-none" v-if="!isMobile">
          <a href="/cart">
            <span class="icons main">
              <span v-if="getCart.items.length != 0" class="badge">{{ getCart.items.length }}</span>
            </span>
          </a>
        </div>
        <div v-if="!isMobile && isLoggedIn">
          <div class="page-icon profile">
            <a href="#" data-toggle="dropdown" data-display="static">
              <span v-if="data.avatar != null" class="icons main" :style="{
                'background-size': '35px',
                'background-image': 'url(' + data.avatar + ')',
              }"></span>
              <span v-else class="icon-profile-nopic"></span>
            </a>
            <div class="dropdown-menu profile">
              <ul class="nav">
                <li v-if="!isLoggedIn">
                  <div class="hgroup d-flex">
                    <span class="icons main"></span>
                    <a href="/auth/sign-in">{{ $t("login") }}</a>
                    <span class="line"></span>
                    <span class="icons-regis main"></span>
                    <a href="/auth/register">{{ $t("register") }}</a>
                  </div>
                </li>
                <template v-if="isLoggedIn">
                  <li>
                    <div class="hgroup d-flex">
                      <span v-if="data.avatar != null" class="icons-profile main"
                        :style="{ backgroundImage: 'url(' + data.avatar + ')' }"></span>
                      <span v-else class="icons-profile main"></span>

                      <a v-if="$auth.user.userName != null" href="/member/my-profile">{{ $auth.user.userName }}</a>
                      <a v-if="$auth.user.userName == null" href="/member/my-profile">{{ $auth.user.custId }}</a>
                    </div>
                  </li>
                  <li>
                    <a href="/cart"><span class="icons icon-cart"></span>{{ $t("cart") }}</a>
                  </li>
                  <li>
                    <a href="/member/favorites"><span class="icons icon-heart"></span>{{ $t("favorite") }}</a>
                  </li>
                  <li>
                    <a href="/member/?status=all"><span class="icons icon-list"></span>{{ $t("purchasingStatus") }}</a>
                  </li>
                  <li>
                    <a href="/member/notification"><span class="icons icon-notify"></span>{{ $t("settingNotification") }}
                    </a>
                  </li>
                  <li>
                    <a href="/member/warranty"><span class="icons icon-warranty"></span>{{ $t("checkWarranty") }}
                    </a>
                  </li>
                  <li class="nav-logout">
                    <a data-target="#logoutModal" data-toggle="modal">{{
                      $t("logout")
                    }}</a>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="!isMobile && !isLoggedIn">
          <div class="page-icon profile">
            <a href="#" data-toggle="dropdown" data-display="static">
              <span v-if="data.avatar != null" class="icons main" :style="{
                'background-size': '35px',
                'background-image': 'url(' + data.avatar + ')',
              }"></span>
              <span v-else class="icons main"></span>
            </a>
            <div class="dropdown-menu profile">
              <ul class="nav">
                <li v-if="!isLoggedIn">
                  <div class="hgroup d-flex">
                    <span class="icons main"></span>
                    <a href="/auth/sign-in">{{ $t("login") }}</a>
                    <span class="line"></span>
                    <span class="icons-regis main"></span>
                    <a href="/auth/register">{{ $t("register") }}</a>
                  </div>
                </li>
                <template v-if="isLoggedIn">
                  <li>
                    <div class="hgroup d-flex">
                      <span v-if="data.avatar != null" class="icons-profile main"
                        :style="{ backgroundImage: 'url(' + data.avatar + ')' }"></span>
                      <span v-else class="icons-profile main"></span>

                      <a href="/member/my-profile">{{ $auth.user.custId }}</a>
                    </div>
                  </li>
                  <li>
                    <a href="/cart"><span class="icons icon-cart"></span>{{ $t("cart") }}</a>
                  </li>
                  <li>
                    <a href="/member/favorites"><span class="icons icon-heart"></span>{{ $t("favorite") }}</a>
                  </li>
                  <li>
                    <a href="/member/?status=all"><span class="icons icon-list"></span>{{ $t("purchasingStatus") }}</a>
                  </li>
                  <li>
                    <a href="/member/notification"><span class="icons icon-notify"></span>{{ $t("settingNotification") }}
                    </a>
                  </li>
                  <li>
                    <a href="/member/warranty"><span class="icons icon-warranty"></span>{{ $t("checkWarranty") }}
                    </a>
                  </li>
                  <li class="nav-logout">
                    <a data-target="#logoutModal" data-toggle="modal">{{
                      $t("logout")
                    }}</a>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <div class="page-lang th">
          <div class="lang-title">
            <a :class="{ th: $i18n.locale === 'th' }" @click="switchLocale('th')">TH </a>
            <span>/</span>
            <a :class="{ th: $i18n.locale === 'en' }" @click="switchLocale('en')">EN</a>
          </div>
        </div>
      </div>
      <!--container-->
    </header>
    <!-- desktop sidebar -->
    <div class="navbar-sidebar d-none d-md-block">
      <div class="hgroup">
        <button class="btn btn-icon navbar-toggle" type="button">

          <img class="" src="../assets/img/icons/icon-x.svg?v=1" alt="" height="20px" />
        </button>

        <div class="navbar-brand">
          <h3 class="text-white" style="font-weight: 200">

            {{ $t("closeMenu") }}
          </h3>
        </div>
      </div>
      <div class="navbar-inner">
        <ul class="nav nav-main">
          <li :class="{ active: $route.path === '/' }">
            <a href="/"><span>{{ $t("home") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/product' }">
            <a href="/product"><span>{{ $t("product") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/promotion' }">
            <a href="/promotion"><span>{{ $t("promotion") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/all-coupon' }">
            <a href="/all-coupon"><span>{{ $t("allCoupon") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/payment' }">
            <a href="/payment"><span>{{ $t("paymentMethod") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/warranty-claim' }">
            <a href="/warranty-claim"><span>{{ $t("warrantyClaim") }}</span></a>
          </li>
          <li>
            <a href="/news"><span>{{ $t("newsBlog") }}</span></a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/munkonggadget/"><span>{{ $t("facebook") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/contact' }">
            <a href="/contact"><span>{{ $t("contactUs") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/about-us' }">
            <a href="/about-us"><span>{{ $t("aboutUs") }}</span></a>
          </li>

          <div class="bg-menu-auth mt-4" v-if="!isLoggedIn">
            <div class="">
              <img class="icons-user-auth img-fluid mt-2" src="../assets/img/icons/User_Login.svg?v=1" alt="" />
              <a class="text-auth-signin" href="/auth/sign-in">{{
                $t("login")
              }}</a>
            </div>
            <div class="horizontal-divider"></div>
            <div class="mt-3">
              <img class="icons-register-auth" src="../assets/img/icons/Register.svg?v=1" alt="" />
              <a class="text-register-signin" href="/auth/register">{{
                $t("register")
              }}</a>
            </div>
          </div>
          <div class="bg-menu-auth mt-4" v-if="isLoggedIn">
            <div>
              <img v-if="data.avatar != null" class="icons-profile-loggedIn" style="border-radius: 50%"
                :src="data.avatar" />
              <img v-else class="icons-profile-loggedIn" src="../assets/img/icons/User_Login.svg?v=1" />
              <a v-if="data.avatar != null" class="text-auth-signin-isloggedIn" href="/member/my-profile">{{
                $auth.user.userName ? $auth.user.userName : $auth.user.custId }}
              </a>
              <a v-else class="text-auth-signin-isloggedIn" href="/member/my-profile">{{ $auth.user.userName ?
                $auth.user.userName : $auth.user.custId }}
              </a>
            </div>
            <div class="horizontal-divider my-2"></div>
            <div style="cursor: pointer">
              <img class="icons-exit-auth" src="../assets/img/icons/Logout.svg?v=1" alt="" />
              <a class="text-register-signin" data-target="#logoutModal" data-toggle="modal">
                {{ $t("logout") }}</a>
            </div>
          </div>
        </ul>
      </div>
      <!--navbar-inner-->
    </div>
    <!-- mobile sidebar -->
    <div class="navbar-sidebar d-block d-md-none">
      <div class="hgroup">
        <button class="btn btn-icon navbar-toggle" type="button">
          <img class="" src="../assets/img/icons/icon-x.svg?v=1" alt="" height="15px" />
        </button>

        <div class="navbar-brand">

        </div>
        <img src="../assets/img/munkong-logo.svg?v=1" alt="" class="img-fluid" width="120px" />
      </div>
      <div class="navbar-inner">
        <ul class="nav nav-main">
          <li :class="{ active: $route.path === '/' }">
            <a href="/"><span>{{ $t("home") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/product' }">
            <a href="/product"><span>{{ $t("product") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/promotion' }">
            <a href="/promotion"><span>{{ $t("promotion") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/all-coupon' }">
            <a href="/all-coupon"><span>{{ $t("allCoupon") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/payment' }">
            <a href="/payment"><span>{{ $t("paymentMethod") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/warranty-claim' }">
            <a href="/warranty-claim"><span>{{ $t("warrantyClaim") }}</span></a>
          </li>
          <li>
            <a href="/news"><span>{{ $t("newsBlog") }}</span></a>
          </li>
          <li>
            <a href="#"><span>{{ $t("facebook") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/contact' }">
            <a href="/contact"><span>{{ $t("contactUs") }}</span></a>
          </li>
          <li :class="{ active: $route.path === '/about-us' }">
            <a href="/about-us"><span>{{ $t("aboutUs") }}</span></a>
          </li>

          <div class="bg-menu-auth mt-4" v-if="!isLoggedIn">
            <div class="d-flex">
              <img class="icons-user-auth img-fluid mt-2" src="../assets/img/icons/User_Login.svg?v=1" alt="" />
              <a class="text-auth-signin" href="/auth/sign-in">{{
                $t("login")
              }}</a>
            </div>
            <div class="horizontal-divider"></div>
            <div class="mt-2">
              <img class="icons-register-auth" src="../assets/img/icons/Register.svg?v=1" alt="" />
              <a class="text-register-signin" href="/auth/register">{{
                $t("register")
              }}</a>
            </div>
          </div>
          <div class="bg-menu-auth mt-4" v-if="isLoggedIn">

            <div class="d-flex">
              <img v-if="data.avatar != null" class="icons-profile-loggedIn" style="border-radius: 50%"
                :src="data.avatar" />
              <img v-else class="icons-profile-loggedIn" src="../assets/img/icons/User_Login.svg?v=1" />

              <a v-if="data.avatar != null" class="text-auth-signin-isloggedIn" href="/member/my-profile">{{
                $auth.user.userName ? $auth.user.userName : $auth.user.custId }}
              </a>
              <a v-else class="text-auth-signin-isloggedIn" href="/member/my-profile">{{ $auth.user.userName ?
                $auth.user.userName : $auth.user.custId }}
              </a>

            </div>
            <div class="horizontal-divider my-2"></div>
            <div class="mt-2">
              <img class="icons-exit-auth" src="../assets/img/icons/Logout.svg?v=1" alt="" />
              <a class="text-register-signin" @click="logoutNav">
                {{ $t("logout") }}</a>
            </div>
          </div>
        </ul>
      </div>
      <!--navbar-inner-->
    </div>
    <ModalLogout @logout="logout" />
  </div>
</template>

<script>
import ModalLogout from "@/components/modal/ModalLogout";
// import socket from "~/plugins/socket.io.js";

export default {
  name: "Header",
  components: { ModalLogout },
  data() {
    return {
      image: null,
      isLoggedIn: false,
      notifications: [],
      search: "",
      data: {
        avatar: this.$auth.user?.avatar,
      },
      filter: 'news',
      nowPage: 1,
    };
  },
  async fetch() {
    this.isLoggedIn = this.$auth.loggedIn;
    if (this.isLoggedIn) {
      const result = await this.$store.dispatch(
        "notification/fetchNotification",
        this.$auth.user._id
      );
      this.notifications = JSON.parse(JSON.stringify(result));
    }
    await this.$store.dispatch("brand/fetchBrand");
    await this.$store.dispatch("product/fetchAllProduct");
    await this.fetchNews()
  },
  beforeMount() {
    if (this.isLoggedIn) {
      const custId = this.$auth.user._id
      // socket.on('new-system-notification', async (data) => {
      //   const result = await this.$store.dispatch(
      //     "notification/fetchNotification",
      //     this.$auth.user._id
      //   );
      //   this.notifications = JSON.parse(JSON.stringify(result));
      //   // if (data !== null && (data.to === "all" || data.receive === custId) && data.ignoreId.indexOf(custId) === -1) {
      //   //   this.notifications.unshift(data);
      //   //   if (this.notifications.length > 5) {
      //   //     this.notifications.pop();
      //   //   }
      //   // }
      // })
      // socket.on("new-notification", (notification) => {
      //   if (
      //     notification !== null &&
      //     (notification.to === "all" ||
      //       notification.receive === this.$auth.user._id)
      //   ) {
      //     this.notifications.unshift(notification);
      //     if (this.notifications.length > 5) {
      //       this.notifications.pop();
      //     }
      //   }
      // });
    }
  },
  mounted() {
    this.$store.commit("cart/GET_CART");
  },
  computed: {
    filterNews() {
      return this.$store.state.news.newsList
    },
    pagination() {
      return this.$store.state.news.pagination
    },
    isMobile() {
      return this.$store.state.isMobile;
    },
    getCart() {
      return this.$store.state.cart.cart;
    },
    searchBrand() {
      if (this.search !== '') {
        return this.$store.getters["brand/search"](this.search);
      }
      return []
    },
    searchProduct() {
      if (this.search !== '') {
        return this.$store.getters["product/search"](this.search);
      }
      return []
    },
  },
  methods: {
    keepDropdownActive(event) {
      event.stopPropagation();
    },
    async fetchNews() {
      const queryFilter = {
        page: 1,
        type: this.filter
      }
      await this.$store.dispatch('news/fetchNews', queryFilter)
    },
    updateNotificationStatus(notification) {
      const payload = { params: { _id: notification._id }, update: { status: true } }
      this.$store.dispatch('notification/updateNotificationStatus', payload)
    },
    allProduct() {
      window.location.href = "/product?search=" + this.search;
    },
    switchLocale(lang) {
      this.$i18n.setLocale(lang);
      localStorage.setItem("lang", lang);
    },
    logout() {
      this.isLoggedIn = false;
      window.location.href = "/";
    },
    async logoutNav() {
      try {
        const result = await this.$auth.logout();
        this.$emit("logout");
        window.location.href = "/";
      } catch (e) {
        // console.log(e);
      }
    },
  },
};
</script>

<style scoped>
/* .logo-brand {
  box-shadow: 0px 10px 10px 10px #000;
} */

.search-genaral .brand-list {
  display: flex;
  gap: 15px
}

.go-to {
  font-size: 16px;
  font-weight: 500;
}

.border-bottom {
  border-bottom: 1px solid #000000;
}

.nav-main {
  margin: 0 30px;
}

.nav-main>li>a {
  color: #000 !important;
  font-weight: 500;
}

.bg-menu-auth {
  border-radius: 10px;
  background: rgba(17, 17, 17, 0.07);
  /* margin: 10px; */
  font-family: var(--f-noto-thai);

  padding: 0.7rem;
  height: auto;
}

.bg-menu-auth>div {
  display: flex;
  gap: 10px;
  align-items: center;
}

.icons-user-auth {
  padding: 0px;
  margin: 0px 5px 10px 10px;
  border-radius: 50px;
  background-color: #ffd800;
  width: 38px;
  height: 38px;
}

.icons-register-auth {
  padding: 0px;
  margin: 0px 5px 10px 10px;
  border-radius: 50%;
  background-color: #ffd800;
  width: 38px;
  height: 38px;

  flex-shrink: 0;
}

.icons-exit-auth {
  padding: 0px;
  border-radius: 50%;
  background-color: #ffd800;
  width: 38px;
  height: 38px;

  flex-shrink: 0;
}

.text-auth-signin {
  font-size: 1.15rem;
  font-weight: 400;
  display: inline-flex;
  line-height: 1.1;
}

.text-auth-signin-isloggedIn,
.text-register-signin {
  font-size: 1.15rem;
  font-weight: 400;
  display: inline-flex;
  line-height: 1.1;
}

.horizontal-divider {
  border-top: 1px solid rgba(17, 17, 17, 0.5);
  /* solid line with a width of 1px and a color of #333 */
}



.icons-profile-loggedIn {

  border: 0;
  background-color: unset;
  width: 38px;
  height: 38px;
}

.dropdown-menu.profile .hgroup .icons-profile {
  margin: 10px 5px 10px 10px;
  border: 0;
  background-color: unset;
  background-image: url(../assets/img/icons/Default_User_Photo.svg);
  background-size: 40px;
  background-repeat: no-repeat;
  min-width: 38px;
  min-height: 38px;
}

.icon-profile-nopic {
  margin: auto;
  border: 0;
  background-color: unset;
  background-image: url(../assets/img/icons/Default_User_Photo.svg);
  background-size: 38px;
  background-repeat: no-repeat;
  min-width: 38px;
  min-height: 38px;
}

.page-icon .icons-profile.main {
  margin: auto;
  width: 38px;
  height: 38px;
  background-size: 18px;
  border: 2px solid #fff;
  border-radius: 50%;
}

.btn.btn-icon {
  height: 40px;
  line-height: 17px;
  top: 0;
  opacity: 1 !important;
}

.btn-allbrand {
  position: absolute;
  display: flex !important;
  align-items: center !important;
  padding: 5px 10px !important;
  background-color: #FFFF00 !important;
  border: none;
  right: 25px;
  top: 17px;
  z-index: 10;
  font-size: 18px !important;
  font-weight: 600;
  border: 2px solid #000;
}

/* .all-brand-p {
  color: #000;
  font-size: 14px !important;
  font-weight: bold;
} */
.border-top-black {
  border-top: 2px solid #000;
}

.search-icon-custom {
  width: 115px;
  height: 44px;
  box-shadow: 1px 1px 10px 0px #0000008c;
  flex-shrink: 0;
}

@media (max-width: 1440px) {
  .bg-menu-auth {
    width: 100%;
    height: auto;
  }

  .nav-main {
    margin: 0 20px;
  }
}

@media (max-width: 1194px) {
  .btn {
    line-height: 35px;
    height: 35px;

  }

  .search-genaral .nav li a,
  .search-genaral .nav li span {
    padding: 3px 20px;
  }

  .search-icon-custom {
    width: 86px;
    height: 33px;
  }

  .go-to {
    left: 30%;
    top: 38%;
    font-size: 16px;
  }

  .btn-allbrand {
    right: 18px;
    top: 16px;
    font-size: 14px !important;
  }

}

@media (max-width: 1366px) {
  .go-to {
    left: 34%;
    font-size: 16px;
    top: 40%;
  }
}

@media (max-width: 1024px) {
  .search-icon-custom {
    width: 100px;
    height: 40px;
  }

  .go-to {
    left: 30%;
    font-size: 16px;
    top: 40%;
  }

  .btn-allbrand {
    right: 18px;
    top: 18px;
  }

  .icons-profile-loggedIn,
  .icons-exit-auth {
    width: 32px;
    height: 32px;
  }

  .text-auth-signin-isloggedIn,
  .text-register-signin {
    font-size: 1.1rem
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .search-icon-custom {
    width: 100px;
    height: 40px;
  }

  .go-to {
    left: 21%;
    font-size: 16px;
    top: 40%;
  }


  .btn-allbrand {
    right: 18px;
    top: 18px;
  }
}

@media (max-width: 767px) {
  .icon-profile-nopic {
    min-width: 32px;
    min-height: 32px;
    background-size: contain;
  }

}

@media (max-width: 576px) {
  .search-icon-custom {
    width: 87px;
    height: 33px;
  }

  .go-to {
    font-size: 10px;
    left: 32%;
    top: 40%;
  }


  .btn-allbrand {
    right: 10px;
    top: 16px;
  }

  @media (max-width: 412px) {
    .go-to {
      font-size: 10px;
      left: 35%;
      top: 40%;
    }
  }
}
</style>
