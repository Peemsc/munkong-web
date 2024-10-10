<template>
  <div class="page">
    <div class="section-product section-product-custom">
      <!-- desktops -->
      <div v-if="!isMobile" class="bg-red d-lg-block d-none">
        <div class="container-fluid">
          <div class="d-flex py-4" v-if="$i18n === 'th'">
            <client-only>
              <div>
                <img class="img-title" src="../assets/img/flash-sale-logo.svg" alt="" />
              </div>
            </client-only>

            <div class="timer d-flex my-auto vertical-line mx-4">
              <h3 class="text-white my-auto mr-3 pl-4" style="font-weight: 400">
                {{ $t("endIn") }}
              </h3>
              <ul>
                <li class="days">
                  {{ days }}
                  <h5>{{ $t('day') }}</h5>
                </li>
                <li class="hours">
                  {{ hours }}
                  <h5>{{ $t('hour') }}</h5>
                </li>
                <li class="minutes">
                  {{ min }}
                  <h5>{{ $t('minute') }}</h5>
                </li>
                <li class="seconds">
                  {{ sec }}
                  <h5>{{ $t('second') }}</h5>
                </li>
              </ul>
            </div>
          </div>
          <div class="d-flex py-4" v-else>
            <client-only>
              <div>
                <img class="img-title" src="../assets/img/flash-sale-logo.svg" alt="" />
              </div>
            </client-only>

            <div class="timer d-flex my-auto vertical-line mx-4">
              <h3 class="text-white my-auto mr-3 pl-4" style="font-weight: 400">
                {{ $t("endIn") }}
              </h3>
              <ul>
                <li class="days">
                  {{ days }}
                  <h5 class="f-16">{{ $t('day') }}</h5>
                </li>
                <li class="hours">
                  {{ hours }}
                  <h5 class="f-16">{{ $t('hour') }}</h5>
                </li>
                <li class="minutes">
                  {{ min }}
                  <h5 class="f-16">{{ $t('minute') }}</h5>
                </li>
                <li class="seconds">
                  {{ sec }}
                  <h5 class="f-16">{{ $t('second') }}</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- tablet -->
      <div class="bg-red d-lg-none d-md-block d-sm-none" style="height: 260px">
        <div class="container-fluid ">
          <div class="py-4 ">
            <client-only>
              <div class="text-center">
                <img class="img-title m-auto" src="../assets/img/flash-sale-logo.svg" alt="" style="padding: 0px 40px;" />
              </div>
            </client-only>
          </div>
          <div class="row text-center">
            <div class="col-4 ">
              <hr color="#fff" style="height: 1px; " />
            </div>
            <div class="col-4">
              <h4 class="text-white text-center my-auto mr-lg-3 pl-lg-4 text-endin">
                {{ $t("endIn") }}
              </h4>
            </div>
            <div class="col-4 ">
              <hr color="#fff" style="height: 1px" />
            </div>
          </div>
          <div class="timer d-flex my-3 mx-4 justify-content-center">
            <ul>
              <li class="days">
                {{ days }}
                <h5>{{ $t('day') }}</h5>
              </li>
              <li class="hours">
                {{ hours }}
                <h5>{{ $t('hour') }}</h5>
              </li>
              <li class="minutes">
                {{ min }}
                <h5>{{ $t('minute') }}</h5>
              </li>
              <li class="seconds">
                {{ sec }}
                <h5>{{ $t('second') }}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div v-if="isMobile" class="bg-red d-lg-none d-block">
        <div class="container-fluid " style="padding: 0 15px;">
          <div class="py-4 px-2">
            <client-only>
              <div class="px-2">
                <img class="img-title m-auto" src="../assets/img/flash-sale-logo.svg" alt="" style="padding: 0px 40px;" />
              </div>
            </client-only>
          </div>
          <div class="row px-3">
            <div class="col-4 ">
              <hr color="#fff" style="height: 1px; " />
            </div>
            <div class="col-4">
              <h4 class="text-white text-center my-auto mr-lg-3 pl-lg-4 text-endin">
                {{ $t("endIn") }}
              </h4>
            </div>
            <div class="col-4 ">
              <hr color="#fff" style="height: 1px" />
            </div>
          </div>
          <div class="timer d-flex my-3 mx-4 justify-content-center">
            <ul>
              <li class="days">
                {{ days }}
                <h5>{{ $t('day') }}</h5>
              </li>
              <li class="hours">
                {{ hours }}
                <h5>{{ $t('hour') }}</h5>
              </li>
              <li class="minutes">
                {{ min }}
                <h5>{{ $t('minute') }}</h5>
              </li>
              <li class="seconds">
                {{ sec }}
                <h5>{{ $t('second') }}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="content-filter flash-sale">
          <div class="content m-0">
            <div class="filter-row d-md-flex pt-2">
              <ul class="nav nav-filter">
                <li>
                  <a href="/product">{{ $t("all") }}</a>
                </li>
                <li><span class="active flash-sale">Flash Sale</span></li>
                <li>
                  <a href="/product?filter=promotion">{{
                    $t("promotionProduct")
                  }}</a>
                </li>
                <li>
                  <a href="/product?filter=suggestion">{{
                    $t("suggestProduct")
                  }}</a>
                </li>
                <li>
                  <a href="/product?filter=new">{{ $t("newProduct") }}</a>
                </li>
              </ul>

              <!-- <div class="sort-wrap position-relative" @click="isActive = !isActive">
                <h5>{{ $t("sortBy") }}</h5>
                <select class="custom-select" v-model="sortPrice" @blur="isActive = false">
                  <option value="popular">{{ $t("sortPopular") }}</option>
                  <option value="min-max">
                    {{ $t("price") }} : {{ $t("minMax") }}
                  </option>
                  <option value="max-min">
                    {{ $t("price") }} : {{ $t("maxMin") }}
                  </option>
                  <option value="aesc">{{ $t("sortAZ") }}</option>
                  <option value="desc">{{ $t("sortZA") }}</option>
                </select>
                <img src="../assets/img/icons/arrow-select.svg" alt="" :class="{ 'arrow-icon-active': isActive }"
                  class="arrow-icon" />
              </div> -->

              <div class="sort-wrap flex-row mt-0">
                  <h5>{{ $t("sortBy") }}</h5>
                  <div class="dropdown select xs w-150">
                    <button class="btn" data-toggle="dropdown" type="button">
                      <li>
                        <span v-if="sortPrice === 'popular'">{{
                          $t("sortPopular")
                        }}</span>
                        <span v-else-if="sortPrice === 'min-max'"
                          >{{ $t("price") }} : {{ $t("minMax") }}</span
                        >
                        <span v-else-if="sortPrice === 'max-min'"
                          >{{ $t("price") }} : {{ $t("maxMin") }}</span
                        >
                        <span v-else-if="sortPrice === 'Aesc'">{{
                          $t("sortAZ")
                        }}</span>
                        <span v-else-if="sortPrice === 'Adesc'">{{
                          $t("sortZA")
                        }}</span>
                        <!-- <span v-else-if="sort === 'sortCreatedAt'">{{
                          $t("sortCreateAt")
                        }}</span> -->
                      </li>
                    </button>
                    <ul class="dropdown-menu">
                      <li @click="sortPrice = 'popular'">
                        <span>{{ $t("sortPopular") }}</span>
                      </li>
                      <li @click="sortPrice = 'min-max'">
                        <span>{{ $t("price") }} : {{ $t("minMax") }}</span>
                      </li>
                      <li @click="sortPrice = 'max-min'">
                        <span>{{ $t("price") }} : {{ $t("maxMin") }}</span>
                      </li>
                      <li @click="sortPrice = 'Aesc'">
                        <span>{{ $t("sortAZ") }}</span>
                      </li>
                      <li @click="sortPrice = 'Adesc'">
                        <span>{{ $t("sortZA") }}</span>
                      </li>
                      <!-- <li @click="sortPrice = 'sortCreatedAt'">
                        <span>{{ $t("sortCreateAt") }}</span>
                      </li> -->
                    </ul>
                  </div>
                  <!--dropdown-->
                </div>

            </div>

            <div class="filter-row pt-0">
              <hr />
            </div>

            <div class="filter-row mb-md-4">
              <img class="w-100" :src="bannerFlashsaleList.map(item => item.bannerImage)" alt="" />
            </div>

            <div class="row product-list in-filter wow fadeIn " v-if="flashSale">
              <template v-for="product in flashSale.products">
                <ProductCardFlashSale :key="product.catalogs._id" :product="product" :flashSale="flashSale._id" />
              </template>

              <!--//-->
            </div>
            <!--product-list-->
          </div>
          <!--content-->
        </div>
        <!--content-filter-->
      </div>
      <!--container-fluid-->
    </div>
    <!--section-setting-->
  </div>
  <!--page-->
</template>

<script>
import ProductCardFlashSale from "@/components/product-card/ProductCardFlashSale";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {
    ProductCardFlashSale,
  },
  data() {
    return {
      isActive: false,
      countProduct: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      flashSale: null,
      sortPrice: "popular",
      catalogArray: null
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    bannerFlashsaleList() {
      return this.$store.getters["banner-flashsale/listPriority"];
    },
  },
  async created() {
    await this.$store.dispatch("banner-flashsale/showPriority");
  },
  async mounted() {
    const result = await this.$store.dispatch("flash-sale/fetchFlashSale");
    this.flashSale = JSON.parse(JSON.stringify(result));
    this.flashSale = this.flashSale?.find((item) => {
      const nowDate = new Date();
      return (
        nowDate > new Date(item?.startDate) && nowDate < new Date(item?.endDate)
      );
    });

    if (this.flashSale) {
      const nowDate = new Date();
      this.countProduct = this.flashSale.products.catalogs?.length;
      this.flashSale.products.catalogs?.filter((data) => {
        if (data.product.options?.length > 0) {
          data.product.unitPrice = null;
          data.product.options.map((option) => {
            option.attributes.map((attribute) => {
              if (
                attribute.product.unitPrice < data.product.unitPrice ||
                data.product.unitPrice === null
              ) {
                data.product.unitPrice = attribute.product.unitPrice;
              }
            });
          });
        }
      });
      this.flashSale.products.sort(
        (a, b) => a.product.unitPrice - b.product.unitPrice
      );
      setInterval(() => {
        this.startTimer(this.flashSale.endDate);
      }, 1000);




      // New By Joey
      var prodID = '';
      var minDis = 0;
      var keyMin = 0;
      var newFlashSale = [];
      var objectFlashSale = [];
      this.flashSale.products.map((item, index) => {

        if (index == 0) {
          objectFlashSale = item;
          prodID = item.catalogs[0]?._id;
        } else {

          if (prodID != item.catalogs[0]?._id) {
            if (objectFlashSale?.length <= 0) {
              objectFlashSale = item;
            }
            newFlashSale = [...newFlashSale, objectFlashSale];
            objectFlashSale = item;
            minDis = 0;
            prodID = item.catalogs[0]?._id;
          } else {
            if (item.discount < minDis || minDis == 0) {
              minDis = item.discount;
              objectFlashSale = item;
            }
          }


        }

        if (index == (this.flashSale.products?.length - 1)) {
          if (objectFlashSale != null) {
            newFlashSale = [...newFlashSale, objectFlashSale];
          }
        }
      });
      this.flashSale.products = null;
      this.flashSale.products = newFlashSale;
    }
  },
  watch: {
    sortPrice(value) {
      if (value === "max-min") {
        this.flashSale.products.sort(
          (a, b) => b.product.unitPrice - a.product.unitPrice
        );
      } else if (value === "min-max") {
        this.flashSale.products.sort(
          (a, b) => a.product.unitPrice - b.product.unitPrice
        );
      } else if (value === "Aesc") {
        this.flashSale.products.sort((a, b) =>
          a.product.itemDescription
            .toLowerCase()
            .localeCompare(b.product.itemDescription.toLowerCase())
        );
      } else if (value === "Adesc") {
        this.flashSale.products.sort((a, b) =>
          b.product.itemDescription.localeCompare(a.product.itemDescription)
        );
      } else if (value === "popular") {
        this.flashSale.products.sort((a, b) => b.product.view - a.product.view);
      }
    },
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
};
</script>

<style scoped>
.dropdown-menu li {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
.dropdown {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
.timer ul{height:44px}
.timer ul>li {
  width: 65px;
  align-content: center;
  font-size: 35px;
  font-weight: bold;
  line-height: 44px;
  border-radius: 12px;
  padding-top:5px;
}

.timer ul>li h5 {
  color: #ffffff;
  font-weight: lighter;
   bottom: -25px;
}

.vertical-line {
  border-left: 1px solid #ffffff;
  margin-left: 10px;
  padding-right: 20px;
}

.bg-red {
  background-color: #ff0000;
}

.img-title {
  width: 400px;
}

.section-product {
  background: #f5f5f5;
  padding-bottom: 50px;
}

.content-filter {
  display: block;
  position: relative;
  width: 100%;
  padding-left: 0px;
  padding-top: 35px;
}

.text-endin {
  font-weight: 400;
}

.nav-filter li a,
.nav-filter li span {
  display: block;
  height: 40px;
  min-width: 120px;
  line-height: 38px;
  border-radius: 50px;
  padding: 0 !important;
  font-weight: 600;
  text-align: center;
  font-family: "Noto Sans Thai", sans-serif;
  font-family: var(--f-noto-thai);
  color: #111111;
  color: var(--black);
  border: 1px solid #111111;
  border: 1px solid var(--black);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #ffffff;
}

.sort-wrap .custom-select {
  min-width: 240px;
  height: 35px;
  line-height: 28px;
  font-size: 18px;
  /* font-size: var(--f-14); */
  font-family: "Noto Sans Thai", sans-serif;
  font-family: var(--f-noto-thai);
  border-radius: 50px;
  padding: 0 16px;
  background: rgba(17, 17, 17, 0.05);
}

.arrow-icon {
  position: absolute;
  right: 7px;
  top: 6px;
}

.arrow-icon-active {
  position: absolute;
  right: 7px;
  top: 6px;
  transform: rotate(180deg);
}

.sort-wrap h5 {
  white-space: nowrap;
  font-family: var(--f-noto-thai);
  font-size: 24px;
  padding-right: 10px;
  margin: auto 0;
}

.section-product-custom {
  padding-bottom: 65px;
}

@media (max-width: 1440px) and (min-width: 768px) {
  .nav-filter {
    margin: 0 -15px;
  }

  .product-list.in-filter .cols {
    padding: 0 15px 2px;
  }
}

@media (max-width: 1199px) {
  .timer ul>li{
    font-size:28px;
  }
}

@media (max-width: 1024px) {
  .section-product-custom {
    padding-bottom: 15px;
  }

  .product-list.in-filter {
    margin-left: -5px;
    margin-right: -10px;
  }

  .timer ul>li{
    font-size:25px;
    width:55px;
  }
}

@media (min-width: 768px) and (max-width: 1133px) {
  /*.timer ul>li {
    width: 100px;
    height: 50px;
    line-height: 55px
  }
*/
  .arrow-icon {
    position: absolute;
    right: 7px;
    top: 46px;
  }
}

@media (max-width: 991.98px) {
  .timer{height:auto;}
  .timer ul{height:auto; margin-bottom:30px}
  .timer ul>li {
    width: 65px;
    height: 44px;
    line-height: 44px;
    font-size:28px;
  }
  .timer ul > li h5{
    font-size:16px;
    bottom:-30px;
  }
}

@media (max-width:670px) {
  .timer ul{height:auto; margin-bottom:30px}
  .timer ul>li {
    width: 55px;
    height: 34px;
    line-height: 44px;
    font-size:22px;
        border-radius: 10px;
  }
  .timer ul > li h5{
    font-size:14px;
    bottom:-25px;
  }
}

@media (max-width: 578px) {

  .d-sm-none {
    display: none !important;
  }

  .arrow-icon {
    position: absolute;
    right: 26px;
    top: 21px;
  }

  .arrow-icon-active {
    position: absolute;
    right: 26px;
    top: 21px;
    transform: rotate(180deg);
  }

  .nav-filter {
    margin: 0 2px;
  }

  .img-title {
    width: 100%;
    height: auto;
  }

  .text-endin {
    font-size: 16px;
    font-weight: 400;
  }

  .bg-red {
    background-color: #ff0000;
    height: 300px;
  }

  .timer ul>li {
    width: 65px;
    height: 45px;
    align-content: center;
    font-size: 32px;
    font-weight: bold;
    line-height: 50px;
  }

  .nav-filter li a,
  .nav-filter li span {
    min-width: 110px;
  }

  .sort-wrap .custom-select {
    width: 50px;
  }
}

@media (max-width: 440px) {
  .text-endin {
    font-size: 16px;
    font-weight: 400;
  }

  .bg-red {
    background-color: #ff0000;
    height: 270px;
  }

  .timer ul>li {
    width: 70px;
    height: 45px;
    align-content: center;
    font-size: 34px;
    font-weight: bold;
    line-height: 50px;
  }
}

@media (max-width: 376px) {
  .text-endin {
    font-size: 19px;
    font-weight: 400;
        white-space: nowrap
  }

  .bg-red {
    background-color: #ff0000;
    height: 270px;
  }
}
</style>

