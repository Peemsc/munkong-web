<template>
  <div class="page">
    <div class="section-blog" style="background-color: #f5f5f5;">
      <div class="container">
        <div class="container-inner" style="background-color: #f5f5f5;">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active"><a href="#">{{ $t('brand') }}</a></li>
              </ul>

              <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div>
            </div>

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>{{ $t('brand') }}</h5>
            </div>

            <div class="blog-details px-0">

              <div class="details text-center wow fadeIn">
                <h2 class="text-center">{{ $t('brandSuggest') }}</h2>
              </div>

              <div class="form-group search-lg">
                <input type="text" class="form-control" v-model="textSearch" :placeholder="$t('searchBrand')" v-bind:on-keyup="searchBrand">
              </div>

              <div class="brand-suggest">
                <template v-for="(item, index) in listData">
                  <a :href="`/select-brands/?b=${item._id}`" :key="index">{{ item.brandName }}</a>
                  <br class="d-none d-md-block" v-if="(index + 1) % 5 === 0">
                </template>

              </div>

              <hr class="my-md-5 my-4">
              <div class="character-filter">
                <a @click="filter = 'All'" :class="{ 'active': filter === 'All' }">All</a>
                <a @click="filter = 'A'" :class="{ 'active': filter === 'A' }">A</a>
                <a @click="filter = 'B'" :class="{ 'active': filter === 'B' }">B</a>
                <a @click="filter = 'C'" :class="{ 'active': filter === 'C' }">C</a>
                <a @click="filter = 'D'" :class="{ 'active': filter === 'D' }">D</a>
                <a @click="filter = 'E'" :class="{ 'active': filter === 'E' }">E</a>
                <a @click="filter = 'F'" :class="{ 'active': filter === 'F' }">F</a>
                <a @click="filter = 'G'" :class="{ 'active': filter === 'G' }">G</a>
                <a @click="filter = 'H'" :class="{ 'active': filter === 'H' }">H</a>
                <a @click="filter = 'I'" :class="{ 'active': filter === 'I' }">I</a>
                <a @click="filter = 'J'" :class="{ 'active': filter === 'J' }">J</a>
                <a @click="filter = 'K'" :class="{ 'active': filter === 'K' }">K</a>
                <a @click="filter = 'L'" :class="{ 'active': filter === 'L' }">L</a>
                <a @click="filter = 'M'" :class="{ 'active': filter === 'M' }">M</a>
                <a @click="filter = 'N'" :class="{ 'active': filter === 'N' }">N</a><br class="d-none d-md-block">

                <a @click="filter = 'O'" :class="{ 'active': filter === 'O' }">O</a>
                <a @click="filter = 'P'" :class="{ 'active': filter === 'P' }">P</a>
                <a @click="filter = 'Q'" :class="{ 'active': filter === 'Q' }">Q</a>
                <a @click="filter = 'R'" :class="{ 'active': filter === 'R' }">R</a>
                <a @click="filter = 'S'" :class="{ 'active': filter === 'S' }">S</a>
                <a @click="filter = 'T'" :class="{ 'active': filter === 'T' }">T</a>
                <a @click="filter = 'U'" :class="{ 'active': filter === 'U' }">U</a>
                <a @click="filter = 'V'" :class="{ 'active': filter === 'V' }">V</a>
                <a @click="filter = 'W'" :class="{ 'active': filter === 'W' }">W</a>
                <a @click="filter = 'X'" :class="{ 'active': filter === 'X' }">X</a>
                <a @click="filter = 'Y'" :class="{ 'active': filter === 'Y' }">Y</a>
                <a @click="filter = 'Z'" :class="{ 'active': filter === 'Z' }">Z</a>
              </div>

              <div class="brand-character" v-if="filter !== 'All'">
                <h5>{{ filter }}</h5>
                <div class="row" v-for="(brand, index) in filterBrand" :key="'A' + index">
                  <div class="col-md-4">
                    <a :href="'/select-brands/?b=' + brand._id">{{ brand.brandName }}</a>
                  </div><!--box-->
                </div>
              </div><!--brand-character-->

              <div class="brand-character" v-if="filter === 'All'">
                <template v-for="(char, indexChar) in listChar">
                  <h5 :key="indexChar">{{ char }}</h5>
                  <div class="row">
                    <div class="col-md-4" v-if="brand.brandName[0].toUpperCase() === char"
                      v-for="(brand, indexBrand) in brands" :key="brand._id + indexChar">
                      <a :href="'/select-brands/?b=' + brand._id">{{ brand.brandName }}</a>
                    </div><!--box-->
                  </div>
                </template>

              </div><!--brand-character-->
            </div><!--blog-details-->
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->

  </div><!--page-->
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  name: "brands",
  data() {
    return {
      filter: 'All',
      // listChar: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      //   'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      listChar: [],
      listData: [],
      textSearch: ''
    }
  },
  async fetch() {
    await this.$store.dispatch('setting/getSetting')
    await this.$store.dispatch('brand/fetchBrand')
    await this.$store.dispatch('brand/showPriority')
  },
  beforeMount() {
    this.brands.map(item => {
      if (this.listChar.indexOf(item.brandName[0].toUpperCase()) < 0) {
        this.listChar.push(item.brandName[0].toUpperCase())
      }
    })
    this.listChar.sort((a, b) => a.localeCompare(b))
  },
  computed: {
    brands() {
      return this.$store.state.brand.brands
    },
    searchBrand() {
      if(this.textSearch != ''){
        this.listData = this.$store.getters['brand/searchBrand'](this.textSearch)
      }else{
        this.listData =  this.$store.state.brand.brandListPriority
      }
    },
    filterBrand() {
      return this.$store.getters['brand/filterBrand'](this.filter)
    },
    brandListPriority() {
      this.listData =  this.$store.state.brand.brandListPriority
    }
  }
}
</script>

<style scoped>
.character-filter a {
  cursor: pointer;
}

.brand-character a {
  font-size: 16px;
  font-weight: 400;
  color: rgba(17, 17, 17, 0.6);
}
@media (max-width: 767px) {
  .section-blog .container-inner {
    padding: 0px;
  }
}
</style>
