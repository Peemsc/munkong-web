<template>
  <div class="setting-content">

    <div class="bgroup">
      <a class="goback" href="/member/my-address"><span class="icons"></span> {{ $t('back') }}</a>
    </div><!--bgroup-->
    <hr class="lg">

    <ValidationObserver v-slot="{ invalid }">
      <div class="bgroup">
        <template v-if="tab === 'shipAddress'">
          <h3 class="title-md"><img class="mr-3" src="/img/icons/nav/icon-user.svg" alt=""> {{ $t('personalInfo') }}</h3>

          <div class="form-content pb-2">
            <div class="row">
              <div class="col-md-12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('fullName')" v-model="address.shipCustName">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('tel')" v-model="address.shipCustMobileNo" @keypress="isNumber($event)">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('email')" v-model="address.shipCustEmail">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div><!--row-->
          </div>
          <hr>
          <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/nav/icon-pin.svg" alt=""> {{ $t('address') }}</h3>

          <div class="form-content">
            <div class="row">
              <div class="col-md-12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('address')" v-model="address.shipCustAddress">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                <select name="province" class="custom-select kanit" @input="changeAddress($event)">
                  <option>{{ $t('province') }}</option>
                  <option
                    v-for="province in provinces"
                    :selected="province.name_th === address.shipCustCity"
                    :value="province.name_th">
                    {{ $i18n.locale === 'en' ? province.name_en : province.name_th}}
                  </option>
                </select>
              </div>

              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('postcode')" v-model="address.shipCustPostCode" @keypress="isNumber($event)">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div><!--row-->
          </div>

          <hr>
          <div class="d-flex pt-3 align-items-center">
            <h3 class="title-md">{{ $t('setDefaultAddress') }}</h3>

            <label class="switch-item xs ml-auto">
              <input type="checkbox" checked="" v-model="address.shipDefault">
              <span class="slider round"></span>
            </label>
          </div>

        </template>

        <template v-if="tab === 'shipTaxAddress'">
          <h3 class="title-md"><img class="mr-3" src="/img/icons/nav/icon-user.svg" alt=""> {{ $t('personalInfo') }}</h3>

          <div class="form-content pb-2">
            <div class="row">
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('companyName')" v-model="taxAddress.taxCustName">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('tel')" v-model="taxAddress.taxCustMobileNo" @keypress="isNumber($event)">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('taxNo')" v-model="taxAddress.taxCustTaxId" @keypress="isNumber($event)">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                  <input type="text" class="form-control kanit" :placeholder="$t('branchName')" v-model="taxAddress.taxCustBranchNo">
              </div>
            </div><!--row-->
          </div>
          <hr>
          <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/nav/icon-pin.svg" alt=""> {{ $t('taxAddress') }}</h3>

          <div class="form-content">
            <div class="row">
              <div class="col-md-12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('taxNo')" v-model="taxAddress.taxCustAddress">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="col-md-6">
                <select name="province" class="custom-select kanit" @input="changeAddress($event)">
                  <option>{{ $t('province') }}</option>
                  <option
                    v-for="province in provinces"
                    :selected="province.name_th === taxAddress.taxCustCity"
                    :value="province.name_th">
                    {{ $i18n.locale === 'en' ? province.name_en : province.name_th }}
                  </option>
                </select>
              </div>

              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control kanit" :placeholder="$t('postcode')" v-model="taxAddress.taxCustPostCode" @keypress="isNumber($event)">
                  <span class="valid-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div><!--row-->
          </div>

          <hr>
          <div class="d-flex pt-3 align-items-center">
            <h3 class="title-md">{{ $t('setDefaultAddress') }}</h3>

            <label class="switch-item xs ml-auto">
              <input type="checkbox" checked="" v-model="taxAddress.taxDefault">
              <span class="slider round"></span>
            </label>
          </div>
        </template>
      </div><!--bgroup-->
      <div class="bgroup d-flex">
        <button class="btn btn-black w-150 effect ml-auto" @click="saveData" :disabled="invalid"><span>{{ $t('save') }}</span></button>
      </div>

    </ValidationObserver>

  </div><!--setting-content-->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  layout: "member",
  data () {
    return {
      address: {
        shipCustName: this.$auth.user.custName || '',
        shipCustAddress: '',
        shipCustCity: '',
        shipCustPostCode: '',
        shipCustPhoneNo: '',
        shipCustMobileNo: this.$auth.user.custMobileNo || '',
        shipCustEmail: this.$auth.user.custEmail || '',
        shipDefault: false,
      },
      taxAddress: {
        taxCustName: this.$auth.user.custName || '',
        taxCustAddress: '',
        taxCustCity: '',
        taxCustPostCode: '',
        taxCustPhoneNo: '',
        taxCustMobileNo: this.$auth.user.custMobileNo || '',
        taxCustEmail: this.$auth.user.custEmail || '',
        taxCustTaxId: '',
        taxCustBranchNo: '',
        taxDefault: false,
      },
      tab: 'shipAddress'
    }
  },
  created () {
    this.$store.dispatch('address/fetchProvince')
    this.tab = this.$route.query.tab
    if(this.$route.query.type === 'update' && this.tab === 'shipAddress') {
      this.address = JSON.parse(JSON.stringify(this.$auth.user.shipAddress[this.$route.query.index]))
    }
    if(this.$route.query.type === 'update' && this.tab === 'shipTaxAddress') {
      this.taxAddress = JSON.parse(JSON.stringify(this.$auth.user.shipTaxAddress[this.$route.query.index]))
    }
  },
  methods: {
    isNumber (event) {
      const keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        event.preventDefault()
      }
    },
    changeAddress (event) {
      if(event.target.name === "province" && this.tab === 'shipAddress') {
        this.address.shipCustCity = event.target.value
      }
      if(event.target.name === "province" && this.tab === 'shipTaxAddress') {
        this.taxAddress.taxCustCity = event.target.value
      }
    },
    async saveData () {
      if (this.tab === 'shipAddress') {
        await this.saveShipAddress()
      } else {
        await this.saveShipTaxAddress()
      }
    },
    async saveShipAddress () {
      let shipAddress = JSON.parse(JSON.stringify(this.$auth.user.shipAddress))
      if (this.address.shipDefault) {
        shipAddress.forEach(item => {
          item.shipDefault = false
        })
      }

      if(this.$route.query.type === 'update') {
        shipAddress[this.$route.query.index] = this.address
      } else {
        shipAddress.push(this.address)
      }

      const userData = JSON.parse(JSON.stringify(this.$auth.user))
      userData.shipAddress = shipAddress.sort((a,b) => b.shipDefault - a.shipDefault)


      const result = await this.$store.dispatch('customer/updateProfile', userData)
      if (result.status) {
        window.location.href = '/member/my-address'
      }
    },
    async saveShipTaxAddress () {
      let shipTaxAddress = JSON.parse(JSON.stringify(this.$auth.user.shipTaxAddress))
      if (this.taxAddress.taxDefault) {
        shipTaxAddress.forEach(item => {
          item.taxDefault = false
        })
      }

      if(this.$route.query.type === 'update') {
        shipTaxAddress[this.$route.query.index] = this.taxAddress
      } else {
        shipTaxAddress.push(this.taxAddress)
      }

      const userData = JSON.parse(JSON.stringify(this.$auth.user))
      userData.shipTaxAddress = shipTaxAddress.sort((a,b) => b.taxDefault - a.taxDefault)

      const result = await this.$store.dispatch('customer/updateProfile', userData)
      if (result.status) {
        window.location.href = '/member/my-address'
      }
    }
  },
  computed: {
    provinces () {
      return this.$store.state.address.province
    },
  }
}
</script>

<style scoped>

</style>
