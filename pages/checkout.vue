<template>
  <div>
    <client-only>
      <div class="section-setting checkout" style="background-color: #f5f5f5">
        <div class="container">
          <ValidationObserver v-slot="{ invalid }">
            <div class="container-inner pt-3" style="background-color: #f5f5f5">
              <div class="setting-content">
                <div class="bgroup">
                  <h3 class="title-lg mt-2">{{ $t("recheckPayment") }}</h3>
                </div>
                <!--bgroup-->
                <div class="bgroup pt-0">
                  <hr class="mt-0" />

                  <h3 class="title-md pt-3">
                    <img class="mr-2" src="/img/icons/nav/icon-user.svg" alt="" />
                    {{ $t("personalInfo") }}
                  </h3>

                  <div class="form-content pb-2">
                    <div class="row">
                      <div class="col-md-12">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input type="text" class="form-control kanit" :placeholder="$t('fullName')"
                            v-model="checkoutDetail.shipCustName" />
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input type="text" class="form-control kanit" :placeholder="$t('tel')" maxlength="10"
                            @keypress="isNumber($event)" v-model="checkoutDetail.shipCustMobileNo" />
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
                          <input type="email" class="form-control kanit" :placeholder="$t('email')"
                            v-model="checkoutDetail.shipCustEmail" />
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <!--row-->
                  </div>

                  <hr />

                  <h3 class="title-md pt-3">
                    <img class="mr-2" src="/img/icons/nav/icon-pin.svg" alt="" />
                    {{ $t("address") }}
                  </h3>

                  <div class="form-content">
                    <div class="row">
                      <div class="col-md-12">
                        <input type="text" class="form-control kanit" :placeholder="$t('address')"
                          v-model="checkoutDetail.shipCustAddress" />
                      </div>

                      <div class="col-md-6 position-relative" @click="isActive = !isActive">
                        <select name="province" class="custom-select kanit" @input="changeAddress($event)"
                          @blur="isActive = false">
                          <option>{{ $t("province") }}</option>
                          <option v-for="province in provinces" :selected="province.name_th === checkoutDetail.shipCustCity
                            " :value="province.name_th">
                            {{
                              $i18n.locale === "en"
                              ? province.name_en
                              : province.name_th
                            }}
                          </option>
                        </select>
                        <img src="../assets/img/icons/arrow-select.svg" alt="" :class="{ 'arrow-icon-active': isActive }"
                          class="arrow-icon" />
                      </div>

                      <div class="col-md-6">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input type="text" class="form-control kanit" :placeholder="$t('postcode')" maxlength="5"
                            @keypress="isNumber($event)" v-model="checkoutDetail.shipCustPostCode" />
                          <span class="valid-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <!--row-->
                  </div>

                  <!--            <div class="bgroup px-0 d-flex">-->
                  <!--              <button @click="saveData" class="btn btn-black w-150 effect" type="button" data-target="#saveConfirmModal" data-toggle="modal"><span>บันทึก</span></button>-->
                  <!--            </div>-->

                  <div class="checkbox-group mt-3">
                    <input id="a1" type="checkbox" name="a" value="yes" v-model="checkoutDetail.vatReceipt" />
                    <label for="a1" class="kanit pr-0">{{
                      $t("demandTaxInvoice")
                    }}</label>
                  </div>

                  <div class="form-content pb-2">
                    <div class="row">
                      <div class="col-md-6">
                        <input type="text" class="form-control kanit" :placeholder="$t('taxNo')"
                          @keypress="isNumber($event)" v-model="checkoutDetail.taxCustTaxId" />
                      </div>

                      <div class="col-md-6 d-none d-md-block"></div>

                      <div class="col-md-6">
                        <input type="text" class="form-control kanit" :placeholder="$t('companyName')"
                          v-model="checkoutDetail.taxCustName" />
                      </div>

                      <div class="col-md-6">
                        <input type="text" class="form-control kanit" :placeholder="$t('branchName')"
                          v-model="checkoutDetail.taxCustBranchNo" />
                      </div>
                    </div>
                    <!--row-->
                  </div>

                  <div class="radio-group checkbox mt-3 d-block">
                    <input id="b1" type="radio" name="sameAddress" value="yes" v-model="checkoutDetail.sameAddress" />
                    <label for="b1" class="kanit pr-0">{{
                      $t("sameAddress")
                    }}</label>
                  </div>

                  <div class="radio-group checkbox mt-3 d-block">
                    <input id="b2" type="radio" name="sameAddress" value="no" v-model="checkoutDetail.sameAddress" />
                    <label for="b2" class="kanit pr-0">{{
                      $t("otherAddress")
                    }}</label>
                  </div>

                  <template v-if="checkoutDetail.sameAddress === 'no'">
                    <hr class="mt-5" />
                    <h3 class="title-md pt-3">
                      <img class="mr-2" src="/img/icons/nav/icon-pin.svg" alt="" />
                      {{ $t("addressForTax") }}
                    </h3>
                    <div class="form-content">
                      <div class="row">
                        <div class="col-md-12">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <input type="text" class="form-control kanit" :placeholder="$t('taxAddress')"
                              v-model="checkoutDetail.taxCustAddress" />
                            <span class="valid-message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>

                        <div class="col-md-6" @click="isActiveTax = !isActiveTax">
                          <select name="province" class="custom-select kanit" v-model="checkoutDetail.taxCustCity"
                            @blur="isActiveTax = false">
                            <option>{{ $t("province") }}</option>
                            <option v-for="province in provinces" :selected="province.name_th === checkoutDetail.taxCustCity
                              " :value="province.name_th">
                              {{
                                $i18n.locale === "en"
                                ? province.name_en
                                : province.name_th
                              }}
                            </option>
                          </select>
                          <img src="../assets/img/icons/arrow-select.svg" alt=""
                            :class="{ 'arrow-icon-active': isActiveTax }" class="arrow-icon" />
                        </div>

                        <div class="col-md-6">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <input type="text" class="form-control kanit" :placeholder="$t('postcode')" maxlength="5"
                              @keypress="isNumber($event)" v-model="checkoutDetail.taxCustPostCode" />
                            <span class="valid-message">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                      </div>
                      <!--row-->
                    </div>
                  </template>

                  <hr class="mt-5" />

                  <h3 class="title-md pt-3">
                    <img class="mr-2" src="/img/icons/icon-payment.svg" alt="" />{{ $t("paymentMethod") }}
                  </h3>

                  <div class="payment-method">
                    <div class="radio-group checkbox">
                      <input id="payment2" type="radio" name="payment" value="credit"
                        v-model="checkoutDetail.paymentMethod" />
                      <label for="payment2" class="kanit pr-0">
                        {{ $t("viaCredit") }}
                        <div class="icongroup">
                          <img src="/img/icons/icon-visa.png" alt="" />
                          <img src="/img/icons/icon-mastercard.png" alt="" />
                        </div>
                      </label>
                    </div>

                    <div class="radio-group checkbox">
                      <input id="payment3" type="radio" name="payment" value="qrcode"
                        v-model="checkoutDetail.paymentMethod" />
                      <label for="payment3" class="kanit pr-0">
                        {{ $t("viaQRCode") }}
                        <div class="icongroup">
                          <img class="h-20" src="/img/icons/icon-thai-qrcode.png" alt="" />
                        </div>
                      </label>
                    </div>

                    <div class="radio-group checkbox">
                      <input :disabled="cart.totalPrice +
                        shippingCost -
                        (cart.totalDiscount +
                          usePoint +
                          cart.totalBundle +
                          cart.couponDiscount) <
                        3000
                        " id="payment4" type="radio" name="payment" value="installment"
                        v-model="checkoutDetail.paymentMethod" />
                      <label for="payment4" class="kanit pr-0 flex">
                        <div class="display-condition">
                          {{ $t("viaInstallment") }}
                          <span class="ml-2" style="color: red">
                            (*{{ $t("mustGatherThreeThousandBath") }})</span>
                        </div>
                        <div class="icongroup">
                          <img src="/img/icons/icon-unionpay.png" alt="" />
                          <img src="/img/icons/icon-visa.png" alt="" />
                          <img src="/img/icons/icon-mastercard.png" alt="" />
                        </div>
                      </label>

                      <div class="row mb-4" v-if="checkoutDetail.paymentMethod === 'installment'">
                        <div class="col-md-6 mt-2">
                          <div class="installment-bank" @click="chooseBank = 'kbankInstallment'" :class="{
                            'select-bank': chooseBank === 'kbankInstallment',
                          }">
                            <div style="display: flex; align-items: center">
                              <img src="/img/icons/icon-kbank.png" alt="" width="65px" height="65px" />
                              <span class="mt-2 ml-4" style="font-size: 17px">บัตรเครดิตธนาคารกสิกรไทย</span>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6 mt-2">
                          <div class="installment-bank" @click="chooseBank = 'otherInstallment'" :class="{
                            'select-bank': chooseBank === 'otherInstallment',
                          }">
                            <div style="display: flex">
                              <img src="/img/icons/icon-bbl.png" alt="" width="32px" height="32px" />
                              <img src="/img/icons/icon-scb.png" alt="" width="32px" height="32px" class="ml-2" />
                              <img src="/img/icons/icon-kma.png" alt="" width="32px" height="32px" class="ml-2" />
                              <img src="/img/icons/icon-ktb.png" alt="" width="32px" height="32px" class="ml-2" />
                              <img src="/img/icons/icon-citi.png" alt="" width="32px" height="32px" class="ml-2" />
                              <img src="/img/icons/icon-ttb.png" alt="" width="32px" height="32px" class="ml-2" />
                              <img src="/img/icons/icon-uob.png" alt="" width="32px" height="32px" class="ml-2" />
                            </div>
                            <span class="mt-2" style="font-size: 17px">บัตรเครดิตธนาคารอื่น ๆ</span>
                          </div>
                        </div>

                        <div class="px-3 mt-2" v-if="chooseBank === 'kbankInstallment'">
                          <p class="text-left mb-1">
                            เลือกจำนวนเดือนที่ต้องการผ่อนชำระ
                          </p>
                          <select name="province" class="custom-select kanit" v-model="checkoutDetail.installmentTerm">
                            <!--                            3 4 6 10-->
                            <option value="3">ผ่อนชำระ 0% 3 เดือน</option>
                            <option value="4">ผ่อนชำระ 0% 4 เดือน</option>
                            <option value="6">ผ่อนชำระ 0% 6 เดือน</option>
                            <option value="10">ผ่อนชำระ 0% 10 เดือน</option>
                          </select>
                          <!--                          <span>*เมื่อเลือกการผ่อนชำระแล้ว กรุณาตรวจสอบข้อมูลส่วนตัว</span>-->
                        </div>
                      </div>
                    </div>

                    <div class="radio-group checkbox">
                      <input id="payment5" type="radio" name="payment" value="bank"
                        v-model="checkoutDetail.paymentMethod" />
                      <label for="payment5" class="kanit pr-0">
                        {{ $t("bankTransfer") }}
                        <div class="icongroup">
                          <!--                        <img class="h-20" src="/img/icons/icon-thai-qrcode.png" alt="">-->
                        </div>
                      </label>
                    </div>

                    <div class="radio-group checkbox" v-show="isLoggedIn">
                      <input id="payment6" type="radio" name="payment" value="delivery"
                        v-model="checkoutDetail.paymentMethod" />
                      <label for="payment6" class="kanit pr-0">
                        {{ $t("viaDelivery") }}
                      </label>
                    </div>
                  </div>
                  <!--payment-method-->
                </div>
                <!--bgroup-->
              </div>
              <!--setting-content-->

              <div class="setting-sidebar right">
                <div class="bgroup">
                  <h3 class="title-lg mt-2">{{ $t("recheckPayment") }}</h3>
                </div>

                <div class="order-box">
                  <hr class="mt-0 mt-md-4 mb-0" />
                  <template v-for="(item, index) in cart.items">
                    <div class="card-order cart md" :key="index">
                      <div class="card-photo" :data-title="$t('detailProduct')">
                        <div class="photo" :style="{
                          backgroundImage: 'url(' + item.image.replace('munkong.sgp1.cdn.digitaloceanspaces.com', 'ik.imagekit.io/munkong') + ')',
                        }"></div>
                      </div>
                      <div class="card-body">
                        <div class="cols info ml-0">
                          <h5 class="mb-2">{{ item.name }}</h5>
                          <p class="m-0 black-50">
                            {{ item.option.name }} : {{ item.option.attribute }}
                          </p>
                        </div>
                        <div class="cols qty" :data-title="$t('quantity')">
                          <input type="text" disabled name="qty" class="qty form-control" maxlength="12"
                            :value="item.amount" />
                        </div>
                        <div class="cols price total mr-0" :data-title="$t('totalPrice')">
                          <h4 class="reddark">
                            ฿{{
                              ((item.price - item.discount) * item.amount)
                              | numFormat
                            }}
                          </h4>
                        </div>
                      </div>
                      <!--card-body-->
                    </div>
                    <!--card-buy-again-->
                  </template>
                </div>
                <!--buy-again-box-->

                <div class="bgroup">
                  <h3 class="title-lg mt-2 mb-3">
                    {{ $t("messageTitleSummary") }}
                  </h3>

                  <div class="order-summary h-auto">
                    <div class="d-flex py-1">
                      <p>{{ $t("totalPriceProduct") }}</p>
                      <h5 class="ml-auto f-16">
                        ฿{{
                          (cart.totalPrice - cart.totalDiscount) | numWithFloat
                        }}
                      </h5>
                    </div>
                    <!-- Coupon type discount -->
                    <div class="d-flex py-1" v-if="isLoggedIn &&
                        coupon !== null &&
                        coupon.type === 'discount'
                        ">
                      <p>
                        {{ $t("couponDiscount") }}
                        <span style="color: #ffab00">{{ coupon.name }}</span>
                      </p>
                      <h5 class="ml-auto f-16">
                        ฿{{ couponValue | numWithFloat }}
                      </h5>
                    </div>
                    <!-- Coupon type cashback -->
                    <div class="d-flex py-1" v-if="isLoggedIn &&
                      coupon !== null &&
                      coupon.type === 'cashback'
                      ">
                      <p>
                        {{ $t("couponCashBack") }}
                        <span style="color: #ffab00">{{ coupon.name }}</span>
                      </p>
                      <h5 class="ml-auto f-16">
                        {{ cart.couponCashback | numWihOutFloat }}
                      </h5>
                    </div>
                    <div class="d-flex py-1">
                      <p>{{ $t("discount") }} Bundle Deal</p>
                      <h5 class="ml-auto f-16">
                        ฿{{ cart.totalBundle | numWithFloat }}
                      </h5>
                    </div>
                    <div class="d-flex py-1" v-if="isLoggedIn">
                      <p>{{ $t("getCashback") }}</p>
                      <h5 class="ml-auto f-16">
                        {{
                          cart.point | numWihOutFloat
                        }}
                      </h5>
                    </div>
                    <!-- Use point discount-->
                    <div class="d-flex py-1" v-if="isLoggedIn">
                      <p>{{ $t("usePointDiscount") }}</p>
                      <h5 class="ml-auto f-16">
                        ฿{{ usePoint | numWihOutFloat }}
                      </h5>
                    </div>
                    <div class="d-flex py-1">
                      <p>{{ $t("shippingCost") }}</p>
                      <h5 class="ml-auto f-16">
                        ฿{{ shippingCost | numWihOutFloat }}
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="bgroup pt-0">
                  <hr class="mt-0 pb-2" />

                  <div class="order-summary d-flex h-auto">
                    <div>
                      <h5 class="title-lg">{{ $t("totalPriceInclVat") }}</h5>
                      <p class="sarabun black-50 m-0">
                        ({{ $t("includeVat") }})
                      </p>
                    </div>
                    <h4 class="title-lg reddark kanit ml-auto">
                      ฿{{
                        (cart.totalPrice + shippingCost - (cart.totalDiscount + usePoint + cart.totalBundle
                          + cart.couponDiscount) ) | numWithFloat
                      }}
                    </h4>
                  </div>

                  <hr class="mt-4" />
                  <div class="checkbox-group mb-3 mt-2" v-if="$i18n.locale === 'th'">
                    <input id="a2" type="checkbox" name="accept" value="yes" v-model="acceptCondition" />
                    <label for="a2" class="kanit pr-0">{{ $t("accept")
                    }}<a data-toggle="modal" data-target="#conditionModal" style="font-weight: 500">{{ $t("condition")
}}</a>{{ $t("payments") }}</label>
                  </div>
                  <div class="checkbox-group mb-3 mt-2" v-else>
                    <input id="a2" type="checkbox" name="accept" value="yes" v-model="acceptCondition" />
                    <label for="a2" class="kanit pr-0">
                      {{ $t("accept") }} {{ $t("payments") }}
                      <a data-toggle="modal" data-target="#conditionModal" style="font-weight: 500">{{ $t("condition") }}
                      </a>
                    </label>
                  </div>
                  <button class="btn btn-black lg effect w-100" @click="nextStep" :disabled="invalid || cart.items.length === 0 || !acceptCondition
                    ">
                    <span>{{ $t("continue") }}</span>
                  </button>
                  <!--                <button class="btn btn-black lg effect w-100" @click="nextStep"><span>{{ $t('continue') }}</span></button>-->
                </div>
              </div>
              <!--setting-sidebar-->
            </div>
            <!--container-inner-->
          </ValidationObserver>
        </div>
        <!--container-->

        <form ref="myform" method="post" action="https://t.2c2p.com/RedirectV3/payment" v-if="payment !== null">
          <input type="hidden" name="version" :value="payment.version" />
          <input type="hidden" name="merchant_id" :value="payment.mid" />
          <input type="hidden" name="currency" :value="payment.currency" />
          <input type="hidden" name="result_url_1" :value="payment.urlOne" />
          <input type="hidden" name="result_url_2" :value="payment.urlTwo" />
          <input type="hidden" name="hash_value" :value="payment.hashValue" />
          <input type="hidden" name="payment_description" :value="payment.desc" /><br />
          <input type="hidden" name="order_id" :value="payment.orderId" /><br />
          <input type="hidden" name="payment_option" :value="payment.paymentOption" /><br />
          <input type="hidden" name="ipp_interest_type" :value="payment.IPPType" /><br />
          <input type="hidden" name="qr_type" :value="payment.QRType" /><br />
          <!--        <input type="hidden" name="ipp_period_filter" :value="payment.installmentPeriod"/><br/>-->
          <input type="hidden" name="amount" :value="payment.amount" /><br />
        </form>

        <ModalCondition />
        <ModelPaymentSuccess ref="modal" />
        <ModelPaymentFail ref="modalPaymentFail" :key="NaN" />
        <ModalSaveAddress :data="checkoutDetail" />
        <ModalFail :message="errMsg" />
      </div>
      <!--section-setting-->
    </client-only>
  </div>
</template>

<script>
import ModelPaymentSuccess from "@/components/modal/ModelPaymentSuccess";
import ModalSaveAddress from "@/components/modal/ModalSaveAddress";
import ModelPaymentFail from "@/components/modal/ModelPaymentFail";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import jwt from "jsonwebtoken";
import ModalCondition from "@/components/modal/ModalCondition";
import ModalFail from "@/components/modal/ModelFail";

export default {
  middleware (ctx) {
    ctx.$gtm.push({ event: 'ssr' })
  },
  components: {
    ModalFail,
    ModalCondition,
    ModelPaymentFail,
    ModelPaymentSuccess,
    ValidationProvider,
    ValidationObserver,
    ModalSaveAddress,
  },
  layout: "blank",
  data() {
    return {
      errMsg: "พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      isActive: false,
      isActiveTax: false,
      acceptCondition: "",
      checkoutDetail: {
        products: [],
        totalAmt: 0,
        shipCustName: "",
        shipCustAddress: "",
        shipCustCity: "",
        shipCustPostCode: "",
        shipCustCountry: "",
        shipCustPhoneNo: "",
        shipCustMobileNo: "",
        shipCustFaxNo: "",
        shipCustEmail: "",
        //Tax
        taxCustName: "",
        taxCustAddress: "",
        taxCustCity: this.$nuxt.$t("province"),
        taxCustPostCode: "",
        taxCustTaxId: "",
        taxCustBranchNo: "",
        paymentMethod: "credit",
        custID: "",
        vatReceipt: false,
        sameAddress: "yes",
        installmentBank: "",
        installmentTerm: "3",
      },
      shippingCost: 0,
      chooseBank: "kbankInstallment",
      kBank: null,
      isLoggedIn: false,
      payment: null,
      paymentKBANK: {
        orderId: null,
        amount: null,
      },
      coupon: null,
      usePoint: 0,
      canInstallment: false,
      outOfStockId: [],
      specialShipment: null,
      normalShipping: '',
      specialShipping: '',
      sumSpecialShipping: 0,
      sumNormalShipping: 0,
      couponValue: 0,
      couponType: 0,
      outOfPreOrder: false,
    };
  },
  async created() {
    // await this.$store.dispatch("setting/getSetting");
    this.isLoggedIn = this.$auth.loggedIn;
    if (this.isLoggedIn) {
      const getUserDetail = JSON.parse(JSON.stringify(this.$auth.user));
      this.checkoutDetail.custID = getUserDetail.custId;
      if (getUserDetail.shipAddress.length > 0) {
        this.checkoutDetail.shipCustName =
          getUserDetail.shipAddress[0].shipCustName ? getUserDetail.shipAddress[0].shipCustName : this.$auth.user.custName;
        this.checkoutDetail.shipCustAddress =
          getUserDetail.shipAddress[0].shipCustAddress;
        this.checkoutDetail.shipCustCity =
          getUserDetail.shipAddress[0].shipCustCity;
        this.checkoutDetail.shipCustPostCode =
          getUserDetail.shipAddress[0].shipCustPostCode;
        this.checkoutDetail.shipCustCountry =
          getUserDetail.shipAddress[0].shipCustCountry;
        this.checkoutDetail.shipCustPhoneNo =
          getUserDetail.shipAddress[0].shipCustPhoneNo;
        this.checkoutDetail.shipCustMobileNo =
          getUserDetail.shipAddress[0].shipCustMobileNo;
        this.checkoutDetail.shipCustFaxNo =
          getUserDetail.shipAddress[0].shipCustFaxNo;
        this.checkoutDetail.shipCustEmail =
          getUserDetail.shipAddress[0].shipCustEmail;
      }
      if (getUserDetail.shipTaxAddress.length > 0) {
        this.checkoutDetail.taxCustName =
          getUserDetail.shipTaxAddress[0].taxCustName;
        this.checkoutDetail.taxCustAddress =
          getUserDetail.shipTaxAddress[0].taxCustAddress;
        this.checkoutDetail.taxCustCity =
          getUserDetail.shipTaxAddress[0].taxCustCity;
        this.checkoutDetail.taxCustPostCode =
          getUserDetail.shipTaxAddress[0].taxCustPostCode;
        this.checkoutDetail.taxCustTaxId =
          getUserDetail.shipTaxAddress[0].taxCustTaxId;
        this.checkoutDetail.taxCustBranchNo =
          getUserDetail.shipTaxAddress[0].taxCustBranchNo;
      }
    }

    await this.$store.dispatch("address/fetchProvince");
  },
  async mounted() {
    await this.$store.dispatch("setting/getSetting", "home");
    const query = this.$route.query.value || "bnVsbCZBU0Iw";

    const queryDecode = Buffer.from(`${query}`, "base64").toString("utf-8");
    const value = queryDecode.split("&ASB");

    const getBundle = await this.$store.dispatch("bundle/fetchBundle");
    this.$store.commit("cart/GET_CART");

    if (value[0] !== "null") {
      const getCoupon = await this.$store.dispatch(
        "coupon/getCoupon",
        value[0]
      );
      this.coupon = JSON.parse(JSON.stringify(getCoupon));
      this.couponType = this.coupon?.discountType;
      this.couponValue = this.coupon?.discountValue;

      if (this.coupon.type === "cashback") {
        this.$store.commit("cart/SET_COUPON_CASH_BACK", this.coupon);
      } else {
        this.$store.commit("cart/SET_COUPON_DISCOUNT", this.coupon);
      }
    }

    const usePointDiscount = parseInt(value[1]);
    if (this.isLoggedIn && this.$auth.user.customerPoint >= usePointDiscount) {
      this.usePoint = usePointDiscount;
    }

    this.$store.commit(
      "cart/UPDATE_PRICE_BUNDLE",
      JSON.parse(JSON.stringify(getBundle))
    );
    this.$store.commit("cart/UPDATE_PRICE");

    const pointCashback = await this.$store.dispatch(
      "point-cashback/getPointCashback"
    );

    if (pointCashback) {
      // this.$store.commit("cart/CALCULATE_POINT", {
      //   pointCashback: pointCashback,
      //   usePointDiscount: this.usePoint
      // });
      this.$store.commit("cart/CALCULATE_POINT", pointCashback);
    }


    //คำนวณค่าขนส่ง
    this.specialShipment = this.cart.items.filter(item => item.option.specialShipmentCost).slice();
    this.specialShipping = this.cart.items.filter(item => item.option.typeShipping === 'special');
    this.normalShipping = this.cart.items.filter(item => item.option.typeShipping == 'normal')

    this.allNormalShipment();
    this.allSpecialShipment();
    this.sumAllShipmentType();

    if((this.cart.totalPrice + this.shippingCost - (this.cart.totalDiscount + this.usePoint + this.cart.totalBundle + this.cart.couponDiscount) < this.setting.shipmentFee) && ( this.sumSpecialShipping == 0)){
      this.shippingCost = this.setting.shipmentCost;
    }

    // const totalDiscount = this.cart.totalDiscount +
    // this.usePoint +
    // this.cart.totalBundle +
    // this.cart.couponDiscount

    this.$store.commit("cart/CAL_NEW_POINT_CASHBACK", this.usePoint);

    //Return payment value
    if (this.$route.query.order) {
      const result = await this.$store.dispatch(
        "order/checkStatusOrder",
        this.$route.query.order
      );
      if (result.data.paymentStatus === "success") {
        this.$store.commit("cart/REMOVE_SUCCESS_ITEM");
        this.$store.commit("cart/SAVE_CART");
        await this.$gtm.push({ event: 'thank_you_page' })
        $("#paymentSuccessModal").appendTo("body").modal({
          backdrop: "static",
          keyboard: true,
          show: true,
        });
      } else {
        let element = this.$refs.modalPaymentFail.$el;
        $(element).modal("show");

        setTimeout(() => {
          if (this.isLoggedIn) {
            window.location.href = "/member?status=all";
          } else {
            window.location.href = "/cart";
          }
        }, 1000);
      }
    }
  },
  methods: {
    allNormalShipment() {
      if (this.normalShipping.length > 0) {
        const allShipmentCosts = this.normalShipping.map(item => item.option.specialShipmentCost);
        const totalShipmentCost = allShipmentCosts.reduce((acc, cost) => acc + cost, 0);
        this.shippingCost = totalShipmentCost || 0;
        this.sumNormalShipping = this.shippingCost
      }
    },
    allSpecialShipment() {
      if (this.specialShipping.length > 0) {
        const allShipmentCosts = this.specialShipping.map(item => item.option.specialShipmentCost);
        const totalShipmentCost = allShipmentCosts.reduce((acc, cost) => acc + cost, 0);
        this.shippingCost = totalShipmentCost || 0;
        this.sumSpecialShipping = this.shippingCost
      }
    },
    sumAllShipmentType() {
      if (this.normalShipping.length > 0 && this.specialShipping.length > 0) {
        const totalCost = this.sumSpecialShipping + this.sumNormalShipping
        this.shippingCost = totalCost
      }
    },

    async checkPreOrder() {
      this.cart.items.map( async (item) => {
        if (item.preOrderStatus == true) {
          const result = await this.$store.dispatch("product/checkPreOrder", item.option.id );
          if(result.status == true){
            if(result.data <= 0 || result.data < item.amount){
              this.outOfPreOrder = true;
            }
          }
        }
      })
    },

    async checkStock() {
      const checkItemNo = [];
      this.cart.items.map((item) => {
        if(item.preOrderStatus == false){
          checkItemNo.push(item.option.itemNo);
        }
      });
      try {
        const response = await this.$axios.$post(
          "https://oms.hili.asia/api/wms.dev.get_stock?app_key=5f8e1e8f-6606-46e2-bb60-a820819930d4&custkey=c4f2e654-da53-4832-bc99-fd096bd8f530",
          {
            DATA: {
              Product_Code: [...checkItemNo],
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.outOfStockId = response["RESULT"]
          .filter(
            (item) =>
              item["Error_Description"] &&
              (item["Error_Description"] === "OUT OF STOCK" ||
                item["Error_Description"] === "NOT FOUND PRODUCT")
          )
          .map((item) => item["Product_Code"]);
      } catch (error) {
        console.log(error);
      }
    },
    isNumber(event) {
      const keyCode = event.keyCode ? event.keyCode : event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        event.preventDefault();
      }
    },
    changeAddress(event) {
      if (event.target.name === "province") {
        this.checkoutDetail.shipCustCity = event.target.value;
      }
    },
    async nextStep() {
      let payload = JSON.parse(JSON.stringify(this.checkoutDetail));

      if (this.checkoutDetail.sameAddress === "yes") {
        payload.taxCustAddress = this.checkoutDetail.sameAddress === "yes" ? payload.shipCustAddress : payload.taxCustAddress;
        payload.taxCustTaxId = payload.taxCustTaxId;
        payload.taxCustName = payload.taxCustName;
        payload.taxCustBranchNo = payload.taxCustBranchNo;
        payload.taxCustCity = this.checkoutDetail.sameAddress === "yes" ? payload.shipCustCity : payload.taxCustCity;
        payload.taxCustPostCode = this.checkoutDetail.sameAddress === "yes" ? payload.shipCustPostCode :  payload.taxCustPostCode;
      }

      const sumDiscount =
        this.cart.totalDiscount +
        this.cart.totalBundle +
        this.cart.couponDiscount +
        this.usePoint;
      payload.shippingCost =
        this.cart.totalPrice > this.setting.shipmentFee ? 0 : 50;
      payload.products = this.cart.items;
      payload.coupon = this.coupon !== null ? this.coupon?._id : null;
      payload.totalAmt = (
        this.cart.totalPrice +
        this.shippingCost -
        sumDiscount
      ).toFixed(2);
      payload.cust = this.$auth.loggedIn ? this.$auth.user._id : null;
      payload.usePoint = this.usePoint;
      payload.point = this.cart.point;
      payload.totalBundle = this.cart.totalBundle.toFixed(2);
      payload.totalDiscount = this.cart.totalDiscount.toFixed(2);
      payload.couponDiscount = this.cart.couponDiscount.toFixed(2);
      payload.couponCashback = this.cart.couponCashback.toFixed(2);
      payload.vatReceipt = this.checkoutDetail.vatReceipt === true;
      payload.sameAddress = this.checkoutDetail.sameAddress === "yes";
      payload.installmentBank =
        this.chooseBank === "kbankInstallment" ? "kbank" : "other";
      payload.status =
        this.checkoutDetail.paymentMethod === "bank" ||
          this.checkoutDetail.paymentMethod === "delivery"
          ? "pending"
          : "pay";

      const token = jwt.sign(
        {
          data: payload,
        },
        process.env.jwtSecret,
        {
          expiresIn: "30d",
        }
      );

      const modalDismissed = new Promise((resolve) => {
        $("#saveAddressModel").on("hidden.bs.modal", () => {
          setTimeout(() => {
            resolve();
          }, 2000); // add delay
        });
      });


      if (this.isLoggedIn && this.$auth.user.shipAddress.length === 0) {
        // show the modal
        $("#saveAddressModel").appendTo("body").modal({
          backdrop: "static",
          keyboard: true,
          show: true,
        });
        await modalDismissed;
      }

      await this.checkPreOrder();
      await this.checkStock();

      if (this.outOfStockId.length !== 0 || this.outOfPreOrder == true) {
        this.$store.commit("cart/REMOVE_OUT_OF_STOCK", this.outOfStockId);
        this.errMsg = "สินค้าหมด";
        $("#failModal").appendTo("body").modal("show");
        setTimeout(() => {
          window.location.href = "/cart";
        }, 1000);
        return;
      }

      const result = await this.$store.dispatch("order/checkOut", { token });
      await this.$gtm.push({ event: 'begin_checkout' })

      if (result.status) {
        if (this.checkoutDetail.paymentMethod === "bank") {
          this.paymentViaBankTransfer(result);
        } else if (this.checkoutDetail.paymentMethod === "delivery") {
          this.paymentViaDelivery();
        } else if (this.checkoutDetail.paymentMethod === "credit") {
          await this.paymentKBankOther(result);
        } else if (this.checkoutDetail.paymentMethod === "installment") {
          if (this.chooseBank === "kbankInstallment") {
            await this.paymentKBankOther(result);
          } else {
            await this.paymentViaOther(result);
          }
        } else {
          await this.paymentViaOther(result);
        }
      } else {
        $("#failModal").appendTo("body").modal("show");
        setTimeout(() => {
          window.location.href = "/cart";
        }, 1000);
      }
    },
    paymentViaDelivery() {
      // COD
      this.$store.commit("cart/REMOVE_SUCCESS_ITEM");
      this.$store.commit("cart/SAVE_CART");
      this.$gtm.push({ event: 'thank_you_page' })
      $("#paymentSuccessModal").appendTo("body").modal({
        backdrop: "static",
        keyboard: true,
        show: true,
      });
    },
    paymentViaBankTransfer(result) {
      try {
        // const token = jwt.sign({
        //     data: payload,
        //     orderId: orderId
        //   },
        //   process.env.jwtSecret, {
        //     expiresIn: "30d"
        //   })
        window.location.href = `/bank-transfer?data=${result.data._id}`;
      } catch (e) {
        console.log(e);
      }
    },
    async paymentKBankOther(result) {
      const parseResult = JSON.parse(JSON.stringify(result.data));
      window.location.href = "/kbank?order=" + parseResult.orderId;
    },

    async paymentViaOther(result) {
      let paymentOption = "";

      if (result.data.paymentMethod === "credit") {
        paymentOption = "CC";
      } else if (result.data.paymentMethod === "qrcode") {
        paymentOption = "Q";
      } else {
        paymentOption = "IPP";
      }

      const genToken = {
        orderId: result.data.orderId,
        totalAmt: result.data.totalAmt.toFixed(2),
        orderObjectId: result.data._id,
        paymentOption: paymentOption,
        QRType: result.data.paymentMethod === "qrcode" ? "PP" : "",
        installmentPeriod: "3",
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
  },
  filters: {
    numWihOutFloat(value) {
      return Math.floor(value);
    },
  },
  computed: {
    getAmountPayment() {
      return this.$store.state.payment.amount;
    },
    setting() {
      return this.$store.state.setting.setting;
    },
    provinces() {
      return this.$store.state.address.province;
    },
    cart() {
      const cartStore = JSON.parse(JSON.stringify(this.$store.state.cart.cart));
      cartStore.items = cartStore.items.filter((item) => item.isCheck === true);
      // const installment = cartStore.items.filter(item => item.canInstallment === false)
      // if (installment.length > 0) {
      //   this.canInstallment = false
      // }
      // console.log(cartStore.items);
      cartStore.point = 0;
      cartStore.items.map(item => {
        cartStore.point = cartStore.point + (item.point * item.amount);
      })

      cartStore.point = cartStore.point - (this.usePoint / 100) - (this.couponValue / 100)
      cartStore.point = parseInt(cartStore.point);

      const total = cartStore.totalPrice - cartStore.totalDiscount;
      if(cartStore.couponDiscount  == 0){
        if(this.couponType == 'percent'){
          cartStore.couponDiscount = parseInt(total * (this.couponValue / 100));
          this.couponValue = parseInt(cartStore.couponDiscount);
        }else{
          cartStore.couponDiscount = parseInt(this.couponValue);
        }
      }

      return cartStore;
    },
  }
};
</script>

<style scoped>
.arrow-icon {
  position: absolute;
  right: 30px;
  top: 25px;
  width: 25px;
  height: auto;
}

.arrow-icon-active {
  position: absolute;
  right: 30px;
  top: 25px;
  width: 25px;
  height: auto;
  transform: rotate(180deg);
}

.custom-select {
  background: unset;
  background-color: rgba(17, 17, 17, 0.05);
}

.installment-bank {
  display: flex;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 10px 15px;
  min-height: 100px;
  margin-top: 15px;
  -ms-flex-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: grey;
  /*filter: invert(69%) sepia(1%) saturate(0%) hue-rotate(162deg) brightness(90%) contrast(90%);*/
}

.installment-bank span {
  font-size: 14px;
  /*filter: invert(69%) sepia(1%) saturate(0%) hue-rotate(162deg) brightness(90%) contrast(90%);*/
}

.select-bank {
  background: lightgray;
}

.checkbox-group input:disabled+label:before,
.radio-group input:disabled+label:before {
  background-color: #8c8c8b;
  border: none;
  cursor: not-allowed;
}

.display-condition {
  display: flex;
}

.card-order.cart .cols.info{
  width:100%;
  padding-right:20px;
}
.card-order .cols.price.total{
  width:80px;
  flex-shrink: 0;
}

.card-order.cart .cols.price.total:before{
  left:auto;
  right:0;
}
.title-md{
  font-size:25px;
}

@media (max-width: 991.98px) {
  .title-md{
    font-size:22px;
  }
}

@media (max-width: 767px) {
  .display-condition {
    flex-direction: column;
  }

  .display-condition span {
    margin-left: 0px;
    font-size: 12px;
  }

  .card-order .cols.price.total h4{
    margin-top:0;
    margin-left:0;
  }

  .card-order .cols.price.total{
    display:block;
    text-align: right;
    margin-left:0;
  }

  .setting-sidebar .card-order .cols.qty{
    margin-left:auto;
  }
}

@media (max-width: 578px) {
  .arrow-icon {
    right: 30px;
    top: 15px;
  }

  .arrow-icon-active {
    right: 30px;
    top: 15px;
    transform: rotate(180deg);
  }

  .card-order .cols.info{
    max-width:100%
  }

  .setting-sidebar .card-order .cols.qty{
    margin-left:0;
  }

  .card-order .cols.price.total{
    margin:auto auto 0 auto;
  }
}
</style>
