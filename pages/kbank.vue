<template>
  <div>
    <form
      :action="`${apiURL}/api/payment/gen-token-kbank?orderId=${order}&type=${type}`"
      method="POST"
      v-if="type === 'installment'"
    >
      <script
        type="text/javascript"
        ref="kbank"
        src="https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"
        data-apikey="pkey_prod_2808Q6lfsP4FAOSWpzFVuQv794HkDb3v3n23"
        data-payment-methods="card"
        :data-amount="amount"
        data-mid="401049016975001"
        data-smartpay-id="0001"
        :data-term="term"
        data-name="Munkonggadget"
        data-currency="THB"
        data-show-button="false"
      ></script>
      <!--      <script type="text/javascript" ref="kbank"-->
      <!--              src="https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"-->
      <!--              data-apikey="pkey_prod_2808Q6lfsP4FAOSWpzFVuQv794HkDb3v3n23"-->
      <!--              data-payment-methods="card"-->
      <!--              :data-amount="amount"-->
      <!--              data-mid="401049016975001"-->
      <!--              data-smartpay-id="0001"-->
      <!--              :data-term="term"-->
      <!--              data-name="Munkonggadget"-->
      <!--              data-currency="THB"-->
      <!--              data-show-button="false" >-->
      <!--      </script>-->
      <!--      <script type="text/javascript" ref="kbank"-->
      <!--              src="https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"-->
      <!--              data-apikey="pkey_prod_2808Q6lfsP4FAOSWpzFVuQv794HkDb3v3n23"-->
      <!--              data-payment-methods="card"-->
      <!--              :data-amount="amount"-->
      <!--              data-mid="401049016975001"-->
      <!--              data-plan-id="999"-->
      <!--              data-ipan-mode="01"-->
      <!--              data-product-type="140"-->
      <!--              :data-term="term"-->
      <!--              data-supplier-no="99903"-->
      <!--              data-model-no="999901"-->
      <!--              data-name="Munkonggadget"-->
      <!--              data-currency="THB"-->
      <!--              data-show-button="false" >-->
      <!--      </script>-->
    </form>

    <form
      :action="`${apiURL}/api/payment/gen-token-kbank?orderId=${order}&type=${type}`"
      method="POST"
      v-if="type === 'credit'"
    >
      <script
        type="text/javascript"
        ref="kbank"
        src="https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"
        data-apikey="pkey_prod_2808Q6lfsP4FAOSWpzFVuQv794HkDb3v3n23"
        data-payment-methods="card"
        :data-amount="amount"
        data-mid="401012086452001"
        data-name="Munkonggadget"
        data-currency="THB"
        data-show-button="false"
      ></script>
    </form>
  </div>
</template>

<script>
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "blank",
  data() {
    return {
      amount: null,
      order: null,
      type: null,
      term: null,
      apiURL: process.env.apiURL,
    };
  },
  async fetch() {
    const result = await this.$store.dispatch(
      "order/getOrder",
      this.$route.query.order
    );
    if (
      result.data.paymentStatus !== "success" &&
      result.data.status === "pay"
    ) {
      this.amount = result.data.totalAmt.toFixed(2);
      this.order = result.data.orderId;
      this.type = result.data.paymentMethod;
      this.term = result.data.installmentTerm;
    }
  },
  async mounted() {
    if (this.amount) {
      this.pay();

      setTimeout(() => {
        const popupKbank = document.getElementsByClassName(
          "payment-container show"
        );
        if (popupKbank.length === 0) {
          window.location.reload();
        }
      }, 3000);

      // setTimeout(() => {

      // }, 3000);
    }
  },
  methods: {
    pay() {
      setTimeout(() => {
        KPayment.show();
      }, 1000);
    },
  },
  computed: {
    getAmount() {
      return this.$store.state.payment.amount;
    },
  },
};
</script>

<style scoped></style>
