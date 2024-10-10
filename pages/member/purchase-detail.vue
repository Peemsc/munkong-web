<template>
  <div class="setting-content">
    <div class="bgroup">
      <a class="goback" href="/member/?status=all"><span class="icons"></span> {{ $t('back') }}</a>
    </div><!--bgroup-->
    <hr class="lg">

    <div class="order-box">
      <div class="order-row d-block d-md-flex">
        <h4>{{ $t('orderNo') }} : <span class="nowrap">{{ order.orderId }}</span> </h4>
        <h4 class="mt-1 mt-md-0 ml-auto black-50">{{ $t('status') }} :  <span class="nowrap">{{ getTextStatus(order.status) }}</span></h4>
      </div>
      <hr class="m-0">

      <template v-for="(product, index) in order.products">
        <div class="card-order" :key="index">
<!--          <a href="purchase-status-detail.html" class="card-link"></a>-->
          <div class="card-photo">
            <div class="photo" :style="{ backgroundImage: 'url(' + product.image.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + ')' }"></div>
          </div>
          <div class="card-body">
            <div class="cols info ml-0">
              <h5 class="mb-2">{{ product.name }}</h5>
              <p class="m-0 black-50">{{ product.option.name }} : {{ product.option.attribute }}</p>
            </div>
            <div class="cols price">
              <h4>฿{{ product.unitPrice - product.discount - order.couponDiscount - order.usePoint | numFormat }}</h4>
              <p class="black-50" v-if="product.discount > 0">
                {{ $t('normalPrice') }} : <span class="line-through">{{ product.unitPrice | numFormat }}</span><br>
                {{ $t('savePrice') }} : <span>{{ product.discount + order.couponDiscount + order.usePoint | numFormat }}</span></p>
            </div>
            <div class="cols qty">
              <input type="text" class="form-control qty" :value="product.quantity" disabled>
            </div>
            <div class="cols price total mr-0">
              <h4>฿{{ (product.unitPrice - product.discount) * product.quantity - order.couponDiscount - order.usePoint | numFormat }}</h4>
            </div>
          </div><!--card-body-->
        </div><!--card-order-->

        <!--Review-->
        <div v-if="order.status === 'review' && !product.review" class="order-row">
          <p class="f-14 m-0" style="color: #EB402E">
            {{ $t('reviewForGetPoint') }} <span class="nowrap" style="color:rgba(17, 17, 17, 0.5) ">({{ $t('reviewIn') }} 20/10/2021)</span>
          </p>
          <button class="btn btn-red effect xs ml-auto" @click="showModalReview(order._id, product)"><span>{{ $t('reviewProduct') }}</span></button>
        </div>
        <div v-if="order.status === 'review' && product.review" class="order-row">
          <div class="d-sm-flex f-14">
            {{ $t('reviewSuccess') }}
            <ul class="rating ml-sm-2">
              <li :class="{'active': product.review.star >= 1 }"><span></span></li>
              <li :class="{'active': product.review.star >= 2 }"><span></span></li>
              <li :class="{'active': product.review.star >= 3 }"><span></span></li>
              <li :class="{'active': product.review.star >= 4 }"><span></span></li>
              <li :class="{'active': product.review.star >= 5 }"><span></span></li>
            </ul>
          </div>
          <button class="btn btn-black effect xs ml-auto" @click="showMyReview(product)"><span>{{ $t('myReview') }}</span></button>
        </div>
      </template>

      <!--Pending-->
      <div v-if="order.status === 'pending'" class="order-row">
        <div class=" d-sm-flex f-14 m-0">
          {{ $t('waitApprove') }}
        </div>
        <div>
          <a class="btn btn-yellow effect xs ml-auto" :href="'/bank-transfer?data=' + order._id" target="_blank"><span>{{ $t("payment") }}</span></a>
          <a class="btn btn-red effect xs ml-auto"><span>{{ $t('contact') }}</span></a>
        </div>
      </div>
      <!--Pay-->
      <div v-if="order.status === 'pay'" class="order-row">
        <div class=" d-sm-flex f-14 m-0">
          {{ $t('paymentInTime') }}
          {{ order.cancelPeriod | dateThai }}
          {{ $t('beforeAddInCart') }}
        </div>
        <div>
          <a class="btn btn-black effect xs ml-auto" @click="checkPayment(order)"><span>{{ $t('payment') }}</span></a>
          <a class="btn btn-red effect xs ml-auto" @click="changeStatus('cancel', order.orderId)"><span>{{ $t('cancel') }}</span></a>
        </div>
      </div>
      <!--Delivery-->
      <div v-if="order.status === 'delivery'" class="order-row">
        <p class="f-14 m-0">{{ $t('productWillSend') }} 3 {{ $t('day') }}</p>
        <a href="/member/help-center">
          <button class="btn btn-black effect xs ml-auto"><span>{{ $t('contact') }}</span></button>
        </a>
      </div>
      <!--Receive-->
      <div v-if="order.status === 'receive'" class="order-row">
        <p class="f-14 m-0">{{ $t('willReceiveIn') }} {{ order.toGetDate | dateThai }}</p>
        <button @click="changeStatus('review', order.orderId)" class="btn btn-red effect xs ml-auto"><span>กดรับสินค้า</span></button>
      </div>
      <!--Claim-->
      <div v-if="order.status === 'claim'" class="order-row d-block d-md-flex">
        <p class="f-14 m-md-0">{{ $t('productClaim') }} {{ $t('willReceiveIn') }} 30 {{ $t('day') }} (20/08/2021 - 20/09/2021) {{ $t('productClaimTwo') }}</p>
        <a href="/member/help-center">
          <button class="btn btn-black effect xs ml-auto"><span>{{ $t('contact') }}</span></button>
        </a>
      </div>
    </div><!--buy-again-box-->

    <hr class="lg">

    <div class="order-box">
      <div class="row">
        <div class="col-xl-6">
          <div class="order-row pt-4">
            <h2 class="title-md">
              <img class="mr-3" src="/img/icons/icon-pin.svg" alt=""> {{ $t('shippingAddress') }}
            </h2>
          </div>

          <div class="box-outline mr-xl-4">
            <p>
              {{ order.shipCustName }} <br/>
              {{ order.shipCustAddress }} {{ order.shipCustCity }} {{ order.shipCustPostCode }} <br/>
              โทร. {{ order.shipCustMobileNo }}
            </p>
          </div>
        </div><!--col-xl-6-->

        <div class="col-xl-6 line-xl-left">
          <div class="order-row pt-0 pt-xl-4">
            <h2 class="title-md ml-xl-4">
              <img class="mr-3" src="/img/icons/icon-payment.svg" alt=""> {{ $t('paymentMethod') }}
            </h2>
          </div>

          <!--Credit Card-->
          <div class="box-outline ml-xl-4" v-if="order.paymentMethod === 'credit'">
            <p>{{ $t('viaCredit') }}</p>
            <div class="d-flex ml-md-auto mt-2 mt-md-0">
              <img class="h-auto mr-3" src="/img/icons/icon-visa.png" style="width: 45px" alt="">
              <img class="h-auto " src="/img/icons/icon-mastercard.png" style="width: 30px"  alt="">
            </div>
          </div>

          <!--COD-->
          <div class="box-outline ml-xl-4" v-if="order.paymentMethod === 'delivery'">
            <p>{{ $t('viaDelivery') }}</p>
          </div>

          <!--Bank Transfer-->
          <div class="box-outline ml-xl-4" v-if="order.paymentMethod === 'bank'">
            <p>{{ $t('bankTransfer') }}</p>
          </div>

          <!--Bank Transfer-->
          <div class="box-outline ml-xl-4" v-if="order.paymentMethod === 'qrcode'">
            <p>{{ $t('viaQRCode') }}</p>
            <div class="d-flex ml-md-auto mt-2 mt-md-0">
              <img class="h-auto" src="/img/icons/icon-thai-qrcode.png" alt="">
            </div>
          </div>

          <!--Installment Kbank-->
          <div class="box-outline ml-xl-4" v-if="order.paymentMethod === 'installment' && order.installmentBank === 'kbank'">
            <p>ผ่อนบัตรเครดิตธนาคารกสิกรไทย</p>
            <div class="d-flex ml-md-auto mt-2 mt-md-0 justify-content-end">
              <img width="50%" src="/img/icons/icon-kbank.png" alt="">
            </div>
          </div>

          <!--Installment Other-->
          <div class="box-outline ml-xl-4" v-if="order.paymentMethod === 'installment' && order.installmentBank === 'other'">
            <p>ผ่อนบัตรเครดิตธนาคารอื่น ๆ</p>
            <div class="d-flex ml-md-auto mt-2 mt-md-0 justify-content-end">
              <img src="/img/icons/icon-bbl.png" alt="" width="32px" height="32px">
              <img src="/img/icons/icon-scb.png" alt="" width="32px" height="32px" class="ml-2">
              <img src="/img/icons/icon-kma.png" alt="" width="32px" height="32px" class="ml-2">
            </div>
          </div>

        </div><!--col-md-6-->
      </div><!--row-->
    </div><!--order-box-->

    <div class="order-box" v-if="order.vatReceipt">
      <div class="row">

        <div class="col-xl-6">
          <div class="order-row pt-4">
            <h2 class="title-md">
              <img class="mr-3" src="/img/icons/icon-pin-tax.svg" alt="" width="16" height="19"> {{ $t('taxAddress') }}
            </h2>
          </div>

          <div class="box-outline mr-xl-4">
            <p>
              {{ order.taxCustName }} {{ order.taxCustBranchNo }} <br/>
              {{ order.taxCustTaxId }} <br/>
              {{ order.taxCustAddress }} {{ order.taxCustCity }} {{ order.taxCustPostCode }}
            </p>
          </div>
        </div><!--col-xl-6-->

        <div class="col-xl-6 line-xl-left">
          <div class="order-row pt-4">
            <h2 class="title-md">
              <img class="mr-3" src="/img/icons/icon-pin.svg" alt=""> {{ $t('TrackingNumber') }}
            </h2>
          </div>

          <div class="box-outline mr-xl-4">
            <p>
              <a :href="'https://th.kerryexpress.com/th/track/v2/?track=' + order.trackingNo" target="_blank" style="color: #007bff;">{{ order.trackingNo }}</a>
            </p>
          </div>
        </div><!--col-xl-6-->

      </div><!--row-->
    </div><!--order-box-->

    <div class="order-box" v-if="!order.vatReceipt">
      <div class="row">

        <div class="col-xl-6">
          <div class="order-row pt-4">
            <h2 class="title-md">
              <img class="mr-3" src="/img/icons/icon-pin.svg" alt=""> {{ $t('TrackingNumber') }}
            </h2>
          </div>

          <div class="box-outline mr-xl-4">
            <p>
              <a :href="'https://th.kerryexpress.com/th/track/v2/?track=' + order.trackingNo" target="_blank" style="color: #007bff;">{{ order.trackingNo }}</a>
            </p>
          </div>
        </div><!--col-xl-6-->

      </div><!--row-->
    </div><!--order-box-->

    <hr class="lg">

    <div class="order-box">
      <div class="order-row pb-2 pt-4">
        <h2 class="title-md">{{ $t('messageTitleSummary') }}</h2>
      </div>

      <div class="order-row xs">
        <p class="m-0 black-50">{{ $t('totalPriceProduct') }}</p>
        <h4 class="kanit ml-auto">฿{{ order.totalAmt | numFormat }}</h4>
      </div>
      <div class="order-row xs">
        <p class="m-0 black-50">{{ $t('shippingCost') }}</p>
        <h4 class="kanit ml-auto">฿{{ order.shippingCost ? order.shippingCost : 0}}</h4>
      </div>
      <div class="order-row xs" v-if="order.coupon && order.couponDiscount > 0">
        <p class="m-0"><span class="black-50">{{ $t('couponDiscount') }}</span>({{ order.coupon.name }})</p>
        <h4 class="kanit ml-auto">฿{{ order.couponDiscount | numFormat }}</h4>
      </div>

      <hr>

      <div class="order-row amount xs">
        <h4 class="kanit m-0 regular">{{ $t('totalPriceInclVat') }} <span>({{ $t('includeVat') }})</span></h4>
<!--        TODO: เพิ่มด้วย totalDiscount-->
<!--        <h3 class="kanit ml-auto" style="color: #D0011B">฿{{ order.totalAmt  - (order.couponDiscount + coupon.totalBundle + order.totalDiscount + order.usePoint) }}</h3>-->
        <h3 class="kanit ml-auto" style="color: #D0011B">฿{{ order.totalAmt | numFormat }}</h3>
      </div>
    </div><!--order-box-->

    <form ref="myform" method="post" action="https://t.2c2p.com/RedirectV3/payment">
      <input type="hidden" name="version" :value="payment.version"/>
      <input type="hidden" name="merchant_id" :value="payment.mid"/>
      <input type="hidden" name="currency" :value="payment.currency"/>
      <input type="hidden" name="result_url_1" :value="payment.urlOne"/>
      <input type="hidden" name="result_url_2" :value="payment.urlTwo"/>
      <input type="hidden" name="hash_value" :value="payment.hashValue"/>
      <input type="hidden" name="payment_description" :value="payment.desc"/><br/>
      <input type="hidden" name="order_id" :value="payment.orderId"/><br/>
      <input type="hidden" name="amount" :value="payment.amount"/><br/>
    </form>

    <modal-review v-if="reviewProduct !== null" />
    <modal-my-review v-if="popupMyReview"/>
  </div><!--setting-content-->
</template>

<script>
import ModalReview from "~/components/modal/ModalReview";
import ModalMyReview from "~/components/modal/ModalMyReview";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: 'member',
  name: "purchase-detail",
  components: {ModalReview, ModalMyReview},
  data () {
    return {
      payment: {},
      order: {},
      popupMyReview: false,
      reviewProduct: null,
    }
  },
  async created() {
    const order = await this.$store.dispatch('order/getOrder', this.$route.query.orderId)
    // console.log(order.data);
    if (order.data == null || order.data == undefined) {
      window.location.href = '/member?status=all'
    } else {
      console.log(order.data);
      this.order = JSON.parse(JSON.stringify(order.data))
    }

    // order.couponDiscount + coupon.totalBundle + order.totalDiscount + order.usePoint

  },
  methods: {
    async checkPayment (order) {
      if (order.paymentMethod === 'installment' && order.installmentBank === 'kbank') {
        window.location.href = '/kbank?order='+order.orderId
      } else if (order.paymentMethod === 'installment' && order.installmentBank !== 'kbank'){
        await this.paymentViaOther(order)
      } else {
        this.paymentViaBankTransfer(order)
      }
    },
    paymentViaBankTransfer (order) {
      window.location.href = `/bank-transfer?data=${order.orderId}`
    },
    async paymentViaOther (order) {
      const genToken = {
        orderId: order.orderId,
        totalAmt: order.totalAmt.toFixed(2),
        orderObjectId: order._id
      }
      const token = await this.$store.dispatch('payment/generateToken', genToken)
      this.payment = JSON.parse(JSON.stringify(token))

      setTimeout(() => {
        this.$refs.myform.submit()
      },1000);
    },
    async changeStatus (status, orderId) {
      const payload = {
        status: status,
        orderId: orderId,
        type: 'single'
      }
      const result = await this.$store.dispatch('order/changeStatus', payload)
      if (result.status) {
        const order = await this.$store.dispatch('order/getOrder', this.$route.query.orderId)
        this.order = JSON.parse(JSON.stringify(order.data))
      }
    },
    showMyReview (product) {
      this.popupMyReview = true
      this.$store.commit('review/SET_MY_REVIEW', product)
      $('#myReviewModal').appendTo("body").modal({
        backdrop: 'static',
        keyboard: true,
        show: true
      });
    },
    showModalReview (orderId, product) {
      this.reviewProduct = {
        orderId: orderId,
        product: product
      }
      this.$store.commit('review/SET_REVIEW_PRODUCT', this.reviewProduct)
      $('#reviewModal').appendTo("body").modal({
        backdrop: 'static',
        keyboard: true,
        show: true
      });
    },
    getTextStatus (status) {
      if (status === 'pay') return this.$nuxt.$t('payPurchases')
      else if (status === 'pending') return this.$nuxt.$t('pendingPurchases')
      else if (status === 'delivery') return this.$nuxt.$t('deliveryPurchases')
      else if (status === 'receive') return this.$nuxt.$t('receivePurchases')
      else if (status === 'review') return this.$nuxt.$t('reviewPurchases')
      else if (status === 'cancel') return this.$nuxt.$t('cancelPurchases')
      else return this.$nuxt.$t('claimPurchases')
    }
  }
}
</script>

<style scoped>
  .card-order .cols.info{
    width:100%;
  }
  .card-order .cols.price:not(.total){
    width:220px;
    text-align:right;
    margin-right:30px;
    max-width:100%;
  }
  .card-order .cols.price h4{
    padding-left:5px
  }
  .card-order .cols.price.total{
    width:100px;
    margin-left:0;
    flex-shrink:0;
  }

  .order-box .title-md{
      font-size:25px
  }

  @media (max-width: 1600px) {
    .order-box .title-md{
      font-size:22px
    }
  }

  @media (max-width: 1300px) {
    .card-order .cols.price.total{
      width:80px;
    }
  }

  @media (max-width: 991.98px) {
    .card-order .cols.price:not(.total){
      margin-right:20px
    }

    .order-box .title-md{
      font-size:18px;
    }
  }

  @media (max-width:767px) {
    .card-order .cols.price:not(.total){
      width:100%;
      margin-right:0;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
    .card-order .cols.info{
      max-width:100%
    }
  }

  @media (max-width:576px) {
    .card-order .cols.price h4{
      margin-left:auto;
    }

    .order-box .title-md{
      font-size:16px;
    }
  }


.title-md{font-size:25px;}
.card-order .cols.info{
  width:100%
}
.card-order .cols.price{
  width:188px;
  margin:0 0 0 auto;
  flex-shrink: 0;
}
.card-order .cols.price.total{
  width:120px;
  margin-left:0;
}

.card-order .cols.qty{
  margin:0 0 0 50px
}

@media (max-width: 1400px) {
  .card-order .cols.price.total{
    width:100px;
  }

  .card-order .cols.qty{
    margin:0 0 0 30px
  }
}

@media (min-width: 1200px) and (max-width: 1280px) {
  .card-order .cols.price.total{
    width:80px;
  }

  .card-order .cols.qty{
    margin:0 0 0 20px
  }
}

@media (min-width: 992px) and (max-width: 1024px) {
 .card-order .cols.price.total{
    width:80px;
  }

  .card-order .cols.qty{
    margin:0 0 0 20px
  }
}

@media (max-width: 767px) {
  .card-order .cols.info{
    width:100%;
    max-width:100%;
  }

  .card-order .cols.price:not(.total){
    margin-left:0;
    width:100%;
    margin-bottom:15px;
    display:flex;
  flex-direction: row-reverse;
  }

  .card-order .cols.price:not(.total) h4{

    margin:auto;
    margin-right:0;
  }

  .card-order .cols.qty{margin-left:0; }
}


</style>
