<template>
  <div class="page">
    <div class="section-product">
      <div class="container-fluid d-flex">
        <div class="container-inner">
          <div class="sidebar">
            <div class="filter-row mt-3 filter-toggle" @click="toggleFilter">
              <h3>
                <span class="icons icon-filter"></span>{{ $t("category") }}
              </h3>
            </div>

            <div class="sidebar-filter">
              <div class="accordion-filter" id="filterAccordion">
                <ul class="nav nav-accordion">
                  <li v-for="(category, index) in listCategory" :key="index">
                    <h5
                      data-toggle="collapse"
                      :data-target="'#category_' + index"
                      @click="selectSubcategory(category, category)"
                    >
                      {{
                        $i18n.locale === "th"
                          ? category.category.itemCategoryName
                          : category.category.itemCategoryNameEN
                      }}
                    </h5>
                    <div
                      :id="'category_' + index"
                      class="collapse"
                      data-parent="#filterAccordion"
                    >
                      <ul class="nav nav-subcat">
                        <li
                          :class="
                            selectSubCate.id === subCategory.id ? 'active' : ''
                          "
                          v-for="(subCategory, index) in category.subCategory"
                          :key="index"
                          @click="selectSubcategory(subCategory, category)"
                        >
                          <span>
                            <!--                              {{ subCategory.name }}-->
                            {{
                              $i18n.locale === "th"
                                ? subCategory.name
                                : subCategory.nameEN
                            }}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <!--collapse-->
                  </li>
                </ul>
              </div>
            </div>
            <!--sidebar-filter-->
          </div>

          <div class="content-filter">
            <div class="hgroup p-0 m-0">
              <p>
                {{ $t("foundProduct") }} {{ pagination.totalItems }}
                {{ $t("list") }}
              </p>
              <h2>{{ $t("allProduct") }}</h2>
              <hr />
            </div>

            <h3 class="filter-toggle d-flex d-lg-none" @click="toggleFilter">
              <span class="icons icon-filter"></span>{{ $t("category") }}
            </h3>

            <div class="content">
              <div class="filter-row d-md-flex pt-2 sm-center">
                <ul class="nav nav-filter p-0 m-0">
                  <li class="mb-2" @click="type = 'all'">
                    <span :class="{ active: type === 'all' }">{{
                      $t("all")
                    }}</span>
                  </li>
                  <li>
                    <a class="flash-sale" href="/product-flash-sale"
                      >Flash Sale</a
                    >
                  </li>
                  <li @click="type = 'promotion'">
                    <span :class="{ active: type === 'promotion' }">{{
                      $t("promotionProduct")
                    }}</span>
                  </li>
                  <li @click="type = 'suggestion'">
                    <span :class="{ active: type === 'suggestion' }">{{
                      $t("suggestProduct")
                    }}</span>
                  </li>
                  <li class="" @click="type = 'new'">
                    <span :class="{ active: type === 'new' }">{{
                      $t("newProduct")
                    }}</span>
                  </li>
                </ul>

                <div class="sort-wrap flex-row mt-0">
                  <h5>{{ $t("sortBy") }}</h5>
                  <div class="dropdown select xs w-150">
                    <button class="btn" data-toggle="dropdown" type="button">
                      <li>
                        <span v-if="sort === 'popular'">{{
                          $t("sortPopular")
                        }}</span>
                        <span v-else-if="sort === 'minMax'"
                          >{{ $t("price") }} : {{ $t("minMax") }}</span
                        >
                        <span v-else-if="sort === 'maxMin'"
                          >{{ $t("price") }} : {{ $t("maxMin") }}</span
                        >
                        <span v-else-if="sort === 'sortAZ'">{{
                          $t("sortAZ")
                        }}</span>
                        <span v-else-if="sort === 'sortZA'">{{
                          $t("sortZA")
                        }}</span>
                        <span v-else-if="sort === 'sortCreatedAt'">{{
                          $t("sortCreateAt")
                        }}</span>
                      </li>
                    </button>
                    <ul class="dropdown-menu">
                      <li @click="sort = 'popular'">
                        <span>{{ $t("sortPopular") }}</span>
                      </li>
                      <li @click="sort = 'minMax'">
                        <span>{{ $t("price") }} : {{ $t("minMax") }}</span>
                      </li>
                      <li @click="sort = 'maxMin'">
                        <span>{{ $t("price") }} : {{ $t("maxMin") }}</span>
                      </li>
                      <li @click="sort = 'sortAZ'">
                        <span>{{ $t("sortAZ") }}</span>
                      </li>
                      <li @click="sort = 'sortZA'">
                        <span>{{ $t("sortZA") }}</span>
                      </li>
                      <li @click="sort = 'sortCreatedAt'">
                        <span>{{ $t("sortCreateAt") }}</span>
                      </li>
                    </ul>
                  </div>
                  <!--dropdown-->
                </div>
              </div>

              <div class="filter-row pt-0">
                <hr />
              </div>

              <div class="filter-row pt-0" v-if="selectSubCate.id !== ''">
                <div class="filter-label">
                  <div class="label-group">
                    <div v-if="selectSubCate.id !== ''" class="label">
                      Category : {{ selectSubCate.name }}
                      <span class="del" @click="clearCategory"></span>
                    </div>
                  </div>

                  <div class="label clear">
                    Clear Filter <span class="del"></span>
                  </div>
                </div>
              </div>
              <div class="row product-list wow fadeIn" id="filter-product-list">
                <!--==================[Start] Product List====================-->
                <div
                  class="cols p-0"
                  v-for="(product, index) in listProduct"
                  :key="index"
                >
                  <ProductCard :product="product" :key="product._id" />
                </div>
                <!--cols-->
              </div>
              <!--product-list-->
              <ul
                class="pagination justify-content-center pt-5"
                v-if="pagination.pageTotal > 0"
              >
                <li :class="{ disabled: nowPage <= 1 }" class="first">
                  <a style="cursor: pointer; width: 90px" @click="nowPage = 1">
                    <img
                      src="../../assets/img/icons/first_page.svg"
                      alt=""
                      class="icon-pagination"
                    />
                  </a>
                </li>

                <li :class="{ disabled: nowPage - 10 < 1 }" class="first">
                  <a style="cursor: pointer" @click="nowPage -= 10">
                    <span class="arrow">
                      <span class="arrow-left"></span>
                      <span class="arrow-left" style="margin-left: 5px"></span>
                    </span>
                  </a>
                </li>

                <li :class="{ disabled: nowPage <= 1 }" class="first">
                  <a style="cursor: pointer" @click="nowPage -= 1">
                    <span class="arrow"
                      ><span class="arrow-left"></span
                      ><span class="arrow-left"></span
                    ></span>
                  </a>
                </li>

                <template v-for="page in displayPages">
                  <li
                    :class="{ active: parseInt(nowPage) === parseInt(page) }"
                    :key="page"
                  >
                    <a style="cursor: pointer" @click="nowPage = page">{{
                      page
                    }}</a>
                  </li>
                </template>

                <li
                  :class="{
                    disabled: parseInt(nowPage) === pagination.pageTotal,
                  }"
                  class="first"
                >
                  <a style="cursor: pointer" @click="nowPage += 1">
                    <span class="arrow"><span class="arrow-right"></span></span>
                  </a>
                </li>

                <li
                  :class="{ disabled: nowPage + 10 > pagination.pageTotal }"
                  class="first"
                >
                  <a style="cursor: pointer" @click="nowPage += 10">
                    <span class="arrow">
                      <span
                        class="arrow-right"
                        style="margin-left: -5px"
                      ></span>
                      <span class="arrow-right"></span>
                    </span>
                  </a>
                </li>

                <li
                  :class="{
                    disabled: parseInt(nowPage) === pagination.pageTotal,
                  }"
                  class="first"
                >
                  <a
                    style="cursor: pointer; width: 80px"
                    @click="nowPage = pagination.pageTotal"
                  >
                    <img
                      src="../../assets/img/icons/last_page.svg"
                      alt=""
                      class="icon-pagination"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <!--content-->
          </div>
          <!--content-filter-->
        </div>
        <!--container-inner-->
      </div>
      <!--container-fluid-->
    </div>
    <!--section-setting-->
  </div>
  <!--page-->
</template>

<script>
import ProductCard from "@/components/product-card/ProductCard";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'view_item' })
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content,
        },
      ],
    };
  },
  components: { ProductCard },
  data() {
    return {
      meta: {
        title: "",
        hid: "",
        name: "",
        content: "",
      },
      opened: false,
      isActive: false,
      selectSubCate: {
        name: "",
        id: "",
      },
      type: "all",
      isLoggedIn: false,
      sort: "popular",
      searchBrandName: "",
      nowPage: 1,
      search: "",
      // productSort: {
      //   unitPrice: "",
      // },
    };
  },
  watch: {
    nowPage(newVal) {
      this.nowPage = newVal;
      this.onLoadProduct();
    },
    sort(newVal) {
      this.sort = newVal;
      this.onLoadProduct();
    },
    type(newVal) {
      this.type = newVal;
      this.onLoadProduct();
    },
  },
  async fetch() {
    await this.$store.dispatch("setting/getSetting", "home");
    let queryFilter = {
      page: 1,
      category: this.selectSubCate.id,
      sort: this.sort,
      type: this.type,
      search: this.$route.query.search,
    };

    if (this.$route.query.subid) {
      queryFilter.category = this.$route.query.subid;
    }

    const queryParams = new URLSearchParams(queryFilter).toString();

    await this.$store.dispatch("product/fetchProduct", queryParams);
    await this.$store.dispatch("category/fetchWithSubcategory");
    await this.$store.dispatch("brand/fetchBrand");
    await this.$store.dispatch("flash-sale/fetchFlashSale");

    if (this.$route.query.subname) {
      this.meta.title =
        this.$i18n.locale === "th"
          ? this.$route.query.subname
          : this.$route.query.subname;
      this.meta.hid =
        this.$i18n.locale === "th"
          ? this.$route.query.subname
          : this.$route.query.subname;
      this.meta.name =
        this.$i18n.locale === "th"
          ? this.$route.query.subname
          : this.$route.query.subname;
      this.meta.content =
        this.$i18n.locale === "th"
          ? this.$route.query.subname
          : this.$route.query.subname;
    } else {
      this.meta.title = this.$i18n.locale === "th" ? "สินค้า" : "Product";
      this.meta.hid = this.$i18n.locale === "th" ? "สินค้า" : "Product";
      this.meta.name = this.$i18n.locale === "th" ? "สินค้า" : "Product";
      this.meta.content = this.$i18n.locale === "th" ? "สินค้า" : "Product";
    }
  },
  created() {
    if (this.$route.query.filter) {
      this.type = this.$route.query.filter;
    }
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }
    if (this.$route.query.subname && this.$route.query.subid) {
      this.selectSubCate.name = this.$route.query.subname;
      this.selectSubCate.id = this.$route.query.subid;
    }
    this.isLoggedIn = this.$auth.loggedIn;
  },
  methods: {
    async onLoadProduct() {
      let queryFilter = {
        page: this.nowPage,
        category: this.selectSubCate.id,
        sort: this.sort,
        type: this.type,
        search: this.$route.query.search,
      };

      const queryParams = new URLSearchParams(queryFilter).toString();

      await this.$store.dispatch("product/fetchProduct", queryParams);

      window.scrollTo(0,0);
    },
    async selectSubcategory(data, category) {
      const view = {
        category: category._id,
        customer: this.isLoggedIn ? this.$auth.user._id : null,
      };

      let queryFilter = {
        page: 1,
        category: data.id || data.category._id,
        sort: this.sort,
        type: this.type,
        search: this.$route.query.search,
      };

      const queryParams = new URLSearchParams(queryFilter).toString();

      await this.$store.dispatch("product/fetchProduct", queryParams);

      await this.$store.dispatch("count-view/createView", view);

      this.selectSubCate.id = data.id || data.category._id;
      this.selectSubCate.name = data.name || data.category.itemCategoryName;

      // Reset the current page to 1
      this.nowPage = 1;

      // Fetch the products based on the updated subcategory and pagination
      this.onLoadProduct();
    },
    clearBrand() {
      this.selectBrand = {
        name: "",
        id: "",
      };
    },
    clearCategory() {
      this.selectSubCate = {
        name: "",
        id: "",
      };

      this.onLoadProduct();
    },
    toggleFilter() {
      $("html").toggleClass("filter-opened");
      // this.opened = !this.opened;
      // if (this.opened == true) {
      //   $('#filter-product-list .cols').css("width", '16%');
      // }else{
      //   $('#filter-product-list .cols').css("width", '20%');
      // }
    },
    showSort() {
      $("#sort-option").toggleClass("show");
    },
  },
  computed: {
    // filteredProducts() {
    //   return this.$store.getters["product/filteredProducts"](this.sortPrice);
    // },
    pagination() {
      return this.$store.state.product.pagination;
    },
    displayPages() {
      const totalPages = this.pagination.pageTotal;
      let currentPage = this.nowPage;

      if (totalPages < 5)
        return [...Array(totalPages).keys()].map((i) => i + 1);

      if ([1, 2].includes(currentPage)) currentPage = 3;
      else if ([totalPages - 1, totalPages].includes(currentPage))
        currentPage = totalPages - Math.trunc(5 / 2);

      return [...Array(5).keys()].map(
        (i) => i - Math.trunc(5 / 2) + currentPage
      );
    },
    listProduct() {
      return this.$store.state.product.products;
    },
    listBrands() {
      return this.$store.getters["brand/searchBrand"](this.searchBrandName);
    },
    listCategory() {
      return this.$store.state.category.cateWithSubCate;
    },
    searchBrand() {
      if (this.search) {
        return this.$store.getters["brand/search"](this.search);
      }
      return [];
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
@media (min-width: 1440px) {
  .container-fluid {
    width: 1402px;
  }
}

.section-product {
  background: #f5f5f5;
}

/* .section-product .sidebar {
  background: #fff;
} */
.content-filter {
  padding-top: 20px;
}

.m-top-mobile {
  margin-top: 10px;
}

@media (max-width: 1812px) {
  .m-top-mobile {
    margin-top: 0px;
  }
}
@media (min-width: 768px) and (max-width: 1133px) {
  .arrow-icon {
    right: 5px;
    top: 30px;
  }

  .arrow-icon-active {
    right: 5px;
    top: 30px;
  }
}

@media (max-width: 767px) {
  .accordion-filter .nav .nav li span {
    padding: 9px 10px 0px 40px;
  }
}

@media (max-width: 440px) {
  .arrow-icon {
    right: 5px;
    top: 19px;
  }

  .arrow-icon-active {
    right: 5px;
    top: 19px;
  }
}
</style>
