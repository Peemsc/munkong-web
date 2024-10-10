<template>
  <div class="page">
    <Banner :banners="banners" :allBanner="allBanner" />

    <Highlight :highlights="highlights" :highlightAll="highlightAll" />

    <Category :categories="homeCategories" />

    <FlashSale :flashSale="flashSale" v-if="flashSale" />
    <div class="section py-md-4 grey-background">
      <div class="mt-md-4 mt-0" v-if="isMobile"></div>
      <div class="other-box-space container-fluid my-md-5">
        <div class="row">
          <div
            class="col-12 col-md-4 col-lg-4 mb-lg-2"
            v-for="(box, index) in otherBox"
            :key="index"
          >
            <div v-if="!isMobile" class="position-relative other-box my-3">
              <div
                v-if="index == 0"
                class="divider-left"
                :class="{ hidden: !toggleDivider }"
              ></div>
              <a :href="box.url" class="font-box"
                ><img :src="box.name" alt="" class="img-otherbox-tablet" />
              </a>
              <div class="divider" :class="{ hidden: !toggleDivider }"></div>
            </div>
            <div v-if="isMobile" class="position-relative other-box col-12">
              <a
                :href="box.url"
                class="font-box"
                :class="`${isMobile ? 'f-38' : 'f-50'}`"
                ><img :src="box.nameMobie" alt="" />
              </a>
              <div
                v-if="index !== 2"
                class="horizontal-divider"
                :class="{ hidden: !toggleDivider }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->

    <BannerPromotion :banners="bannerPromotionList" />

    <!--===========================[Start] Catalog ===========================-->
    <template v-for="(catalog, indexCatalog) in showCatalog">
      <div class="section pt-5 pb-0 grey-background" :key="indexCatalog">
        <div class="container-fluid">
          <div
            class="section-header wow fadeIn align-items-center"
            :class="`${isMobile ? 'justify-content-between' : ''}`"
          >
            <div class="d-flex align-items-center">
              <!--              <img :src="catalog.icon" width="24px" height="24px" class="mr-2"/>-->
              <a
                v-if="catalog.category"
                :href="`/product?subname=${catalog.category.itemCategoryName}&subid=${catalog.category?._id}`"
              >
                <h2
                  v-if="isMobile"
                  style="font-weight: 400 !important; font-size: 24px"
                >
                  {{ showCatalogName(catalog) }}
                </h2>
                <h1 v-if="!isMobile" style="font-weight: 400 !important">
                  {{ showCatalogName(catalog) }}
                </h1>
              </a>
            </div>
            <div class="d-flex align-items-center">
              <a
                class="d-flex align-items-center"
                :href="`/product?subname=${catalog.category.itemCategoryName}&subid=${catalog.category?._id}`"
              >
                <span class="amount-item ml-2">
                  {{ catalog.totalCategory }} items
                  <img src="/img/icons/icon-path.png?v=1" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <!--container-fluid-->
      </div>
      <!--section-->

      <div class="section pt-0 pb-1 grey-background">
        <div class="container-fluid">
          <div class="no-scroll-x card-box" v-if="isMobile">
            <div
              class="d-flex"
              v-for="(product, indexProduct) in catalog.products"
            >
              <div class="w-144" v-if="product.status" :key="indexProduct">
                <ProductHome :product="product" :flashSale="flashSale" :key="product._id" v-if="flashSale" />
                <ProductHome :product="product" :key="product._id" v-if="!flashSale" />
              </div>
            </div>
          </div>

          <div class="row product-list wow fadeIn" v-else>
            <template v-for="(product, indexProduct) in catalog.products">
              <div
                class="col-xl-2 col-md-4 col-6 pr-0 pl-0"
                v-if="product.status"
              >
              <ProductHome :product="product"  :flashSale="flashSale" v-if="flashSale" />
              <ProductHome :product="product" :key="product._id" v-if="!flashSale" />
              </div>
            </template>
          </div>
          <!--row-->

          <div class="navbar-viewmore">
            <a
              class="viewmore"
              :href="`/product?subname=${catalog.category.itemCategoryName}&subid=${catalog.category?._id}`"
            >
              <span class="textgroup">
                  {{ $t("view") }} {{ showCatalogName(catalog) }} {{ $t("all") }}
                  <span class="icons icon-arrow"></span>
              </span>
            </a>
          </div>

          <div
            v-if="indexCatalog === showCatalog.length - 1"
            class="mb-3"
          ></div>
        </div>
        <!--container-fluid-->
      </div>
      <!--section-->
    </template>
    <div class="mt-3"></div>
    <!--===========================[End] Catalog ===========================-->

    <div
      :class="`${!isMobile ? 'section section-review' : 'px-1 pt-4'}`"
      class="pb-0 pb-xl-3 pt-2"
    >
      <div class="container-fluid">
        <a
          class="section-header wow fadeIn"
          :class="`${isMobile ? 'justify-content-between' : ''}`"
          href="/news"
        >
          <div class="d-flex align-items-center">
            <!-- <img src="/img/icons/icon-brands.png" width="35px" class="mr-2" /> -->
            <h2
              v-if="isMobile"
              style="font-weight: 400"
              class="d-md-block d-none"
            >
              {{ $t("newsBlog") }}
            </h2>
            <h2
              v-if="isMobile"
              style="font-weight: 400"
              class="d-md-none d-block"
            >
              {{ $t("newsBlogMobile") }}
            </h2>

            <h1
              v-if="!isMobile"
              style="font-weight: 400"
              class="d-md-block d-none"
            >
              {{ $t("newsBlog") }}
            </h1>
            <h1
              v-if="!isMobile"
              style="font-weight: 400"
              class="d-md-none d-block"
            >
              {{ $t("newsBlogMobile") }}
            </h1>
          </div>
          <div class="d-flex align-items-center">
            <span class="amount-item ml-2"
              >{{ newsList[0]?.totalItems }} items
              <img src="/img/icons/icon-path.png?v=1" />
            </span>
          </div>
        </a>
        <div class="row" v-if="!isMobile">
          <!-- Index = 0-->
          <div class="col-lg-6 col-left" v-if="newsList[0]">
            <div class="card-blog lg review wow fadeIn">
              <a
                class="card-link"
                :href="'/news-detail?n=' + newsList[0]?._id"
              ></a>
              <div class="card-photo" style="border-radius: 15px">
                <div
                  class="photo"
                  v-lazy:background-image="newsList[0]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"
                >
                  <img src="/img/thumb/frame-100x53.png?v=1" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!--col-lg-6-->

          <!-- Index = 1,2,3,4-->
          <div class="col-lg-6 col-right">
            <div class="row h-100">
              <div class="col-md-6">
                <div
                  class="card-blog review half wow fadeIn"
                  v-if="newsList[1]"
                >
                  <a
                    class="card-link"
                    :href="'/news-detail?n=' + newsList[1]?._id"
                  ></a>
                  <div class="card-photo" style="border-radius: 15px">
                    <div
                      class="photo"
                      :style="{
                        backgroundImage: 'url(' + newsList[1]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + ')',
                      }"
                    >
                      <img
                        class="d-black d-xl-none"
                        src="/img/thumb/frame-100x42.png?v=1"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="card-blog review half wow fadeIn"
                  v-if="newsList[2]"
                >
                  <a
                    class="card-link"
                    :href="'/news-detail?n=' + newsList[2]?._id"
                  ></a>
                  <div class="card-photo" style="border-radius: 15px">
                    <div
                      class="photo"
                      v-lazy:background-image="newsList[2]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"
                    >
                      <img
                        class="d-black d-xl-none"
                        src="/img/thumb/frame-100x42.png?v=1"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--col-md-6-->

              <div class="col-md-6">
                <div
                  class="card-blog review half wow fadeIn"
                  v-if="newsList[3]"
                >
                  <a
                    class="card-link"
                    :href="'/news-detail?n=' + newsList[3]?._id"
                  ></a>
                  <div class="card-photo" style="border-radius: 15px">
                    <div
                      class="photo"
                      v-lazy:background-image="newsList[3]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"
                    >
                      <img
                        class="d-black d-xl-none"
                        src="/img/thumb/frame-100x42.png?v=1"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="card-blog review half wow fadeIn"
                  v-if="newsList[4]"
                >
                  <a
                    class="card-link"
                    :href="'/news-detail?n=' + newsList[4]?._id"
                  ></a>
                  <div class="card-photo" style="border-radius: 15px">
                    <div
                      class="photo"
                      v-lazy:background-image="newsList[4]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"
                    >
                      <img
                        class="d-black d-xl-none"
                        src="/img/thumb/frame-100x42.png?v=1"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--col-md-6-->
            </div>
            <!--row-->
          </div>
          <!--col-lg-6-->
        </div>

        <template v-if="isMobile">
          <div class="row pb-1">
            <!-- Index = 0-->
            <div class="col-lg-6 col-left" v-if="newsList[0]">
              <div class="card-blog lg review wow fadeIn">
                <a
                  class="card-link"
                  :href="'/news-detail?n=' + newsList[0]?._id"
                ></a>
                <div class="card-photo" style="border-radius: 15px">
                  <div
                    class="photo"
                    v-lazy:background-image="newsList[0]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"
                  >
                    <img src="/img/thumb/frame-100x53.png?v=1" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <!--col-lg-6-->
          </div>
          <div class="row">
            <div class="col-6 py-1" v-for="i in newsList?.length - 1" :key="i">
              <div class="card-blog review half wow fadeIn">
                <a
                  class="card-link"
                  :href="'/news-detail?n=' + newsList[i]?._id"
                ></a>
                <div class="card-photo" style="border-radius: 15px">
                  <div
                    class="photo"
                    v-lazy:background-image="newsList[i]?.cover.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')"
                  >
                    <img
                      class="d-black d-xl-none"
                      src="/img/thumb/frame-100x42.png?v=1"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="navbar-viewmore" style="padding-top: 10px">
          <a class="viewmore d-lg-block d-none" href="/news">
            <span class="textgroup">
                 {{ $t("view") }} {{ $t("reviewAndVideo") }} {{ $t("all")
                 }}<span class="icons icon-arrow"></span>
            </span>

          </a>
          <a class="viewmore d-lg-none d-block" href="/news">
            {{ $t("view") }} {{ $t("reviewAndVideo") }} {{ $t("all")
            }}<span class="icons icon-arrow"></span>
          </a>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->

    <!--===========================[Start] Brand ===========================-->

    <div class="section">
      <div class="container-fluid">
        <a
          class="section-header pb-2 wow fadeIn align-items-center"
          :class="`${isMobile ? 'justify-content-between' : ''}`"
          href="/brands"
        >
          <div class="d-flex align-items-center">
            <!-- <img src="/img/icons/icon-tag-2.png" width="35px" class="mr-2" /> -->
            <h2 v-if="isMobile" style="font-weight: 400">{{ $t("brands") }}</h2>
            <h1 v-if="!isMobile" style="font-weight: 400">
              {{ $t("brands") }}
            </h1>
          </div>
          <div class="d-flex align-items-center">
            <span class="amount-item ml-2"
              >{{ brands[0]?.totalItems }} items
              <img src="/img/icons/icon-path.png?v=1" />
            </span>
          </div>
        </a>
        <!-- <pre>  {{ brands }}</pre> -->
        <div class="brand-container">
          <div
            class="wow fadeInUp"
            :class="`${isMobile ? 'col-3 pl-0 pr-0 py-2' : 'cols'}`"
            v-for="(brand, index) in brands"
            :key="index"
          >
            <a class="card-brand" :href="'/select-brands/?b=' + brand?._id">
              <img class="w-100" v-lazy="brand.logo.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong')" />
            </a>
          </div>
        </div>
      </div>
      <!--container-fluid-->
      <div class="navbar-viewmore" style="padding-top: 10px">
        <a class="viewmore" href="/brands">
          <span class="textgroup">
              {{ $t("view") }} {{ $t("brands") }} {{ $t("all")
              }}<span class="icons icon-arrow"></span>
          </span>

        </a>
      </div>
    </div>
    <!--section-->

    <!--===========================Webboard Facebook Youtube @Line ===========================-->
    <div class="section p-0">
      <div class="container-fluid">
        <hr class="m-0 d-lg-block d-none" />
        <div class="menu-banner justify-content-center wow fadeIn">
          <a href="https://forum.munkonggadget.com/">
            <img src="/img/social/Webboard-Mobile.png?v=1" alt="" v-if="isMobile" />
            <img src="/img/social/Webboard-Web.png?v=1" alt="" v-else />
          </a>
          <a href="https://www.facebook.com/munkonggadget1">
            <img src="/img/social/Facebook-Mobile.png?v=1" alt="" v-if="isMobile" />
            <img src="/img/social/FB-Web.png?v=1" alt="" v-else />
          </a>
          <a href="https://www.youtube.com/munkonggadgetReviews">
            <img src="/img/social/Youtube-Mobile.png?v=1" alt="" v-if="isMobile" />
            <img src="/img/social/Youtube-Web.png?v=1" alt="" v-else />
          </a>
          <a href="https://page.line.me/yfi5441d">
            <img src="/img/social/Line-Mobile.png?v=1" alt="" v-if="isMobile" />
            <img src="../assets/img/Line_Banner.svg?v=1" alt="" v-else />
          </a>
          <a href="https://www.tiktok.com/@munkong.online">
            <img src="/img/social/Tiktok-Mobile.png?v=1" alt="" v-if="isMobile" />
            <img src="/img/social/Tiktok-Web.png?v=1" alt="" v-else />
          </a>
        </div>
        <hr class="m-0" />
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->
  </div>
  <!--page-->
</template>

<script>
import ProductCard from "~/components/product-card/ProductCard";
import CatalogCategoryCard from "@/components/home/CatalogCategoryCard";
import ProductCardFlashSale from "@/components/product-card/ProductCardFlashSale";
import Banner from "@/components/home/Banner";
import Highlight from "@/components/home/Highlight";
import Category from "@/components/home/Category";
import FlashSale from "@/components/home/FlashSale";
import ProductHome from "@/components/home/Product";
import BannerPromotion from "@/components/home/BannerPromotion";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content
        }
      ]
    }
  },
  name: "HomeIndex",
  components: {
    BannerPromotion,
    FlashSale,
    Category,
    Highlight,
    Banner,
    ProductCardFlashSale,
    CatalogCategoryCard,
    ProductCard,
    ProductHome
  },
  data() {
    return {
      meta: {
        title: '',
        hid: '',
        name: '',
        content: '',
      },
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      flashSale: null,
      otherBox: [],
    };
  },
  async fetch() {
    this.meta.title = this.$i18n.locale === 'th' ? 'munkongONLINE ขายออนไลน์ระดับพระกาฬ' : 'munkongONLINE ขายออนไลน์ระดับพระกาฬ';
    // this.meta.hid = this.$i18n.locale === 'th' ? 'munkongONLINE ขายออนไลน์ระดับพระกาฬ' : 'munkongONLINE ขายออนไลน์ระดับพระกาฬ';
    this.meta.name = this.$i18n.locale === 'th' ? 'munkongONLINE ขายออนไลน์ระดับพระกาฬ' : 'munkongONLINE ขายออนไลน์ระดับพระกาฬ';
    this.meta.content = this.$i18n.locale === 'th' ? 'munkongONLINE ขายออนไลน์ระดับพระกาฬ' : 'munkongONLINE ขายออนไลน์ระดับพระกาฬ';
    await this.$store.dispatch("highlight/fetchHighlight");
    await this.$store.dispatch("highlight/showAllHighlight");
  },
  async created() {
    const view = {
      type: "website",
      customer: this.$auth.loggedIn ? this.$auth.user?._id : null,
    };
    const reqCountView = this.$store.dispatch("count-view/createView", view);
    const reqBrand = this.$store.dispatch("brand/showPriority");
    const reqShowCatalog = this.$store.dispatch("show-catalog/fetchCatalog");
    const reqNews = this.$store.dispatch("news/showPriority");
    const reqPromotion = this.$store.dispatch("promotion/showPriority");
    const reqSetting = this.$store.dispatch("setting/getSetting", "home");
    const reqHighlight = this.$store.dispatch("highlight/fetchHighlight");
    const reqHighlightAll = this.$store.dispatch("highlight/showAllHighlight")
    const reqBanner = this.$store.dispatch("banner/showPriority");
    const reqAllBanner = this.$store.dispatch("banner/showAllBanner");
    const reqBannerPromotion = this.$store.dispatch(
      "banner-promotion/showPriority"
    );
    const reqCategory = this.$store.dispatch("home-category/fetchHomeCategory");
    const reqBox = this.$store.dispatch("website-box/fetchBox");
    const requestAll = Promise.all([
      reqCountView,
      reqBrand,
      reqShowCatalog,
      reqNews,
      reqPromotion,
      reqSetting,
      reqHighlight,
      reqHighlightAll,
      reqBanner,
      reqAllBanner,
      reqBannerPromotion,
      reqCategory,
      reqBox,
    ]);

    try {
      await requestAll;
    } catch (e) {
      // console.log(e);
    }

    this.getOtherBox();
    const respFlashSale = JSON.parse(
      JSON.stringify(await this.$store.dispatch("flash-sale/fetchFlashSale"))
    );
    if (respFlashSale.length > 0) {
      this.flashSale = respFlashSale.find((item) => {
        const nowDate = new Date();
        return (
          nowDate > new Date(item.startDate) && nowDate < new Date(item.endDate)
        );
      });

      // New By Joey
      var prodID = 0;
      var minDis = 0;
      var keyMin = 0;
      var newFlashSale = [];
      var objectFlashSale = [];
      this.flashSale?.products.map((item, index) => {
        if (index == 0) {
          newFlashSale = [item];
          prodID = item.catalogs[0]?._id;
        } else {
          if (minDis <= 0) {
            minDis = item.discount;
            objectFlashSale = item;
          } else {
            if (minDis > item.discount) {
              minDis = item.discount;
              objectFlashSale = item;
            } else {
              objectFlashSale = item;
            }
          }

          if (prodID != item.catalogs[0]?._id) {
            newFlashSale = [...newFlashSale, objectFlashSale];
            // objectFlashSale = null;
            prodID = item.catalogs[0]?._id;
          }
        }
      });

      if (this.flashSale != undefined) {
        this.flashSale.products = null;
        this.flashSale.products = newFlashSale;
        this.$forceUpdate()
      }
    }
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
    },
    showCatalogName(catalog) {
      let cateEng = catalog.category.itemCategoryNameEN?.toLowerCase();
      cateEng = cateEng[0].toUpperCase() + cateEng.substring(1);
      return this.$i18n.locale === "en"
        ? cateEng
        : catalog.category?.itemCategoryName;
    },
    async getOtherBox() {
      const otherBoxApi = await this.$axios.get(
        "https://munkong-api.gramick.com/api/customer/setting/get-label"
      );
      this.otherBox = otherBoxApi.data.otherBox;
    },
  },
  computed: {
    toggleDivider() {
      return this.$store.state.setting.setting.showLine;
    },
    homeCategories() {
      return this.$store.getters["home-category/allCategories"];
    },
    isMobile() {
      return this.$store.state.isMobile;
    },
    showCatalog() {
      return this.$store.getters["show-catalog/getCatalogs"];
    },
    brandHighlights() {
      let brandHighlights = this.$store.state.brand.brands;
      if (!this.isMobile) {
        brandHighlights = brandHighlights.slice(0, 15);
      } else if (this.isMobile) {
        brandHighlights = brandHighlights.slice(0, 16);
      }
      return brandHighlights;
    },
    brands() {
      let brands = this.$store.state.brand.brandListPriority;
      if (this.isMobile) {
        brands = brands.slice(0, 16);
      } else {
        brands = brands.slice(0, 15);
      }
      return brands;
    },
    bannerPromotionList() {
      return this.$store.getters["banner-promotion/listPriority"];
    },
    boxList() {
      return this.$store.getters["website-box/getBoxes"];
    },
    newsList() {
      return this.$store.state.news?.newsListPriority;
    },
    setting() {
      return this.$store.state.setting.setting;
    },
    promotionList() {
      return this.$store.state.promotion.listPriority;
    },
    highlights() {
      return this.$store.state.highlight.highlights;
    },
    highlightAll() {
      return this.$store.state.highlight.highlightAll;
    },
    banners() {
      return this.$store.state.banner.listPriority;
    },
    allBanner() {
      return this.$store.state.banner.allBanner;
    },
  },
};

</script>
<style scoped>
.horizontal-divider {
  width: 100%;
  position: absolute;
  border-bottom: 1px solid #ccc;
  bottom: 0;
}

hr {
  border: none;
  height: 1px;
  background-color: #ccc;
}

.divider-left {
  border-left: 1px solid #ccc;
  position: absolute;
  left: 0%;
  top:-10px;
  bottom:-10px;
}

.divider {
  border-left: 1px solid #ccc;
  height: auto;
  position: absolute;
  right: 0%;
  top:-10px;
  bottom:-10px
}

.other-box {
  background-color: unset;
}

.hidden {
  display: none;
}

.font-box {
  font-weight: 300;
  /*font-size: 75px;*/
}

.img-otherbox-tablet {
  width: 100%;
  height: auto;
}

.divider-left {
  left: -0.85rem;
}
.divider {
  right:-0.85rem;
}
@media (max-width: 1024px) {
  .divider,
  .divider-left{
    top: 0px;
    bottom:0px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .img-otherbox-tablet {
    width: 100%;
    height: auto;
  }
}
@media (max-width: 767px) {
  .other-box-space{margin-top:0}

  .other-box-space .divider,
  .other-box-space .divider-left,
  .other-box-space .horizontal-divider{
    border:0;
    display:none;
  }
}

@media (max-width: 578px) {
  .section-header {
    padding: 0 5px;
  }

  .other-box-space .other-box{
    height:105px;
  }

}
</style>
