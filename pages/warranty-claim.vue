<template>
  <div class="page" style="background-color: #f5f5f5;">

    <div class="section-blog">
      <div class="container">
        <div class="container-inner">
          <div class="blog-content">
            <div class="blog-row align-items-center">
              <ul class="nav nav-blog">
                <li><a href="/">Home</a></li>
                <li class="active"><a href="#">{{ $t('warrantyClaim') }}</a></li>
              </ul>

              <!-- <div class="icons-group ml-auto">
                <button class="btn btn-share" type="button"></button>
                <button class="btn btn-like" type="button"></button>
              </div> -->

              <div class="icons-group d-flex ml-auto">
                <div class="dropdown share">
                  <button
                    class="btn btn-share"
                    data-toggle="dropdown"
                    data-display="static"
                    type="button"
                  ></button>

                  <div class="dropdown-menu">
                    <div class="d-flex">
                      <p>{{ $t('share')}} :</p>
                      <div class="share-lists">
                        <a href="#" class="icons icon-facebook" @click="shareFacebook"></a>
                        <a href="#" class="icons icon-twitter" @click="shareTwitter"></a>
                        <a href="#" class="icons icon-line" @click="shareLine"></a>
                        <a href="#" class="icons icon-link" @click="copyToClipboard"></a>
                      </div>
                    </div>
                    <!-- <a href="#" class="icons icon-copy"></a> -->
                  </div>
                </div>
              </div>

            </div>

            <hr class="my-1">

            <div class="blog-row my-2">
              <h5>{{ $t('warrantyClaim') }}</h5>
            </div>

            <div class="blog-details text-center px-0 pb-0">

              <div class="filter-row d-flex pb-0">
                <ul class="nav nav-filter mx-auto">
<!--                  <li><span class="active" data-toggle="tab">{{ $t('all') }}</span></li>-->
<!--                  <li><span data-toggle="tab">{{ $t('claim') }}</span></li>-->
<!--                  <li><span data-toggle="tab">{{ $t('warranty') }}</span></li>-->
                </ul>
              </div>

              <div class="bgroup warranty-status">
                <h2>{{ $t('warrantyOne') }} <br class="d-none d-md-block">{{ $t('warrantyTwo') }}</h2>

                <p class="f-20 mt-4">{{ $t('warrantyThree') }}</p>

                <div class="form-group mb-0 mt-md-5 mt-4">
                  <input type="text" class="form-control text-center" :placeholder="$t('serialNumber')" v-model="serial">
                </div>
              </div><!--bgroup-->

              <div class="bgroup d-flex">
                <button class="btn btn-black effect lg w-180 m-auto" type="button" @click="checkWarranty"><span>{{ $t('submit') }}</span></button>
              </div>

              <div class="d-block py-4">
                <hr class="my-5">
              </div>
              <div class="details wow fadeIn">
                <h2 class="text-center">{{ $t('warranty') }}</h2>
              </div>
            </div><!--blog-details-->

            <div class="setting-content w-100 pt-0">
              <ValidationObserver v-slot="{ invalid }">
                <div class="bgroup">
                  <h3 class="title-lg mt-2">{{ $t('notifyClaim') }}</h3>
                </div><!--bgroup-->
                <hr class="lg">

                <div class="bgroup">

                  <h3 class="title-md"><img class="mr-3" src="/img/icons/icon-doc.svg" alt=""> {{ $t('formClaim') }} ({{ $t('atLeastOneField') }})</h3>

                  <div class="form-content">
                    <div class="row">
                    <div class="col-md-12">
                      <input type="text" class="form-control kanit" :placeholder="$t('claimDetail')" v-model="claim.detail">
                    </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control kanit" :placeholder="$t('orderNo') " v-model="claim.purchaseId">
<!--                        <ValidationProvider rules="required" v-slot="{ errors }">-->
<!--                          <span class="valid-message">{{ errors[0] }}</span>-->
<!--                        </ValidationProvider>-->
                      </div>

                      <div class="col-md-6">
                        <input type="text" class="form-control kanit" :placeholder="$t('receiveNo')" v-model="claim.receiptId">
<!--                        <ValidationProvider rules="required" v-slot="{ errors }">-->
<!--                          <span class="valid-message">{{ errors[0] }}</span>-->
<!--                        </ValidationProvider>-->
                      </div>

                      <div class="col-md-6">
                        <input type="text" class="form-control kanit" :placeholder="$t('serialNumber')" v-model="claim.serialNum">
<!--                        <ValidationProvider rules="required" v-slot="{ errors }">-->
<!--                          <span class="valid-message">{{ errors[0] }}</span>-->
<!--                        </ValidationProvider>-->
                      </div>

                    </div><!--row-->
                  </div> <!--form-content-->

                  <hr>

                  <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/nav/icon-user.svg" alt=""> {{ $t('personalInfo') }}</h3>

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
                          <input type="text" class="form-control kanit" :placeholder="$t('tel')" v-model="claim.shipCustMobileNo" maxlength="10" @keypress="isNumber($event)">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
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
                          <input type="text" class="form-control kanit" :placeholder="$t('address')" v-model="claim.shipCustAddress">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <select name="province" class="custom-select kanit" @input="changeAddress($event)">
                          <option>{{ $t('province') }}</option>
                          <option
                            v-for="province in provinces"
                            :selected="province.name_th === claim.shipCustCity"
                            :value="province.name_th">
                            {{ province.name_th }}
                          </option>
                        </select>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input type="text" class="form-control kanit" :placeholder="$t('postcode')" v-model="claim.shipCustPostCode" maxlength="5" @keypress="isNumber($event)">
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div><!--row-->
                  </div> <!--form-content-->

                  <hr>

                  <h3 class="title-md pt-3"><img class="mr-3" src="/img/icons/icon-photo.svg" alt=""> {{ $t('attachmentImage') }}</h3>

                  <ul class="nav nav-upload">
                    <li class="done" v-for="(image, index) in images" :key="index">
                      <div class="photo" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
                      <span class="icons" @click="deleteImage(index)"></span>
                    </li>

                    <li>
                      <div class="photo" @click="$refs.selectedImage.click()"></div>
                      <span class="icons"></span>
                      <input type="file" class="d-none" ref="selectedImage" @change="inputImage"/>
                    </li>
                  </ul>

                  <hr>

                </div><!--bgroup-->

                <div class="bgroup ">

                  <!--      <div class="recaptcha d-flex justify-content-center">-->
                  <!--        <img class="img-fluid" src="/img/thumb/recaptcha.png" alt="">-->
                  <!--      </div>-->
                  <div class="d-flex mt-md-5 mt-4">
                    <button class="btn btn-black w-180 effect m-auto lg" type="button" @click="submitData" :disabled="invalid"><span>{{ $t('submitForm') }}</span></button>
                  </div>
                </div>
              </ValidationObserver>
            </div><!--setting-content-->
          </div><!--blog-content-->
        </div><!--container-inner-->
      </div><!--container-->
    </div><!--section-blog-->
    <modal-warranty />
    <ModalSuccess :message="$t('sendDataSuccess')" />
    <ModalFail :message="$t('claimDataFail')" />
  </div><!--page-->
</template>

<script>
import ModalWarranty from "@/components/modal/ModalWarranty";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import ModalSuccess from "@/components/modal/ModelSuccess";
import ModalSocialShareProduct from "../components/modal/ModalSocialShareProduct.vue";
import ModalFail from "@/components/modal/ModelFail";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: this.meta.hid,
          name: this.meta.name,
          content: this.meta.content
        }
      ]
    }
  },
  components: {
    ModalSuccess,
    ModalWarranty,
    ModalFail,
    ValidationProvider,
    ValidationObserver,
    ModalSocialShareProduct
  },
  data () {
    return {
      meta: {
        title: '',
        hid: '',
        name: '',
        content: '',
      },
      serial: '',
      claim: {
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
  created() {
    this.$store.dispatch('address/fetchProvince')
  },
  methods: {
    deleteImage (index) {
      this.images.splice(index, 1)
      this.files.splice(index, 1)
    },
    isNumber (event) {
      const keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        event.preventDefault()
      }
    },
    inputImage (e) {
      const file = e.target.files[0]
      this.images.push(URL.createObjectURL(file))
      this.files.push(file)
    },
    changeAddress (event) {
      this.claim.shipCustCity = event.target.value
    },
    async submitData () {
      if (this.files.length !== 0) {
        for (let i=0; i<this.files.length; i++) {
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
            },1000);

            this.claim = {
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
            }
          }
        }

      } catch (e) {
        console.log(e)
      }
    },
    async checkWarranty () {
      const url = `https://d365.munkongonline.com:7048/MKG/api/beta/sentWarrantys?$filter=SerialNo eq '${this.serial}' &$top=1&$orderby=WarrantyDate desc`
      const config = {
        headers: {
          'Authorization': 'Basic QVBJVVNFUjpwWGdqK2hBVUN4V1FkMUV0Q3c4bzFSMUljKzhYYnRGSlVvY0FkYTJka1JFPQ==',
          'Content-Type': 'application/json'
        },
      }

      try {
        const result = await this.$axios.$get(url, config)
        this.$store.commit('claim/CHECK_WARRANTY', result.value[0])

        setTimeout(() => {
          $('#warrantyModal').appendTo('body').modal('show')
        }, 500)
      } catch (e) {
        console.error(e)
      }
    },
    shareFacebook() {
      window.open(
        "https://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(
            `${window.location.origin}/warranty-claim?openExternalBrowser=1`
          )
      );
    },
    shareTwitter() {
      const url = `${window.location.origin}/warranty-claim?openExternalBrowser=1`;

      // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
      );
    },
    // shareMessenger() {
    //   const id = this.product._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
    //   const url = `${window.location.origin}/product/detail?p=${id}&openExternalBrowser=1`;

    //   // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
    //   window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
    // },
    shareLine() {
      const url = `${window.location.origin}/warranty-claim?openExternalBrowser=1`;

      // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url
      )}`;

      // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
      window.open(lineUrl);
    },

    copyToClipboard() {
      const url = `${window.location.origin}/warranty-claim`;

      // สร้างตัวแปรสำหรับ <textarea> element
      const textarea = document.createElement("textarea");
      textarea.value = url;

      // เพิ่ม <textarea> element ลงใน DOM
      document.body.appendChild(textarea);

      // เลือกและคัดลอก URL จาก <textarea>
      textarea.select();
      document.execCommand("copy");

      // ลบ <textarea> element ออกจาก DOM
      document.body.removeChild(textarea);

      alert("ลิงก์ถูกคัดลอกลงในคลิปบอร์ดแล้ว");
    }
  },
  computed: {
    provinces () {
      return this.$store.state.address.province
    },
  },
  fetch() {
    this.meta.title = this.$i18n.locale === 'th' ? 'ประกันสินค้า / เคลมสินค้า' : 'Warranty / Claim';
    this.meta.hid = this.$i18n.locale === 'th' ? 'ประกันสินค้า / เคลมสินค้า' : 'Warranty / Claim';
    this.meta.name = this.$i18n.locale === 'th' ? 'ประกันสินค้า / เคลมสินค้า' : 'Warranty / Claim';
    this.meta.content = this.$i18n.locale === 'th' ? 'ประกันสินค้า / เคลมสินค้า' : 'Warranty / Claim';
  }
}
</script>

<style scoped>

</style>
