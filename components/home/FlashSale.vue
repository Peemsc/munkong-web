<template>
  <div v-if="flashSale">
    <div
      class="section pb-0 pt-3"
      style="background-color: #000000"
      v-if="isMobile"
    >
      <div class="flash-sale-header wow fadeIn">
        <img
          class="img-title img-fluid"
          src="../../assets/img/flash-sale-logo.svg?=v1"
          alt=""
        />
        <div class="d-flex  align-items-center">
          <div>
            <div v-if="$i18n.locale === 'th'" class="flash-title-group">
              <p class="flash-sale-title mb-0">{{ $t('flashSaleTitle') }}</p>
              <p class="flash-sale-subtitle mb-0">{{ $t('flashSaleSubTitle') }}</p>
            </div>
            <div class="mr-3" style="margin-top: 5px" v-else>
              <p class="flash-sale-title mb-0 d-inline-flex">{{ $t('flashSaleTitle') }}</p>
              <p class="flash-sale-subtitle-en mb-0 d-inline-flex">{{ $t('flashSaleSubTitle') }}</p>
            </div>
          </div>
          <div class="timer d-flex justify-content-center">
            <ul>
              <li class="days">
                {{ days }}
                <h5 class="text-days">{{ $t('day') }}</h5>
              </li>
              <li class="hours">
                {{ hours }}
                <h5 class="text-hours">{{ $t('hour') }}</h5>
              </li>
              <li class="minutes">
                {{ min }}
                <h5 class="text-min">{{ $t('minute') }}</h5>
              </li>
              <li class="seconds">
                {{ sec }}
                <h5 class="text-sec">{{ $t('second') }}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="mb-4"></div>
        <div class="no-scroll-x card-box">
          <!-- Item 1 -->
          <div
            class="d-flex"
            v-for="(item, index) in flashSale.products"
            :key="index"
          >
            <div class="w-144" v-if="index <= 5">
              <ProductCard :product="item" />
            </div>
          </div>
        </div>
        <div class="navbar-viewmore">
          <a class="viewmore" href="/product-flash-sale">
            <span class="textgroup">
               {{ $t("view") }} Flash sale {{ $t("all")
               }}<span class="icons icon-arrow"></span>
            </span>
          </a>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->
    <!-- Tablet -->
    <div
      class="section pb-0 pt-3 d-lg-none d-md-block d-sm-none"
      style="background-color: #000000"
    >
      <div class="flash-sale-header wow fadeIn">
        <img
          class="img-title img-fluid ml-2"
          src="../../assets/img/flash-sale-logo.svg?v=1"
          alt=""
        />
        <div class="d-flex align-items-center">
          <div>
            <p class="flash-sale-title mb-0">{{ $t('flashSaleTitle') }}</p>
            <p class="flash-sale-subtitle mb-0">{{ $t('flashSaleSubTitle') }}</p>
          </div>
          <div class="timer d-flex justify-content-center">
            <ul style="margin-top: -3px">
              <li class="days">
                {{ days }}
                <h5 class="text-days">{{ $t('day') }}</h5>
              </li>
              <li class="hours">
                {{ hours }}
                <h5 class="text-hours">{{ $t('hour') }}</h5>
              </li>
              <li class="minutes">
                {{ min }}
                <h5 class="text-min">{{ $t('minute') }}</h5>
              </li>
              <li class="seconds">
                {{ sec }}
                <h5 class="text-sec">{{ $t('second') }}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="px-4">
        <div class="mb-4"></div>
        <div class="no-scroll-x card-box">
          <!-- Item 1 -->
          <div
            class="d-flex"
            v-for="(item, index) in flashSale.products"
            :key="index"
          >
            <div class="w-144" v-if="index <= 5">
              <ProductCard :product="item.product" />
            </div>
          </div>
        </div>
        <div class="navbar-viewmore">
          <a class="viewmore" href="/product-flash-sale">
            <span class="textgroup">
               {{ $t("view") }} Flash sale {{ $t("all")
               }}<span class="icons icon-arrow"></span>
            </span>
          </a>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->
    <div
      class="section pb-0 d-lg-block d-md-none"
      style="background-color: #f5f5f5; padding-top: 20px"
      v-if="!isMobile"
    >
      <div
        class="container-fluid"
        style="padding-left: 60px; padding-right: 65px"
      >
        <div class="flash-sale-header wow fadeIn">
          <img
            class="img-title"
            src="../../assets/img/flash-sale-logo.svg?v=1"
            alt=""
          />
          <div class="d-flex align-items-center">
            <div class="mr-2 my-auto" v-if="$i18n.locale === 'th'">
              <p class="flash-sale-title mb-0">{{ $t('flashSaleTitle') }}</p>
              <p class="flash-sale-subtitle mb-0">{{ $t('flashSaleSubTitle') }}</p>
            </div>
            <div class="mr-3" style="margin-top: 10px" v-else>
              <p class="flash-sale-title mb-0 d-inline-flex">{{ $t('flashSaleTitle') }}</p>
              <p class="flash-sale-subtitle-en mb-0 d-inline-flex">{{ $t('flashSaleSubTitle') }}</p>
            </div>
            <div
              class="timer d-flex vertical-line mx-4"

            >
              <ul>
                <li class="days">
                  {{ days }}
                  <h5 class="text-days mt-1">{{ $t('day') }}</h5>
                </li>
                <li class="hours">
                  {{ hours }}
                  <h5 class="text-hours mt-1">{{ $t('hour') }}</h5>
                </li>
                <li class="minutes">
                  {{ min }}
                  <h5 class="text-min mt-1">{{ $t('minute') }}</h5>
                </li>
                <li class="seconds">
                  {{ sec }}
                  <h5 class="text-sec mt-1">{{ $t('second') }}</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid mt-4">
        <div class="row product-list">
          <div
            class="col-2"
            v-for="(item, index) in flashSale.products"
            :key="index"
            style="padding: 0px 6px"
          >
            <ProductCard :product="item" :flash-sale="true" v-if="index <= 5" />
          </div>
          <!--cols-->
        </div>
        <!--row-->
        <div class="navbar-viewmore">
          <a class="viewmore" href="/product-flash-sale">
            <span class="textgroup">
              {{ $t("view") }} Flash sale {{ $t("all")
              }}<span class="icons icon-arrow"></span>
            </span>

          </a>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->
  </div>
</template>

<script>
import ProductCard from "@/components/product-card/ProductCard";
export default {
  name: "FlashSale",
  components: { ProductCard },
  props: {
    flashSale: { type: Object, default: null },
  },
  data() {
    return {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  },
  created() {
    if (this.flashSale) {
      this.flashSale.products = this.flashSale.products.sort(
        (a, b) => a.priority - b.priority
      );
      setInterval(() => {
        if (process.client) {
          this.startTimer(this.flashSale.endDate);
        }
      }, 1000);
    }
  },
  methods: {
    startTimer(endTime) {
      const end = Date.parse(endTime) / 1000;
      const now = new Date() / 1000;
      const timeLeft = end - now;

      // let days = Math.floor(timeLeft / 86400);
      // let hours = Math.floor((timeLeft - (days * 86400)) / 3600)
      // let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60)
      // let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)))

      let days = Math.floor(timeLeft / (60 * 60 * 24));
      //คิดเป็นชั่วโมง ถ้าอยากได้เป็นวันให้เปลี่ยนเป็น timeLeft / (60 * 60) % 24
      let hours = Math.floor((timeLeft / (60 * 60)) % 24);
      let minutes = Math.floor((timeLeft / 60) % 60);
      let seconds = Math.floor(timeLeft % 60);

      if (days < "10") {
        days = "0" + days;
      }
      if (hours < "10") {
        hours = "0" + hours;
      }
      if (minutes < "10") {
        minutes = "0" + minutes;
      }
      if (seconds < "10") {
        seconds = "0" + seconds;
      }
      this.days = days;
      this.hours = hours;
      this.min = minutes;
      this.sec = seconds;
    },
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
  },
  mounted() {
    // New By Joey
    var prodID = 0;
    var minDis = 0;
    var keyMin = 0;
    var newFlashSale = [];
    var objectFlashSale = [];
    this.flashSale.products.map((item, index) => {

    if(index == 0){
      objectFlashSale = item;
      prodID = item.catalogs[0]?._id;
    } else {

      if(prodID != item.catalogs[0]?._id){
        if(objectFlashSale.length <= 0){
          objectFlashSale = item;
        }
        newFlashSale = [...newFlashSale, objectFlashSale];
        objectFlashSale = item;
        minDis = 0;
        prodID = item.catalogs[0]?._id;
      }else{
        if(item.discount < minDis || minDis == 0){
          minDis = item.discount;
          objectFlashSale = item;
        }
      }


    }

    if(index == (this.flashSale.products.length-1)){
      if(objectFlashSale != null){
        newFlashSale = [...newFlashSale, objectFlashSale];
      }
    }
    });
    this.flashSale.products = null;
    this.flashSale.products = newFlashSale;
  }
};
</script>

<style  scoped>
.text-days {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}
.text-hours {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}
.text-min {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}
.text-sec {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}
.img-title {
  max-width: 100%;
  width: 300px;
}

.card-product {
  margin:  0px;
}
@media (min-width: 768px) and (max-width: 1024px) {
  .img-title {
  max-width: 100%;
  width: 325px;
}
.timer {
  margin-top: 12px;
}
}
@media (max-width: 887px) {
  .card-product {
    margin: 6px;
  }
}
@media (max-width: 767px) {
  .text-days {
    color: #fff;
    font-size: 8px;
    font-weight: 400;
  }
  .text-hours {
    color: #fff;
    font-size: 8px;
    font-weight: 400;
  }
  .text-min {
    color: #fff;
    font-size: 8px;
    font-weight: 400;
  }
  .text-sec {
    color: #fff;
    font-size: 8px;
    font-weight: 400;
  }
}
@media (max-width: 576px) {
  .d-sm-none {
    display: none !important;
  }
  .img-title {
    max-width: auto;
    width: 40%;
    height: 60%;
  }
}
</style>
