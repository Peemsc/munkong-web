<template>
  <div class="setting-sidebar">
    <div class="bgroup">
      <div class="user-infos">
        <div class="cols" v-if="avatar">
          <div class="avatar" :style="{ backgroundImage: 'url(' + avatar + ')' }"></div>
        </div>
        <div class="cols" v-if="!avatar">
          <img  src="../assets/img/icons/Default_User_Photo.svg" class="avatar"/>
        </div>
        <div class="cols pl-3">
          <h4 v-if="$auth.user.userName">{{ $auth.user.userName }}</h4>
          <h4 v-if="!$auth.user.userName">{{ $auth.user.custId }}</h4>
          <p class="level">Platinum</p>
          <p class="point"><span class="icons">P</span> {{ parseInt($auth.user.customerPoint) }}</p>
        </div>
      </div>

      <div class="user-infos d-block d-md-none">
        <a href="/member/all-notification">
          <button class="btn btn-icon btn-menu-notification" type="button">
            <span class="badge">
              <p v-if="notifications.filter(notification =>
              notification.status === false).length != 0" class="text-center" style="margin: 2.2px;">{{ notifications.filter(notification =>
    notification.status === false).length }} </p>
            </span>
            <span class="group">
              <span class="icons-notification"></span>
            </span>
          </button>
        </a>
      </div>

      <div class="user-infos d-block d-md-none">
        <a href="/cart">
          <button class="btn btn-icon btn-menu-shop" type="button">
            <span class="badge" v-if="getCart.items.length != 0">
              <p  class="text-center" style="margin: 2.2px;"> {{ getCart.items.length }} </p>
            </span>
            <span class="group">
              <span class="icons-shop"></span>
            </span>
          </button>
        </a>
      </div>

      <button class="btn btn-icon btn-menu-setting" type="button" data-toggle="collapse" data-target="#navCollapse">
        <span class="group">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div><!--bgroup-->

    <div id="navCollapse" class="bgroup-collapse collapse">

      <hr class="m-0">
      <div class="bgroup mb-auto">

        <ul class="nav nav-setting">
          <li :class="{ 'active': isActive('/member/') }">
            <a href="/member/?status=all">
              <img class="svg-js" src="/img/icons/nav/icon-list.svg" alt="">
              {{ $t('purchasingStatus') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/favorites') }">
            <a href="/member/favorites">
              <img class="svg-js" src="/img/icons/nav/icon-favarite.svg" alt="">
              {{ $t('favorite') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/buy-again') }">
            <a href="/member/buy-again">
              <img class="svg-js" src="/img/icons/nav/icon-refresh.svg" alt="">
              {{ $t('buyAgain') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/my-coupon') }">
            <a href="/member/my-coupon">
              <img class="svg-js" src="/img/icons/nav/icon-coupon.svg" alt="">
              {{ $t('myCoupon') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/my-profile') }">
            <a href="/member/my-profile">
              <img class="svg-js" src="/img/icons/nav/icon-user.svg" alt="">
              {{ $t('editProfile') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/my-address') }">
            <a href="/member/my-address">
              <img class="svg-js" src="/img/icons/nav/icon-pin.svg" alt="">
              {{ $t('myAddress') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/my-password') }">
            <a href="/member/my-password">
              <img class="svg-js" src="/img/icons/nav/icon-lock.svg" alt="">
              {{ $t('changePassword') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/warranty') }">
            <a href="/member/warranty">
              <img class="svg-js" src="/img/icons/nav/icon-warranty.svg" alt="">
              {{ $t('checkWarranty') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/claim') }">
            <a href="/member/claim">
              <img class="svg-js" src="/img/icons/nav/icon-claim.svg" alt="">
              {{ $t('notifyClaim') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/notification') }">
            <a href="/member/notification">
              <img class="svg-js" src="/img/icons/nav/icon-notify.svg" alt="">
              {{ $t('settingNotification') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/help-center') }">
            <a href="/member/help-center">
              <img class="svg-js" src="/img/icons/nav/icon-info.svg" alt="">
              {{ $t('helpCenter') }}
            </a>
          </li>
          <li :class="{ 'active': isActive('/member/contact') }">
            <a href="/contact">
              <img class="svg-js" src="/img/icons/nav/icon-mail.svg" alt="">
              {{ $t('contact') }}
            </a>
          </li>
        </ul>
      </div><!--bgroup-->

      <hr class=" m-0 ">

      <div class="bgroup">
        <ul class="nav nav-setting">
          <li class="active logout" style="cursor: pointer;">
            <a @click="logout">
              <img class="svg-js" src="/img/icons/nav/icon-logout.svg" alt="">
              {{ $t('logout') }}
            </a>
          </li>
        </ul>
      </div><!--bgroup-->
    </div><!--bgroup-collapse-->
    <ModalLogoutSidebarMember @logout="logout" />
  </div><!--setting-sidebar-->
</template>

<script>
import ModalLogoutSidebarMember from './modal/ModalLogoutSidebarMember.vue';

// import socket from "~/plugins/socket.io.js";

export default {
    name: "SideBarMember",
    data() {
        return {
            isLoggedIn: false,
            notifications: [],
            avatar: ""
        };
    },
    async fetch() {
        this.isLoggedIn = this.$auth.loggedIn;
        if (this.isLoggedIn) {
            const result = await this.$store.dispatch("notification/fetchNotification", this.$auth.user._id);
            this.notifications = JSON.parse(JSON.stringify(result));
        }
        await this.$store.dispatch("brand/fetchBrand");
        await this.$store.dispatch("product/fetchAllProduct");
    },
    beforeMount() {
        if (this.isLoggedIn) {
            const custId = this.$auth.user._id;
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
        isMobile() {
            return this.$store.state.isMobile;
        },
        getCart() {
            return this.$store.state.cart.cart;
        },
    },
    created() {
        this.avatar = this.$auth.user.avatar;
        this.isLoggedIn = this.$auth.loggedIn;

    },
    methods: {

        isActive(route) {
            if (this.$route.path === route) {
                return true;
            }
            return false;
        },
        logout() {
          $('#logoutModalSideBarMember').appendTo('body').modal('show');
            this.isLoggedIn = false;
        }
    },
    components: { ModalLogoutSidebarMember }
}
</script>

<style scoped>
/* Dev Joey Custom */

/* Noti */
.btn.btn-menu-notification {
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  background-color: rgba(17, 17, 17, 0.2) !important;
  display: block;
}

.btn.btn-menu-notification .group {
  height: 15px;
}

.btn-menu-notification .group span:nth-child(1) {
  top: -11px;
  left: -7px;
}

.icons-notification {
  background-image: url(../assets/img/icons/icon-notification.svg);
  background-position: center;
  width: 30px;
  height: 32px;
  background-size: 14px;
  background-repeat: no-repeat;
}

.btn.btn-menu-notification .group span:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  transition: all 0.25s ease-in-out;
}

.btn-icon .group span {
  border-top: 2.5px solid #fff;
}

.btn-icon .group {
  width: 16px;
}



.btn.btn-menu-notification {
  top: 50%;
  right: 20%;
  width: 30px;
  height: 30px;
  margin-top: -20px;
}

/* Shop */
.btn.btn-menu-shop {
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  background-color: rgba(17, 17, 17, 0.2) !important;
  display: block;
}

.btn.btn-menu-shop .group {
  height: 15px;
}

.btn-menu-shop .group span:nth-child(1) {
  top: -11px;
  left: -7px;
}

.icons-shop {
  background-image: url(../assets/img/icons/icon-cart.svg);
  background-position: center;
  width: 30px;
  height: 35px;
  background-size: 14px;
  background-repeat: no-repeat;
  border-top: 0px !important;
}

.btn.btn-menu-shop .group span:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  transition: all 0.25s ease-in-out;
}

.btn-icon .group span {
  border-top: 2.5px solid #fff;
}

.btn-icon .group {
  width: 16px;
}



.btn.btn-menu-shop {
  top: 50%;
  right: 10%;
  width: 30px;
  height: 30px;
  margin-top: -20px;
}

.btn.btn-menu-setting {
  top: 50%;
  right: 0;
  width: 30px;
  height: 30px;
  margin-top: -20px;
}

.btn-icon .group span:nth-child(1) {
  top: 2;
}

.btn-icon .group span:nth-child(2) {
  top: 5px;
}

.btn-icon .group span:nth-child(3) {
  top: 10px;
}

.btn.btn-menu-setting[aria-expanded="true"] .group span:nth-child(1) {
  transition: transform 0.33s 0.45s cubic-bezier(0.72, 0.01, 0.28, 0.98);
  transform: rotate(35deg) translate3d(3px, 4px, 0);
}

.btn.btn-menu-setting[aria-expanded="true"] .group span:nth-child(3) {
  transition: transform 0.33s 0.45s cubic-bezier(0.72, 0.01, 0.28, 0.98);
  transform: rotate(-45deg) translate3d(3px, -4px, 0);
}


.user-infos .badge {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--red-dark);
  color: #fff;
  position: absolute;
  top: -12px;
  right: -10px;
  z-index: 999;
}

@media (max-width: 1024px) {

.user-infos .badge {
   top: -8px;
  right: -8px;
}

}</style>
