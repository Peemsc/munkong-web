<template>
  <div v-if="tempCategory.length > 0" v-lazy-container="{ selector: 'img' }">
    <div class="section pb-3" style="background-color: #f5f5f5" v-if="isMobile">
      <div class="container-fluid">
        <div class="row">
          <div class="col-1-point-5" v-for="(category, index) in tempCategory" :key="index" align="center">
            <div class="category-box"
              :style="{ border: category.strokeColor ? `1px solid ${category.strokeColor}` : '' }">
              <div class="card-photo">
                <div class="photo" v-lazy:background-image="category.icon + `?v=1`">
                  <a :href="`/product?subname=${category.category.itemCategoryName}&subid=${category.category._id}`"><img
                      data-src="/img/thumb/frame-24x24.png?v=1" alt=""></a>
                </div>
              </div>
            </div>
            <p class="text-center mt-2" :style="{ color: category.textColor ? `${category.textColor}` : '#333333' }">
              <a :href="`/product?subname=${category.category.itemCategoryName}&subid=${category.category._id}`">
                <template v-if="category.category.itemCategoryInitials === ''">
                  {{ category.category.itemCategoryInitials !== '' ?
                    category.category.itemCategoryInitials : showCategoryName(category) }}
                </template>
                <template v-else>
                  {{ category.category.itemCategoryInitials }}
                </template>
              </a>
            </p>
          </div>
        </div>
        <div class="navbar-viewmore" @click="showAll = true" v-if="!showAll">
          <span class="viewmore">
            <span class="textgroup">
              {{ $t("category") }} {{ $t("all") }}<span class="icons icon-arrow"></span>
            </span>
          </span>
        </div>
      </div>
    </div>

    <!-- tablet -->
    <div class="section pt-3 pb-0 grey-background d-md-block d-xl-none d-lg-block d-none ">
      <div class="container-fluid category-grid-ipad ">
        <div class="main-box pt-3 no-scroll-x" ref="mainBox">
          <div class="backward" v-if="!hidePrevScroll">
            <span class="btn-forward text-15" @click="scrollCategory('prev')">
              <img src="/img/icons/icon-arrow-right.svg" alt="" style="height: 15px; transform: rotate(180deg);">
            </span>
          </div>
          <div class="d-flex flex-row items-box">
            <div class="col-1-point-5" v-for="(category, index) in categories" :key="index" align="center">
              <div class="category-box d-flex justify-content-center align-items-center"
                :style="{ border: category.strokeColor ? `1px solid ${category.strokeColor}` : '' }">
                <div class="card-photo w-100">
                  <div class="photo" :style="{ backgroundImage: 'url(' + category.icon + ')' }"
                    style="width: 80%; height: 60%">
                    <a :href="`/product?subname=${category.category.itemCategoryName}&subid=${category.category._id}`"><img
                        src="/img/thumb/frame-24x24.png" alt=""></a>
                  </div>
                </div>
              </div>
              <p class="text-center mt-2" :style="{ color: category.textColor ? `${category.textColor}` : '#333333' }">
                <a :href="`/product?subname=${category.category.itemCategoryName}&subid=${category.category._id}`">
                  <template v-if="category.category.itemCategoryInitials === ''">
                    {{ category.category.itemCategoryInitials !== '' ?
                      category.category.itemCategoryInitials : showCategoryName(category) }}
                  </template>
                  <template v-else>
                    {{ category.category.itemCategoryInitials }}
                  </template>
                </a>
              </p>
            </div>
          </div>
          <div class="forward" v-if="!hideNextScroll">
            <span class="btn-forward text-15" @click="scrollCategory('next')">
              <img src="../../assets/img/icons/icon-arrow-right.svg" alt="" style="height: 15px;">
            </span>
          </div>
        </div>
      </div><!--container-fluid-->
    </div><!--section-->
    <!-- ipad -->

    <!-- desktop -->
    <div class="section pt-3 pb-0 grey-background d-xl-block d-none" v-if="!isMobile">
      <div class="container-fluid category-grid-ipad ">
        <div class="main-box px-3 pt-3 no-scroll-x" ref="mainBox">
          <div class="backward" v-if="!hidePrevScroll">
            <span class="btn-forward text-15" @click="scrollCategory('prev')">
              <img data-src="/img/icons/icon-arrow-right.svg" alt="" style="height: 15px; transform: rotate(180deg);">
            </span>
          </div>
          <div class="d-flex flex-row items-box">
            <div class="col-1-point-5" v-for="(category, index) in categories" :key="index" align="center">
              <div class="category-box d-flex justify-content-center align-items-center"
                :style="{ border: category.strokeColor ? `1px solid ${category.strokeColor}` : '' }">
                <div class="card-photo w-100">
                  <div class="photo" :style="{ backgroundImage: 'url(' + category.icon + ')' }"
                    style="width: 80%; height: 60%">
                    <a :href="`/product?subname=${category.category.itemCategoryName}&subid=${category.category._id}`"><img
                        src="/img/thumb/frame-24x24.png" alt=""></a>
                  </div>
                </div>
              </div>
              <p class="text-center mt-2" :style="{ color: category.textColor ? `${category.textColor}` : '#333333' }">
                <a :href="`/product?subname=${category.category.itemCategoryName}&subid=${category.category._id}`">
                  <template v-if="category.category.itemCategoryInitials === ''">
                    {{ category.category.itemCategoryInitials !== '' ?
                      category.category.itemCategoryInitials : showCategoryName(category) }}
                  </template>
                  <template v-else>
                    {{ category.category.itemCategoryInitials }}
                  </template>
                </a>
              </p>
            </div>
          </div>
          <div class="forward" v-if="!hideNextScroll">
            <span class="btn-forward text-15" @click="scrollCategory('next')">
              <img data-src="/img/icons/icon-arrow-right.svg" alt="" style="height: 15px;">
            </span>
          </div>
        </div>
      </div><!--container-fluid-->
    </div><!--section-->
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    categories: { type: Array, default: [] }
  },
  data() {
    return {
      nextScroll: 0,
      hideNextScroll: this.categories.length <= 8,
      hidePrevScroll: true,
      showAll: false,
      tempCategory: this.categories.length > 8 ? this.categories.slice(0, 8) : this.categories
    }
  },
  watch: {
    showAll(value) {
      if (value) {
        this.tempCategory = this.categories;
        this.hideNextScroll = true;
        this.hidePrevScroll = true;
      }
    },
    categories(newVal) {
      this.tempCategory = newVal.length > 8 ? newVal.slice(0, 8) : newVal;
      this.hideNextScroll = newVal.length <= 8;
      this.hidePrevScroll = true;
    }
  },
  methods: {
    showCategoryName(category) {
      const categoryName = this.$i18n.locale === "en"
        ? category.category.itemCategoryNameEN
        : category.category.itemCategoryName
      return categoryName.length > 8 ? categoryName.substring(0, 7) + '...' : categoryName
    },
    scrollCategory(type) {
      const mainBox = this.$refs.mainBox;
      const maxScroll = mainBox.scrollWidth - mainBox.clientWidth

      if (type === "next") this.nextScroll += 650
      else this.nextScroll -= 650

      mainBox.scrollTo({
        left: this.nextScroll,
        behavior: "smooth"
      })

      if (this.nextScroll !== 0) {
        this.hidePrevScroll = false
      }

      if (this.nextScroll !== maxScroll) {
        this.hideNextScroll = false
      }

      if (this.nextScroll > maxScroll) {
        this.hideNextScroll = true
      }

      if (this.nextScroll === 0) {
        this.hidePrevScroll = true
      }
    },
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    }
  }
}
</script>

<style scoped>
/*@media (min-width: 768px) and (max-width: 1133px) {
  .category-grid-ipad {
    padding-left: 0 !important;
  }
}*/

@media (max-width: 576px) {
  .d-sm-none {
    display: none !important;
  }
}
</style>
