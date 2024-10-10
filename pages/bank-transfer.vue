<template>
  <div class="page p-0">
    <div class="section-setting checkout" v-if="data !== null">
      <div class="container">
        <div class="container-inner pt-3">
          <div class="setting-content">
            <div class="bgroup">
              <h3 class="title-md mt-2">{{ $t('bankTransfer') }}</h3>
              <span class="text-danger">
                {{ $t('bankTransferRemark') }}
              </span>
            </div><!--bgroup-->

            <div class="order-box">
              <hr class="mt-0 mt-md-4 mb-0">
              <div class="card-order cart md">
                <div class="card-photo">
                  <img src="/img/icons/icon-bbl.png" width="75px" height="75px"/>
                </div>
                <div class="card-body">
                  <div class="cols ml-0">
                    <h5 class="mb-2">ธนาคารกรุงเทพ (BKK)</h5>
                    <h4 class="mb-2" style="color: blue; font-size: 22px">879-0-39250-3</h4>
                    <p class="m-0 black-50">ชื่อบัญชี : บริษัท มั่นคงออนไลน์ จำกัด / MUNKONG ONLINE CO., LTD. สาขา : เซ็นทรัลเวิลด์</p>
                  </div>
                </div><!--card-body-->
              </div><!--card-order-->

              <div class="card-order cart md">
                <div class="card-photo">
                  <img src="/img/icons/icon-kbank.png" width="75px" height="75px"/>
                </div>
                <div class="card-body">
                  <div class="cols ml-0">
                    <h5 class="mb-2">ธนาคารกสิกรไทย (KBank)</h5>
                    <h4 class="mb-2" style="color: green; font-size: 22px">772-2-28577-2</h4>
                    <p class="m-0 black-50">ชื่อบัญชี : บริษัท มั่นคงออนไลน์ จำกัด / MUNKONG ONLINE CO., LTD. สาขา : เซ็นทรัลเวิลด์</p>
                  </div>
                </div><!--card-body-->
              </div><!--card-order-->

              <div class="card-order cart md">
                <div class="card-photo">
                  <img src="/img/icons/icon-scb.png" width="75px" height="75px"/>
                </div>
                <div class="card-body">
                  <div class="cols ml-0">
                    <h5 class="mb-2">ธนาคารไทยพาณิชย์ (SCB)</h5>
                    <h4 class="mb-2" style="color: purple; font-size: 22px">247-2-16083-6</h4>
                    <p class="m-0 black-50">ชื่อบัญชี : บริษัท มั่นคงออนไลน์ จำกัด / MUNKONG ONLINE CO., LTD. สาขา : เซ็นทรัลเวิลด์</p>
                  </div>
                </div><!--card-body-->
              </div><!--card-order-->

              <div class="card-order cart md">
                <div class="card-photo">
                  <img src="/img/icons/icon-ktb.png" width="75px" height="75px"/>
                </div>
                <div class="card-body">
                  <div class="cols ml-0">
                    <h5 class="mb-2">ธนาคารกรุงไทย (KTB)</h5>
                    <h4 class="mb-2" style="color: deepskyblue; font-size: 22px">691-0-20690-8</h4>
                    <p class="m-0 black-50">ชื่อบัญชี : บริษัท มั่นคงออนไลน์ จำกัด / MUNKONG ONLINE CO., LTD. สาขา : เซ็นทรัลเวิลด์</p>
                  </div>
                </div><!--card-body-->
              </div><!--card-order-->

              <div class="card-order cart md">
                <div class="card-photo">
                  <img src="/img/icons/icon-ttb.png" width="75px" height="75px"/>
                </div>
                <div class="card-body">
                  <div class="cols ml-0">
                    <h5 class="mb-2">ธนาคารทหารไทยธนชาติ (TTB)</h5>
                    <h4 class="mb-2" style="color: orange; font-size: 22px">216-2-37027-0</h4>
                    <p class="m-0 black-50">ชื่อบัญชี : บริษัท มั่นคงออนไลน์ จำกัด / MUNKONG ONLINE CO., LTD. สาขา : เซ็นทรัลเวิลด์</p>
                  </div>
                </div><!--card-body-->
              </div><!--card-order-->
            </div><!--order-box-->

            <div class="bgroup pt-0">
              <hr class="mt-0">

              <h3 class="title-md pt-3">{{ $t('transferConfirm') }}</h3>

              <div class="form-content pb-2">
                <div class="row">
                  <div class="col-md-12">
                    <select class="custom-select kanit" v-model="bankTransfer">
                      <option value="select">{{ $t('bankAccount') }}</option>
                      <option value="bkk">ธนาคารกรุงเทพ (BKK)</option>
                      <option value="kbank">ธนาคารกสิกรไทย (KBank)</option>
                      <option value="scb">ธนาคารไทยพาณิชย์ (SCB)</option>
                      <option value="ktb">ธนาคารกรุงไทย (KTB)</option>
                      <option value="ttb">ธนาคารทหารไทยธนชาติ (TTB)</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <input type="date" class="form-control kanit" v-model="date" pattern="\d{4}" maxlength="4" required>
                  </div>

                  <div class="col-md-6">
                    <input type="time" class="form-control kanit" v-model="time">
                  </div>

                </div><!--row-->
              </div>

              <hr>

              <div class="pt-3 d-flex">
                <h3 class="title-md mr-1">{{ $t('AttachmentSlip') }}</h3><span style="color: red; margin-right: 3px"> *</span><span>{{ $t('maxFileSize') }}</span>
              </div>

              <div class="form-content">
<!--                  <div style="display: flex; justify-content: space-between; margin-top: 20px">-->
<!--                    <div class="box-outline-review" @click="$refs.selectedImage.click()" style="background-color: black">-->
<!--                      <img src="/img/icons/icon-image.svg" alt="" width="25px" height="25px">-->
<!--                      <span class="mt-2" style="color: white">{{ $t('addImage') }}</span>-->
<!--                    </div>-->

<!--                    <input type="file" class="d-none" ref="selectedImage"/>-->

<!--                  </div>-->
                <ul class="nav nav-upload">
                  <li class="done" v-if="image">
                    <div class="photo" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
                    <span class="icons" @click="deleteImage(index)"></span>
                  </li>

                  <li v-if="image == null">
                    <div class="photo" @click="$refs.selectedImage.click()"></div>
                    <span class="icons"></span>
                    <input type="file" class="d-none" ref="selectedImage" @change="inputImage"/>
                  </li>
                </ul>
              </div>

            </div><!--bgroup-->
          </div><!--setting-content-->

          <div class="setting-sidebar right" v-if="data">
            <div class="bgroup">
              <h3 class="title-lg mt-2">ตรวจสอบที่อยู่และชำระเงิน</h3>
            </div>

            <div class="order-box">
              <hr class="mt-0 mt-md-4 mb-0">
              <template v-for="(item, index) in data.products">
                <div class="card-order cart md" :key="index">
                  <div class="card-photo" :data-title="$t('detailProduct')">
                    <div class="photo" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
                  </div>
                  <div class="card-body">
                    <div class="cols info ml-0">
                      <h5 class="mb-2">{{ item.name }}</h5>
                      <p class="m-0 black-50">{{ item.option.name }} : {{ item.option.attribute }}</p>
                    </div>
                    <div class="cols qty" :data-title="$t('quantity')">
                      <input type="text" disabled name="qty" class="qty form-control" maxlength="12" :value="item.quantity"/>
                    </div>
                    <div class="cols price total mr-0" :data-title="$t('totalPrice')">
                      <h4 class="reddark">฿{{ (item.unitPrice - item.discount) * item.quantity | numFormat }}</h4>
                    </div>
                  </div><!--card-body-->
                </div><!--card-buy-again-->
              </template>
            </div><!--order-box-->

            <div class="bgroup">
              <h3 class="title-lg mt-2 mb-3">{{ $t('messageTitleSummary') }}</h3>

              <div class="order-summary h-auto">
                <!-- Coupon type discount -->
<!--                <div class="d-flex py-1" v-if="isLoggedIn && coupon !== null && coupon.type === 'discount'">-->
<!--                  <p>{{ $t('couponDiscount') }} <span style="color: #FFAB00">{{ coupon.name }}</span></p>-->
<!--                  <h5 class="ml-auto f-16 line-through">฿{{ data.couponDiscount | numWithFloat }}</h5>-->
<!--                </div>-->
                <!-- Coupon type cashback -->
<!--                <div class="d-flex py-1" v-if="isLoggedIn && coupon !== null && coupon.type === 'cashback'">-->
<!--                  <p>{{ $t('couponCashBack') }} <span style="color: #FFAB00">{{ coupon.name }}</span></p>-->
<!--                  <h5 class="ml-auto f-16">{{ data.couponCashback | numWihOutFloat }}</h5>-->
<!--                </div>-->
                <div class="d-flex py-1">
                  <p>{{ $t('discount') }} Bundle Deal</p>
                  <h5 class="ml-auto f-16 line-through">฿{{ parseInt(data.totalBundle)  }}</h5>
                </div>
                <div class="d-flex py-1" v-if="isLoggedIn">
                  <p>{{ $t('getCashback') }}</p>
                  <h5 class="ml-auto f-16">{{ parseInt(data.point + data.couponCashback) | numFormat  }}</h5>
                </div>
              </div>

            </div>

            <div class="bgroup pt-0">
              <hr class="mt-0 pb-2">

              <div class="order-summary d-flex h-auto">
                <div>
                  <h5 class="title-lg">{{ $t('totalPriceInclVat') }}</h5>
                  <p class="sarabun black-50 m-0">({{ $t('includeVat') }})</p>
                </div>
                <h4 class="title-lg reddark kanit ml-auto">
                  ฿{{ data.totalAmt | numFormat  }}
                </h4>
              </div>

              <hr class="mt-4 pb-lg-4 pb-2">

              <div class="d-flex">
                <button class="btn btn-gray lg effect w-100 mr-4" @click="cancelOrder"><span>{{ $t('cancel') }}</span></button>
                <button class="btn btn-black lg effect w-100" :disabled="!(date !== null && file !== null && time !== null)" @click="saveData">
                  <span>{{ $t('continue') }}</span>
                </button>
              </div>
            </div>

          </div><!--setting-sidebar-->

        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-setting-->

    <ModelPaymentSuccess ref="modal"/>
    <ModelPaymentFail />
  </div><!--page-->
</template>

<script>
import jwt from 'jsonwebtoken'
import ModelPaymentFail from "@/components/modal/ModelPaymentFail";
import ModelPaymentSuccess from "@/components/modal/ModelPaymentSuccess";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "blank",
  components: {
    ModelPaymentFail,
    ModelPaymentSuccess,
  },
  data () {
    return {
      data: null,
      isLoggedIn: false,
      image: null,
      file: null,
      date: null,
      time: null,
      orderId: null,
      bankTransfer: 'select'
    }
  },
  async fetch() {
    const order = await this.$store.dispatch('order/getOrder', this.$route.query.data)
    this.data = order.data
    this.orderId = order.data._id
  },
  created() {
    this.isLoggedIn = this.$auth.loggedIn
  },
  methods: {
    deleteImage (index) {
      this.image = null
      this.file = null
    },
    inputImage (e) {
      const file = e.target.files[0]
      this.image = URL.createObjectURL(file)
      this.file = file
    },
    async cancelOrder() {
      let updateOrder = {
        status: 'pay',
        paymentStatus: 'pending',
        id: this.orderId
      }
      const result = await this.$store.dispatch('order/updateOrder', updateOrder)
      if (result.status) {
        $('#paymentFailModal').appendTo('body').modal('show')
        setTimeout(() => {
          if (this.isLoggedIn) {
            window.location.href = '/member?status=all'
          } else {
            window.location.href = '/cart'
          }
        }, 1000)
      }
    },
    async saveData () {
      try {
        const dateParts = this.date.split('-')
        const timeParts = this.time.split(':')
        dateParts[1] -= 1;
        const dateTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();

        const formData = new FormData()
        formData.append('file', this.file, this.file.name)
        const image = await this.$store.dispatch('upload_file/uploadFile', formData)

        const updateData = {
          paymentDate: dateTime,
          slip: image.url,
          bankTransfer: this.bankTransfer,
          id: this.orderId,
          paymentStatus: 'success',
          status: 'pending'
        }

        const result = await this.$store.dispatch('order/updateOrder', updateData)
        if (result.status) {
          this.$store.commit('cart/REMOVE_SUCCESS_ITEM')
          this.$store.commit('cart/SAVE_CART')
          await this.$gtm.push({ event: 'thank_you_page' })
          $('#paymentSuccessModal').appendTo("body").modal({
            backdrop: 'static',
            keyboard: true,
            show: true
          })
        } else {
          $('#paymentFailModal').appendTo('body').modal('show')
          setTimeout(() => {
            if (this.isLoggedIn) {
              window.location.href = '/member?status=all'
            } else {
              window.location.href = '/cart'
            }
          }, 1000)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style scoped>

</style>
