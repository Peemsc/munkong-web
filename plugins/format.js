import Vue from 'vue'
Vue.mixin({
  methods:{
    numWihOutFloat (number) {
      const formatter = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      const num = formatter.format(number).replaceAll('฿', '')
      return parseInt(num)
    },
    numWithFloat (number) {
      const formatter = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB'
      })

      const num = formatter.format(number).replaceAll('฿', '')
      return parseInt(num)
    }
  }
})
