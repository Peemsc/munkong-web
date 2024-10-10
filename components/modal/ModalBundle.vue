<template>
  <div id="bundleModal" class="modal modal-alert bundle fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-md-5 p-4">
        <div class="row">
          <div class="col-md-5">
            <h4 class="modal-title text-left mb-3">{{ product.itemDescription }}</h4>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-4 col-lg-5">
            <div class="card-photo mb-3 mb-md-0">
              <div class="photo" :style="{ backgroundImage: 'url(' + product.images[0] + ')' }">
                <img src="/img/thumb/frame-100x100.png" alt="">
              </div>
            </div>
          </div><!--col-md-4-->

          <div class="col-md-8 col-lg-7 pl-xl-5 pl-md-3 d-md-flex flex-md-column">

            <div class="pd-row p-0" v-if="selectOption.price === 0">
              <div class="price-wrap lg">
                <span class="price">฿{{ product.unitPrice | numFormat }} - ฿{{ product.unitPriceMax | numFormat }}</span>
              </div>
            </div>


            <div class="pd-row p-0" v-if="selectOption.price !== 0">
              <div class="price-wrap lg">
                <span class="price">฿{{ selectOption.price - selectOption.discount | numFormat}}</span>
                <span class="price-old" v-show="selectOption.discount !== 0">
                  ฿{{ selectOption.price| numFormat}}
                </span>
              </div>

<!--              <p class="ml-auto">2,800 ขายแล้ว</p>-->
            </div>

            <div class="pd-row">
              <p>{{ $t('buyProductGetPoint') }} {{ getPoint }} {{ $t('point') }}</p>

              <a href="#" class="ml-auto" data-toggle="tooltip" title="Tooltip on Top">
                <img class="w-auto" src="/img/icons/icon-infos.svg" alt="">
              </a>
            </div>

            <div class="pd-row"><hr class="w-100 my-0 my-md-3"></div>

            <div class="pd-row">
              <div class="mw-105">
                <h4 class="title-md regular">{{ product.options.name }}</h4>
              </div>
              <ul class="nav color">
                <li v-for="(attribute, index) in product.options.attributes" :key="index+'a'" @click="chooseOption(index, product.options.name)">
                  <span :class="{'active': attribute.name === selectOption.attribute}">{{ attribute.name }}</span>
                </li>
              </ul>
            </div>

            <div class="pd-row" v-if="isShowRequireOption">
              <div class="mw-105">
                <h4 class="title-md regular">{{ listRequire.name }}</h4>
              </div>
              <ul class="nav color">
                <li v-for="(value, index) in listRequire.subValues" :key="index+'ab'" @click="chooseRequireOption(index)">
                  <span :class="{'active': value.name === selectOption.subValue}">{{ value.name }}</span>
                </li>
              </ul>
            </div>

            <div class="pd-row">
              <div class="mw-105">
                <h4 class="title-md regular">{{ $t('quantity') }}</h4>
              </div>
              <div class="input-qty-group lg">
                <button :disabled="selectOption.amount === 1" class="minus" type="button" value="-" @click="manageAmount('-')"></button>
                <input type="text" name="qty" class="qty form-control input-text" maxlength="12" :value="selectOption.amount"/>
                <button class="plus" type="button" value="+" @click="manageAmount('+')"></button>
              </div>
            </div>

            <div class="pd-row pd-buttons mt-auto pb-0">
              <button class="btn btn-gray effect w-160" type="button" data-dismiss="modal"><span>{{ $t('cancel') }}</span></button>
              <button class="btn btn-red effect w-160" type="button" data-dismiss="modal" @click="addItem" :disabled="!statusShopNow">
                <span class="icons icon-bag"></span><span>{{ $t('addToCart') }}</span>
              </button>
            </div><!--pd-row-->
          </div><!--col-md-8-->
        </div><!--row-->
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  data () {
    return {
      brand: false,
      statusShopNow: false,
      isShowRequireOption: false,
      selectOption: {
        id: '',
        name: '',
        attribute: '',
        subName: '', //ออฟชันรอง เช่น ขนาด, ไซส์
        subValue: '', //ชื่อตัวเลือกรอง เช่น S,M,L
        itemNo: '',
        price: 0,
        discount: 0,
        startDate: '',
        endDate: '',
        amount: 1,
      },
      listRequire: [],
      flashSale: {
        status: false
      },
      getPoint: 0,
      prevOption: '',
      isSelectOption: false,
      oldImage: ''
    }
  },
  async fetch () {
    const brand = await this.$store.dispatch('brand/getBrand', this.product.brand)
    this.brand = JSON.parse(JSON.stringify(brand))

    const point = await this.$store.dispatch('point-cashback/getPointCashback')

    if (this.product.point === 0) {
      this.getPoint = Math.round(this.product.unitPrice * (point.cashBack/100))
    } else {
      this.getPoint = this.product.point
    }

    this.oldImage = this.product.images[0]

  },
  mounted() {
    if (this.brand) {
      if (new Date() >= new Date(this.brand.promotion.startDate) && new Date() < new Date(this.brand.promotion.endDate)) {
        if (this.brand.promotion.discount != 0 && this.brand.promotion.type == 'percent') {
          this.maxValue = this.brand.promotion.discount
        }
      }
    }

    if (this.product.options.attributes.length === 1 && this.product.options.attributes[0].subAttribute.subValues.length === 0) {
      this.isNotToggle = true
      const detail = this.product.options.attributes[0]

      const productDiscStart = detail.product.discountStartDate
      const productDiscEnd = detail.product.discountEndDate

      this.selectOption.price = detail.price

      if(this.flashSale.status) {
        this.selectOption.discount = this.selectOption.price * (this.flashSale.discount/100)
      } else if (this.brand && new Date() >= new Date(this.brand.promotion.startDate) && new Date() < new Date(this.brand.promotion.endDate)) {
        if (this.brand.promotion.type === 'percent') {
          this.selectOption.discount = this.selectOption.price * (this.brand.promotion.discount/100) || 0
        } else {
          this.selectOption.discount = this.brand.promotion.discount || 0
        }
      } else if (new Date() >= new Date(productDiscStart) && new Date() < new Date(productDiscEnd)) {
        if (detail.product.discountType === 'percent') {
          this.selectOption.discount = this.selectOption.price * (detail.product.discountValue/100) || 0
        } else {
          this.selectOption.discount = detail.product.discountValue || 0
        }
      }

      this.selectOption.name = this.product.options.name
      this.selectOption.attribute = detail.name
      this.selectOption.itemNo = detail.itemNo

      this.selectOption.startDate = detail.product.discountStartDate
      this.selectOption.endDate = detail.product.discountEndDate
      this.selectOption.id = detail.product._id

      this.checkButtonShopNow()
    }
  },
  computed: {
    product () {
      return this.$store.state.bundle.selectItem
    }
  },
  methods: {
    checkButtonShopNow () {
      if (this.isShowRequireOption) {
        this.statusShopNow = this.selectOption.subValue !== '' && this.selectOption.subName !== '';
      } else this.statusShopNow = this.selectOption.name !== '';
    },
    manageAmount (type) {
      if (type === '-') {
        this.selectOption.amount -= 1
      } else {
        this.selectOption.amount += 1
      }
    },
    toggleOption () {
      this.isSelectOption = this.prevOption === '' || this.prevOption !== this.selectOption.attribute + this.selectOption.subValue;

      if (!this.isSelectOption && !this.isNotToggle) {
        this.product.images[0] = this.oldImage
        this.selectOption = {
          id: '',
          flashSale: null,
          name: '',
          attribute: '',
          subName: '',
          subValue: '',
          itemNo: '',
          price: 0,
          discount: 0,
          startDate: '',
          endDate: '',
          amount: 1,
        }
      }
    },
    chooseOption (index, optionName) {
      const detail = this.product.options.attributes[index]
      this.prevOption = this.selectOption.attribute+this.selectOption.subValue
      if (detail.subAttribute.subValues.length > 0) {
        this.isShowRequireOption = true
        this.listRequire = this.product.options.attributes[index].subAttribute
        this.selectOption.name = optionName
        this.selectOption.attribute = detail.name

        this.selectOption.subName = ''
        this.selectOption.subValue = ''
      } else {
        this.selectOption.name = optionName
        this.selectOption.attribute = detail.name
        this.selectOption.price = detail.price
        this.selectOption.itemNo = detail.itemNo

        this.product.images[0] = detail.image

        const productDiscStart = detail.product.discountStartDate
        const productDiscEnd = detail.product.discountEndDate

        if(this.flashSale.status) {
          this.selectOption.discount = this.selectOption.price * (this.flashSale.discount/100)
        } else if (this.brand && new Date() >= new Date(this.brand.promotion.startDate) && new Date() < new Date(this.brand.promotion.endDate)) {
          this.selectOption.discount = this.selectOption.price * (this.brand.promotion.discount/100) || 0
        } else if (new Date() >= new Date(productDiscStart) && new Date() < new Date(productDiscEnd)) {
          if (detail.product.discountType === 'percent') {
            this.selectOption.discount = this.selectOption.price * (detail.product.discountValue/100) || 0
          } else {
            this.selectOption.discount = detail.product.discountValue || 0
          }
        }

        this.selectOption.startDate = detail.product.discountStartDate
        this.selectOption.endDate = detail.product.discountEndDate
        this.selectOption.id = detail.product._id

        this.toggleOption()
      }

      this.checkButtonShopNow()
    },
    chooseRequireOption (index) {
      this.prevOption = this.selectOption.attribute+this.selectOption.subValue

      this.selectOption.subName = this.listRequire.name
      const detail = this.listRequire.subValues[index]

      this.selectOption.price = detail.price
      this.selectOption.itemNo = detail.itemNo
      this.selectOption.subValue = detail.name

      const productDiscStart = detail.product.discountStartDate
      const productDiscEnd = detail.product.discountEndDate

      if(this.flashSale.status) {
        this.selectOption.discount = this.selectOption.price * (this.flashSale.discount/100)
      } else if (this.brand && new Date() >= new Date(this.brand.promotion.startDate) && new Date() < new Date(this.brand.promotion.endDate)) {
        this.selectOption.discount = this.selectOption.price * (this.brand.promotion.discount/100) || 0
      } else if (new Date() >= new Date(productDiscStart) && new Date() < new Date(productDiscEnd)) {
        if (detail.product.discountType === 'percent') {
          this.selectOption.discount = this.selectOption.price * (detail.product.discountValue/100) || 0
        } else {
          this.selectOption.discount = detail.product.discountValue || 0
        }
      }

      this.selectOption.startDate = detail.product.discountStartDate
      this.selectOption.endDate = detail.product.discountEndDate
      this.selectOption.id = detail.product._id

      this.checkButtonShopNow()
      this.toggleOption()
    },

    addItem (type) {
      const product = {
        isCheck: true,
        canInstallment: this.product.isInstallment,
        image: this.product.images[0],
        price: this.selectOption.price,
        brand: this.product.brand,
        category: this.product.category,
        discount: this.selectOption.discount,
        name: this.product.itemDescription,
        amount: this.selectOption.amount,
        option: this.selectOption,
        _id: this.product._id
      }
      this.$store.commit('cart/ADD_TO_CART', JSON.parse(JSON.stringify(product)));

      const createCart = {
        catalog: this.product._id,
        amount: this.selectOption.amount,
        discount: this.selectOption.discount
      }

      this.$store.dispatch('cart/createCart', createCart);

      // if (type !== 'shopNow') {
      //   $('#successModal').appendTo("body").modal('show');
      //   setInterval(() => {
      //     $('#successModal').modal('hide');
      //   }, 1000)
      // }
      //
      // if (type === 'shopNow') {
      //   window.location.href = '/cart'
      // }
    },

  }
}
</script>

<style scoped>

</style>
