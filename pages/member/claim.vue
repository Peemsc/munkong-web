<template>
  <div class="setting-content">
    <ValidationObserver v-slot="{ invalid }">
      <div class="bgroup">
        <h3 class="title-lg mt-2">{{ $t('notifyClaim') }}</h3>
      </div><!--bgroup-->
      <hr class="lg">
      <div class="bgroup">
        <h3 class="title-md"><img class="mr-3" src="/img/icons/nav/icon-warranty.svg" alt=""> {{ $t('claimStatus') }} </h3>
            <div class="form-content" v-for="(items,index) in claims" :key="index">
          <div class="row ">
            <div class="col-6 ">
              <h6>{{ $t('orderNo') }} : {{ items.purchaseId }}</h6>
            </div>
            <div class="col-6" v-if="items.status">
              <h6 v-if="items.status == 'waiting' " >{{ $t('status') }} : {{ $t('claimStatusWaiting') }}</h6>
              <h6 v-if="items.status == 'opened' " >{{ $t('status') }} : {{ $t('claimStatusOpen') }}</h6>
              <h6 v-if="items.status == 'closed' " >{{ $t('status') }} : {{ $t('claimStatusClose') }}</h6>
            </div>

          </div><!--row-->
          <hr class="text-black">
        </div> <!--form-content-->
        <!-- <hr> -->
        <h3 class="title-md"><img class="mr-3" src="/img/icons/icon-doc.svg" alt=""> {{ $t('formClaim') }} ({{
          $t('atLeastOneField') }})</h3>

        <div class="form-content">
          <div class="row">
            <div class="col-md-12">
              <input type="text" class="form-control kanit" :placeholder="$t('claimDetail')" v-model="claim.detail">
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control kanit" :placeholder="$t('orderNo')" v-model="claim.purchaseId">
              <!--              <ValidationProvider rules="required" v-slot="{ errors }">-->
              <!--                <span class="valid-message">{{ errors[0] }}</span>-->
              <!--              </ValidationProvider>-->
            </div>

            <div class="col-md-6">
              <input type="text" class="form-control kanit" :placeholder="$t('receiveNo')" v-model="claim.receiptId">
              <!--              <ValidationProvider rules="required" v-slot="{ errors }">-->
              <!--                <span class="valid-message">{{ errors[0] }}</span>-->
              <!--              </ValidationProvider>-->
            </div>

            <div class="col-md-6">
              <input type="text" class="form-control kanit" :placeholder="$t('serialNumber')" v-model="claim.serialNum">
              <!--              <ValidationProvider rules="required" v-slot="{ errors }">-->
              <!--                <span class="valid-message">{{ errors[0] }}</span>-->
              <!--              </ValidationProvider>-->
            </div>

          </div><!--row-->
        </div> <!--form-content-->

        <hr>

        <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/nav/icon-user.svg" alt=""> {{ $t('personalInfo') }}
        </h3>

        <div class="form-content">
          <div class="row">

            <div class="col-md-6">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input type="text" class="form-control kanit" :placeholder="$t('fullName')" v-model="claim.shipCustName">
                <span class="valid-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>


            <div class="col-md-6">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input type="text" class="form-control kanit" :placeholder="$t('tel')" v-model="claim.shipCustMobileNo">
                <span class="valid-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-md-6">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input type="text" class="form-control kanit" :placeholder="$t('email')" v-model="claim.shipCustEmail">
                <span class="valid-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

          </div><!--row-->
        </div> <!--form-content-->

        <hr>

        <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/nav/icon-pin.svg" alt="">
          <p>{{ $t('address') }}</p>
        </h3>

        <div class="form-content">
          <div class="row">
            <div class="col-md-12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input type="text" class="form-control kanit" :placeholder="$t('address')"
                  v-model="claim.shipCustAddress">
                <span class="valid-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-md-6">
              <select name="province" class="custom-select kanit" @input="changeAddress($event)">
                <option>{{ $t('province') }}</option>
                <option v-for="province in provinces" :selected="province.name_th === claim.shipCustCity"
                  :value="province.name_th">
                  {{ province.name_th }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input type="text" class="form-control kanit" :placeholder="$t('postcode')"
                  v-model="claim.shipCustPostCode">
                <span class="valid-message">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div><!--row-->
        </div> <!--form-content-->

        <hr>

        <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/icon-photo.svg" alt=""> {{ $t('attachmentImage') }}
        </h3>

        <ul class="nav nav-upload">
          <li class="done" v-for="(image, index) in images" :key="index">
            <div class="photo" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
            <span class="icons" @click="deleteImage(index)"></span>
          </li>

          <li>
            <div class="photo" @click="$refs.selectedImage.click()"></div>
            <span class="icons"></span>
            <input type="file" class="d-none" ref="selectedImage" @change="inputImage" />
          </li>
        </ul>

        <hr>

      </div><!--bgroup-->

      <div class="bgroup ">

        <!--      <div class="recaptcha d-flex justify-content-center">-->
        <!--        <img class="img-fluid" src="/img/thumb/recaptcha.png" alt="">-->
        <!--      </div>-->
        <div class="d-flex mt-md-5 mt-4">
          <button class="btn btn-black w-180 effect m-auto lg" type="button" @click="submitData"><span>{{ $t('submitForm')
          }}</span></button>
        </div>
      </div>
    </ValidationObserver>
    <ModalSuccess :message="$t('sendDataSuccess')" />
    <ModalFail :message="$t('claimDataFail')" />
  </div><!--setting-content-->
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import ModalSuccess from "@/components/modal/ModelSuccess";
import ModalFail from "@/components/modal/ModelFail";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {
    ModalSuccess,
    ModalFail,
    ValidationProvider,
    ValidationObserver,
  },
  layout: "member",
  data() {
    return {
      claim: {
        custId: this.$auth.user._id,
        purchaseId: '',
        receiptId: '',
        serialNum: '',
        shipCustName: '',
        shipCustMobileNo: '',
        shipCustEmail: '',
        shipCustAddress: '',
        shipCustCity: '',
        shipCustPostCode: '',
        listImage: []
      },
      images: [],
      files: []
    }
  },
  async fetch() {
    await this.$store.dispatch('claim/fetchClaim', this.$auth.user._id)
  },
  created() {
    this.$store.dispatch('address/fetchProvince')
    const userDetail = JSON.parse(JSON.stringify(this.$auth.user))
    if (userDetail.shipAddress.length > 0) {
      this.claim.shipCustName = userDetail.shipAddress[0].shipCustName
      this.claim.shipCustMobileNo = userDetail.shipAddress[0].shipCustMobileNo
      this.claim.shipCustEmail = userDetail.shipAddress[0].shipCustEmail
      this.claim.shipCustAddress = userDetail.shipAddress[0].shipCustAddress
      this.claim.shipCustCity = userDetail.shipAddress[0].shipCustCity
      this.claim.shipCustPostCode = userDetail.shipAddress[0].shipCustPostCode
    }
  },
  methods: {
    deleteImage(index) {
      this.images.splice(index, 1)
      this.files.splice(index, 1)
    },
    inputImage(e) {
      const file = e.target.files[0]
      this.images.push(URL.createObjectURL(file))
      this.files.push(file)
    },
    changeAddress(event) {
      this.claim.shipCustCity = event.target.value
    },
    async submitData() {
      if (this.files.length !== 0) {
        for (let i = 0; i < this.files.length; i++) {
          const formData = new FormData()
          formData.append('file', this.files[i], this.files[i].name)
          const image = await this.$store.dispatch('upload_file/uploadFile', formData)
          this.claim.listImage.push(image.url)
        }
      }

      try {
        if(this.claim.shipCustName == '' || this.claim.shipCustEmail == '' || this.claim.shipCustMobileNo == ''){
          $('#failModal').appendTo("body").modal('show');
        }else{
          const result = await this.$store.dispatch('claim/createClaim', this.claim)
          if (result.status) {
            $('#successModal').appendTo("body").modal('show');
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }
        }

      } catch (e) {
        console.log(e)
      }

    }
  },
  computed: {
    claims() {
      return this.$store.state.claim.claims
    },
    provinces() {
      return this.$store.state.address.province
    },
  }
}
</script>

<style scoped></style>
