<template>
  <div >
      <form action="https://a674-184-22-94-200.ngrok.io/api/payment/gen-token-kbank" method="POST" ref="kbankform">
        <script
                data-apikey="pkey_test_21252SopN4DgJzxQ9LsvQUzGGSh4dNE3uk8Gj"
                data-payment-methods="card"
                data-mid="401049990003001"
                data-plan-id="999"
                data-ipan-mode="01"
                data-product-type="87"
                data-supplier-no="99903"
                data-model-no="999901"
                data-term="3"
                data-name="Munkong test"
                data-currency="THB"
                data-show-button="false" >
        </script>
        <input type="button" onclick="KPayment.show()" value="Pay Now" ref="showKbank"/>
      </form>
     <br>
      Now Amount : {{ getAmount }}
    <br>
      <button @click="setPrice">New Amount</button>
<!--      <button @click="kbank">Kbank</button>-->
  </div>

</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  layout: "blank",
  data () {
    return {
      payment: {
        amount: "1234.10"
      }
    }
  },
  head () {
    return {
      script: [
        {
          src: "https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js",
          'data.amount': this.getAmount
        }
      ],
    }
  },
  mounted() {
    // $('#input-tag').attr('data-amount', '3333.33');
    // this.$refs.kbank.setAttribute('data-name', '3333.33')
  },
  methods: {
    setPrice () {
      this.$store.commit('payment/SET_PAYMENT_PRICE', '12242.22')
    },
    kbank () {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js';
      scriptTag.setAttribute('data-apikey', 'pkey_test_21252SopN4DgJzxQ9LsvQUzGGSh4dNE3uk8Gj');
      scriptTag.setAttribute('data-amount', this.payment.amount);
      scriptTag.setAttribute('data-payment-methods', 'card');
      scriptTag.setAttribute('data-mid', '401049990003001');
      scriptTag.setAttribute('data-plan-id', '999');
      scriptTag.setAttribute('data-ipan-mode', '01');
      scriptTag.setAttribute('data-product-type', '003');
      scriptTag.setAttribute('data-supplier-no', '99903');
      scriptTag.setAttribute('data-model-no', '999901');
      scriptTag.setAttribute('data-term', '3');
      scriptTag.setAttribute('data-name', 'Munkong test');
      scriptTag.setAttribute('data-currency', 'THB');

      this.$refs.kbankform.appendChild(scriptTag)
      // const refKbank = this.$refs.kbank
      // refKbank.src = 'https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js'
    },
    closeKBANK () {
      console.log('close popup')
    }
  },
  computed: {
    getAmount () {
      return this.$store.state.payment.amount
    }
  }
}
</script>

<style scoped>

</style>
