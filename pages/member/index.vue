<template>
  <div class="setting-content">
    <div class="bgroup">
      <ul class="nav nav-button">
        <li :class="{ active: isActive('all') }">
          <a href="/member/?status=all">{{
            $t("allPurchases")
          }}</a>
        </li>
        <li :class="{ active: isActive('pending') }" class="position-relative">
          <a href="/member/?status=pending">{{ $t('pendingPurchases') }}
            <span v-if="countPending != 0" class="badge">
              <p class="text-center" style="margin: 2.2px;">{{ countPending < 99 ? countPending : '99+' }}</p>
            </span>
          </a>
        </li>
        <li :class="{ active: isActive('pay') }">
          <a href="/member/?status=pay">{{ $t("payPurchases") }}
            <span v-if="countPay != 0" class="badge">
              <p class="text-center" style="margin: 2.2px;">{{ countPay < 99 ? countPay : '99+' }}</p>
            </span>
          </a>
        </li>
        <li :class="{ active: isActive('delivery') }">
          <a href="/member/?status=delivery">{{ $t("deliveryPurchases") }}
            <span v-if="countDelivery != 0" class="badge">
              <p class="text-center" style="margin: 2.2px;">{{ countDelivery < 99 ? countDelivery : '99+' }}</p>
            </span>
          </a>
        </li>
        <li :class="{ active: isActive('receive') }">
          <a href="/member/?status=receive">{{ $t("receivePurchases") }}
            <span v-if="countReceive != 0" class="badge">
              <p class="text-center" style="margin: 2.2px;">{{ countReceive < 99 ? countReceive : '99+' }}</p>
            </span>
          </a>
        </li>
        <li :class="{ active: isActive('review') }">
          <a href="/member/?status=review">{{ $t("myReview") }}
            <span v-if="countReview != 0" class="badge">
              <p class="text-center" style="margin: 2.2px;">{{ countReview < 99 ? countReview : '99+' }}</p>
            </span>
          </a>
        </li>
        <li :class="{ active: isActive('claim') }">
          <a href="/member/?status=claim">{{ $t("claimPurchases") }}
            <span v-if="countClaim != 0" class="badge">
              <p class="text-center" style="margin: 2.2px;">{{ countClaim < 99 ? countClaim : '99+' }}</p>
            </span>
          </a>
        </li>
      </ul>
    </div>
    <!--bgroup-->
    <template v-for="(order, index) in orderList">
      <hr class="lg" :key="index" />

      <div class="order-box">
        <div class="order-row d-block d-md-flex">
          <h4>
            {{ $t("orderNo") }} :
            <span class="nowrap">{{ order.orderId }}</span>
          </h4>
          <h4 class="mt-1 mt-md-0 ml-auto black-50">
            {{ $t("status") }} :
            <span class="nowrap">{{ getTextStatus(order.status) }}</span>
          </h4>
        </div>
        <hr class="m-0" />

        <template v-for="(product, index) in order.products">
          <div class="card-order" :key="index">
            <a :href="`/member/purchase-detail?orderId=${order.orderId}`" class="card-link"></a>
            <div class="card-photo">
              <div class="photo" v-if="product.image != undefined" :style="{ backgroundImage: 'url(' + product.image.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + '?tr=w-300)' }"></div>
              <div class="photo" v-else :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>
            </div>
            <div class="card-body">
              <div class="cols info ml-0">
                <h5 class="mb-2">{{ product.name }}</h5>
                <p class="m-0 black-50">
                  {{ product.option.name }} : {{ product.option.attribute }}
                </p>
              </div>
              <div class="cols price">
                <h4>
                  ฿{{ (product.unitPrice - product.discount - order.couponDiscount - order.usePoint) | numFormat }}
                </h4>
                <p class="black-50" v-if="product.discount > 0 || order.couponDiscount > 0">
                  {{ $t("normalPrice") }} :
                  <span class="line-through">{{
                    product.unitPrice | numFormat
                  }}</span><br />
                  {{ $t("savePrice") }} :
                  <span>{{
                    product.discount + order.couponDiscount + order.usePoint | numFormat
                  }}</span>
                </p>
              </div>
              <div class="cols qty">
                <input type="text" class="form-control qty" :value="product.quantity" disabled />
              </div>
              <div class="cols price total mr-0">
                <h4>
                  ฿{{
                    ((product.unitPrice - product.discount) * product.quantity) - order.couponDiscount - order.usePoint | numFormat
                  }}
                </h4>
              </div>
            </div>
            <!--card-body-->
          </div>
          <!--card-buy-again-->

          <!--Review-->
          <div v-if="order.status === 'review' && !product.review" class="order-row">
            <p class="f-14 m-0" style="color: #eb402e">
              {{ $t("reviewForGetPoint") }}
              <span class="nowrap" style="color: rgba(17, 17, 17, 0.5)">({{ $t("reviewIn") }} 20/10/2023)</span>
            </p>
            <button class="btn btn-red effect xs ml-auto" @click="showModalReview(order._id, product)">
              <span>{{ $t("reviewProduct") }}</span>
            </button>
          </div>
          <div v-if="order.status === 'review' && product.review" class="order-row">
            <div class="d-sm-flex f-14">
              {{ $t("reviewSuccess") }}
              <ul class="rating ml-sm-2">
                <li :class="{ active: product.review.star >= 1 }">
                  <span></span>
                </li>
                <li :class="{ active: product.review.star >= 2 }">
                  <span></span>
                </li>
                <li :class="{ active: product.review.star >= 3 }">
                  <span></span>
                </li>
                <li :class="{ active: product.review.star >= 4 }">
                  <span></span>
                </li>
                <li :class="{ active: product.review.star >= 5 }">
                  <span></span>
                </li>
              </ul>
            </div>
            <button class="btn btn-black effect xs ml-auto" @click="showMyReview(product)">
              <span>{{ $t("myReview") }}</span>
            </button>
          </div>
        </template>

        <!--Pending-->
        <div v-if="order.status === 'pending'" class="order-row">
          <div class="d-sm-flex f-14 m-0">
            {{ $t("waitApprove") }}
          </div>
          <div>
            <a class="btn btn-yellow effect xs ml-auto" :href="'/bank-transfer?data=' + order._id" target="_blank"><span>{{ $t("payment") }}</span></a>
            <a class="btn btn-red effect xs ml-auto" href="/contact"><span>{{ $t("contact") }}</span></a>
          </div>
        </div>
        <!--Pay-->
        <div v-if="order.status === 'pay'" class="order-row">
          <div class="d-sm-flex f-14 m-0">
            {{ $t("paymentInTime") }}
            {{ order.cancelPeriod | dateThai }}
            {{ $t("beforeAddInCart") }}
          </div>
          <a class="btn btn-red effect xs ml-auto" @click="checkPayment(order)"><span>{{ $t("payment") }}</span></a>
        </div>
        <!--Delivery-->
        <div v-if="order.status === 'delivery'" class="order-row">
          <p class="f-14 m-0">{{ $t("productWillSend") }} 3 {{ $t("day") }}</p>
          <a href="/member/help-center">
            <button class="btn btn-black effect xs ml-auto">
              <span>{{ $t("contact") }}</span>
            </button>
          </a>
        </div>
        <!--Receive-->
        <div v-if="order.status === 'receive'" class="order-row">
          <p class="f-14 m-0">
            <!-- {{ $t("willReceiveIn") }} {{ order.toGetDate | dateThai }} -->
          </p>
          <button @click="changeStatus('review', order.orderId)" class="btn btn-red effect xs ml-auto">
            <span>กดรับสินค้า</span>
          </button>
        </div>
        <!--Claim-->
        <div v-if="order.status === 'claim'" class="order-row d-block d-md-flex">
          <p class="f-14 m-md-0">
            {{ $t("productClaim") }} {{ $t("willReceiveIn") }} 30
            {{ $t("day") }} (20/08/2021 - 20/09/2021)
            {{ $t("productClaimTwo") }}
          </p>
          <a href="/member/help-center">
            <button class="btn btn-black effect xs ml-auto">
              <span>{{ $t("contact") }}</span>
            </button>
          </a>
        </div>
      </div>
      <!--buy-again-box-->
    </template>

    <form ref="myform" method="post" action="https://t.2c2p.com/RedirectV3/payment">
      <input type="hidden" name="version" :value="payment.version" />
      <input type="hidden" name="merchant_id" :value="payment.mid" />
      <input type="hidden" name="currency" :value="payment.currency" />
      <input type="hidden" name="result_url_1" :value="payment.urlOne" />
      <input type="hidden" name="result_url_2" :value="payment.urlTwo" />
      <input type="hidden" name="hash_value" :value="payment.hashValue" />
      <input type="hidden" name="payment_description" :value="payment.desc" /><br />
      <input type="hidden" name="order_id" :value="payment.orderId" /><br />
      <input type="hidden" name="amount" :value="payment.amount" /><br />
    </form>

    <modal-review />

    <modal-my-review v-if="popupMyReview" />
  </div>
  <!--setting-content-->
</template>

<script>
import ModalReview from "@/components/modal/ModalReview";
import ModalMyReview from "~/components/modal/ModalMyReview";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: { ModalReview, ModalMyReview },
  layout: "member",
  data() {
    return {
      popupMyReview: false,
      reviewProduct: null,
      payment: {},
      tempOrder: "",
    };
  },
  computed: {
    status() {
      return this.$route.query.status;
    },
    orderList() {
      return this.$store.getters["order/filterOrder"](this.status);
    },
    countPay() {
      return this.$store.getters["order/filterOrder"]("pay").length;
    },
    countDelivery() {
      return this.$store.getters["order/filterOrder"]("delivery").length;
    },
    countReceive() {
      return this.$store.getters["order/filterOrder"]("receive").length;
    },
    countClaim() {
      return this.$store.getters["order/filterOrder"]("claim").length;
    },
    countReview() {
      return this.$store.getters["order/filterOrder"]("review").length;
    },
    countPending() {
      return this.$store.getters["order/filterOrder"]("pending").length;
    },
  },
  async fetch() {
    await this.$store.dispatch("order/fetchOrder", this.$auth.user.custId);
  },
  methods: {
    async checkPayment(order) {
      if (
        (order.paymentMethod === "installment" &&
          order.installmentBank === "kbank") ||
        order.paymentMethod === "credit"
      ) {
        window.location.href = "/kbank?order=" + order.orderId;
      } else if (
        order.paymentMethod === "installment" &&
        order.installmentBank !== "kbank"
      ) {
        await this.paymentViaOther(order);
      } else {
        this.paymentViaBankTransfer(order);
      }
    },
    paymentViaBankTransfer(order) {
      window.location.href = `/bank-transfer?data=${order.orderId}`;
    },
    async paymentViaOther(order) {
      const genToken = {
        orderId: order.orderId,
        totalAmt: order.totalAmt.toFixed(2),
        orderObjectId: order._id,
        paymentOption: "IPP",
      };
      const token = await this.$store.dispatch(
        "payment/generateToken",
        genToken
      );
      this.payment = JSON.parse(JSON.stringify(token));

      setTimeout(() => {
        this.$refs.myform.submit();
      }, 1000);
    },
    async changeStatus(status, orderId) {
      const payload = {
        status: status,
        orderId: orderId,
      };

      const result = await this.$store.dispatch("order/changeStatus", payload);
      if (result.status) {

        window.location.href = `/member/?status=${status}`;
        // await this.$router.push(`/member/?status=${status}`);
      }
    },
    isActive(status) {
      return (
        this.$route.query.status === status ||
        (this.$route.fullPath === "/member/" && status === "all")
      );
    },
    getTextStatus(status) {
      if (status === "pay") return this.$nuxt.$t("payPurchases");
      else if (status === "delivery") return this.$nuxt.$t("deliveryPurchases");
      else if (status === "pending") return this.$nuxt.$t("pendingPurchases");
      else if (status === "receive") return this.$nuxt.$t("receivePurchases");
      else if (status === "review") return this.$nuxt.$t("reviewPurchases");
      else if (status === "cancel") return this.$nuxt.$t("cancelPurchases");
      else return this.$nuxt.$t("claimPurchases");
    },
    showMyReview(product) {
      this.popupMyReview = true;
      this.$store.commit("review/SET_MY_REVIEW", product);
      $("#myReviewModal").appendTo("body").modal({
        backdrop: "static",
        keyboard: true,
        show: true,
      });
    },
    showModalReview(orderId, product) {
      this.reviewProduct = {
        orderId: orderId,
        product: product,
      };
      this.$store.commit("review/SET_REVIEW_PRODUCT", this.reviewProduct);
      setInterval(() => {
        $("#reviewModal").appendTo("body").modal({
          backdrop: "static",
          keyboard: true,
          show: true,
        });
      }, 500);

    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}

@media (min-width: 768px) {
  .card-order .cols.price:not(.total){width:50px;}
  .card-order .cols.price.total{width:100px;}
  .card-order .cols.qty{width:45px;}
  .card-order .cols.info{ width:100%}
}


</style>
