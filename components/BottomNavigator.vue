<template>
  <nav class="nav container">
    <!-- <a href="#" class="nav__logo">Marlon</a>
    {{ isLoggedIn }} -->

    <div class="nav__menu nav__menu_mobile" id="nav-menu">
      <ul class="nav nav__list">
        <li class="nav__item">
          <a href="/" class="nav__link active-link">
            <img class="nav_icon" src="/img/navbottom/icon-home.png" />
          </a>
        </li>

        <li class="nav__item">
          <a href="/product" class="nav__link">
            <img class="nav_icon" src="/img/navbottom/icon-product.png" />
          </a>
        </li>

        <li class="nav__item">
          <span class="nav__link" @click="toggleSearch">
            <img class="nav_icon" src="/img/navbottom/icon-search.png" />
          </span>
        </li>

        <li class="nav__item position-relative">
          <a href="/cart" class="nav__link">
            <img class="nav_icon" src="/img/navbottom/icon-cart.png" />
            <span v-if="getCart.items.length != 0" class="badge badge_cart">{{ getCart.items.length }}</span>
          </a>
        </li>

        <li class="nav__item mt-0 position-relative">
          <a :href="!isLoggedIn ? '/auth/sign-in' : '/member/'" class="nav__link">
            <img v-if="!isLoggedIn" class="nav_icon" src="/img/navbottom/icon-profile.png"/>
            <img v-if="avatar && isLoggedIn" :src="avatar" class="avatar nav_icon" />
            <img v-if="!avatar && isLoggedIn" src="../assets/img/icons/Default_User_Photo.svg" class="avatar nav_icon"/>
            <span class="badge badge_avatar"  v-if="notifications.filter(notification =>
              notification.status === false).length != 0">
              {{ notifications.filter(notification => notification.status === false).length }}
            </span>
          </a>
        </li>
      </ul>
    </div>

    <img src="assets/img/perfil.png" alt="" class="nav__img">
  </nav>
</template>

<script>
// import socket from "~/plugins/socket.io.js";
export default {
  name: "BottomNavigator",
  data() {
    return {
      isLoggedIn: false,
      notifications: [],
      avatar: '',
    }
  },
  async created() {
    this.isLoggedIn = this.$auth.loggedIn
    if (this.isLoggedIn) {
      const result = await this.$store.dispatch(
        "notification/fetchNotification",
        this.$auth.user._id
      );
      this.notifications = JSON.parse(JSON.stringify(result));
    }
    this.avatar = this.$auth.user?.avatar
  },
  beforeMount() {
    if (this.isLoggedIn) {
      const custId = this.$auth.user._id
      // socket.on('new-system-notification', async (data) => {
      //   console.log(data)
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
  computed: {
    getCart() {
      return this.$store.state.cart.cart;
    },
  },
  methods: {
    toggleSearch() {
      $('html').toggleClass("search-opened");
    }
  }
}
</script>

<style scoped>
.badge {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--red-dark);
  color: var(--white);
  font-size: 11px;
  line-height: 10px;
  font-weight: 600;
  font-family: var(--f-kanit);
  position: absolute;
  top: -7px;
  right: -9px;
}
 .avatar {
  border-radius: 50%;
  }


</style>
