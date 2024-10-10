<template>

  <div v-if="showComponent">
    <div class="section">
      <div class="container-fluid">
        <!--          <hr class="mt-0 mb-5">-->
        <div class="row wow fadeIn">
          <div class="col-lg-2 col-md-4 col-4">
            <div class="card-icon">
              <div class="icon">
                <img src="/img/icons/icon-shield.svg" alt="" />
              </div>
              <h3 style="color:#848484" v-html="$t('messageWarranty')"></h3>
            </div>
          </div>

          <div class="col-lg-2 col-md-4 col-4">
            <div class="card-icon">
              <div class="icon">
                <img src="/img/icons/icon-point.svg" alt="" />
              </div>
              <h3 style="color:#848484" v-html="$t('messagePointDiscount')"></h3>
            </div>
          </div>

          <div class="col-lg-2 col-md-4 col-4">
            <div class="card-icon">
              <div class="icon">
                <img src="/img/icons/icon-calendar-2.svg" alt="" />
              </div>
              <h3 style="color:#848484" v-html="$t('messageDOA')"></h3>
            </div>
          </div>

          <div class="col-lg-2 col-md-4 col-4">
            <div class="card-icon">
              <div class="icon">
                <img src="/img/icons/icon-car.svg" alt="" />
              </div>
              <h3 style="color:#848484" v-html="$t('messageFreeShipping')"></h3>
            </div>
          </div>

          <div class="col-lg-2 col-md-4 col-4">
            <div class="card-icon">
              <div class="icon">
                <img src="/img/icons/icon-hand.svg" alt="" />
              </div>
              <h3 style="color:#848484">{{ $t('cod') }}</h3>
            </div>
          </div>

          <div class="col-lg-2 col-md-4 col-4">
            <div class="card-icon">
              <div class="icon">
                <img src="/img/icons/icon-creditcard.svg" alt="" />
              </div>
              <h3 style="color:#848484">{{ $t('paymentMethods') }}</h3>
            </div>
          </div>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->

    <div class="section grey-background" v-if="seoTags.length > 0">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-12 mb-4" v-for="(seoTag, index ) in seoTags" :key="index">
            <p class="seo-title" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{
                $i18n.locale === "th" ? seoTag.title : seoTag.titleEN
            }}</p>
            <div class="mb-2"></div>
            <p class="seo-subtitle mb-2" v-for="(item, index) in seoTag.subTitle" :key="index">
              <a :href="item.link ? item.link : '#'">{{ $i18n.locale === "th" ? item.name : item.nameEN }}</a>
            </p>
          </div>
        </div>
      </div>
      <!--container-fluid-->
    </div>
    <!--section-->

    <footer class="footer" v-if="isMobile">
      <div class="container-fluid wow fadeIn">
        <div class="row">
          <div class="cols">
            <div class="footer-infos">
              <div class="d-flex justify-content-center">
                <div class="logo">
                  <img class="w-100" src="../assets/img/munkong-logo.svg" alt="" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-3 f-12 d-flex justify-content-center" style="font-weight: 400">
                  <a href="/howto-buy">
                    {{ $t('howToBuy') }}
                  </a>
                </div>
                <div class="col-3 f-12 d-flex justify-content-center"
                  style="font-weight: 400">
                  <a href="/payment">
                  {{ $t('paymentMethod') }}
                  </a>
                </div>
                <div class="col-3 f-12 d-flex justify-content-center" style="font-weight: 400">
                <a href="/contact">
                  {{ $t('contactUs') }}
                </a>
                </div>
                <div class="col-3 f-12 d-flex justify-content-center" style="font-weight: 400">
                <a href="/about-us">
                  {{ $t('aboutUs') }}
                </a>
                </div>
              </div>
              <div class="d-flex flex-column mt-4">
                <p class="text-center mb-0 f-20" style="font-weight: 400">
                  ติดตามเราได้ที่
                </p>
                <div class="followus justify-content-center mt-2">
                  <a class="icons icon-instagram" href="https://www.instagram.com/munkong_online/"></a>
                  <a class="icons icon-facebook" href="https://www.facebook.com/munkonggadget1"></a>
                  <!--                    <a class="icons icon-twitter" href="#"></a>-->
                  <a class="icons icon-youtube" href="https://www.youtube.com/munkonggadgetReviews"></a>
                  <a class="icons icon-tiktok" href="https://www.tiktok.com/@munkong.online?_t=8a1fFMvCHGk&_r=1"></a>
                  <a class="icons icon-line" href="https://line.me/ti/p/~@munkonggadget"></a>
                </div>
              </div>
            </div>
          </div>
          <!--cols-->

          <div class="cols mt-2" style="border-bottom: 1px solid whitesmoke">
            <div class="footer-form">
              <div class="d-block">
                <p class="text-center mb-0 f-20" style="font-weight: 400">
                  {{ $t('messageGetDiscount') }}
                </p>
                <p class="text-center f-12 mb-2">
                  {{ $t('messageRegister') }}
                </p>
                <div class="form-group">
                  <input type="text" class="form-control" :placeholder="$t('messageEnterEmail')" name="" />
                  <button class="btn btn-yellow effect" type="button">
                    <span class="group">{{ $t('submit') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--cols-->
        </div>
        <!--row-->

        <hr class="my-1" />

        <div class="d-flex justify-content-between">
          <p class="f-8">© Copyright 2023 Munkong ONLINE. All Right Severed.</p>
          <!-- <p class="f-8">
            Powered by :
            <a href="/https://gramickhouse.com/" target="_blank">Gramick House</a>
          </p> -->
        </div>
        <!--copyright-->
      </div>
      <!--container-fluid-->
    </footer>

    <footer class="footer" v-if="!isMobile">
      <div class="container-fluid wow fadeIn">
        <div class="row">
          <div class="cols">
            <div class="footer-infos">
              <div class="logo">
                <img class="w-100" src="../assets/img/munkong-logo.svg" alt="" />
              </div>

              <h4 class="fs-22">{{ $t("contactUs") }}</h4>
              <p>
                {{ $t('nameFooter') }}<br />
                {{ $t('telFooter') }} : 02-096-6002<br />
                E-mail :
                <a href="/mailto:info@munkongonline.com">info@munkongonline.com</a>
              </p>
              <div class="followus">
                <a class="icons icon-instagram" href="https://www.instagram.com/munkong_online/"></a>
                <a class="icons icon-facebook" href="https://www.facebook.com/munkonggadget1"></a>
                <!--                    <a class="icons icon-twitter" href="#"></a>-->
                <a class="icons icon-youtube" href="https://www.youtube.com/munkonggadgetReviews"></a>
                <a class="icons icon-tiktok" href="https://www.tiktok.com/@munkong.online?_t=8a1fFMvCHGk&_r=1"></a>
                <a class="icons icon-line" href="https://line.me/ti/p/~@munkonggadget"></a>
              </div>
            </div>
          </div>
          <!--cols-->

          <div class="cols">
            <div class="footer-links">
              <ul class="nav">
                <li>
                  <h3 @click="$router.push('/product')" style="cursor: pointer; ">
                    {{ $t('allProduct') }}
                  </h3>
                </li>
                <li>
                  <a href="/news">{{ $t("news") }} / {{ $t("review") }} / {{ $t("video") }}</a>
                </li>
                <li>
                  <a href="/about-us">{{ $t("aboutUs") }}</a>
                </li>
                <li>
                  <a href="https://forum.munkonggadget.com/">{{ $t("webBoard") }}</a>
                </li>
                <li><a href="https://www.facebook.com/groups/munkonggadget/">{{ $t('facebookGroup') }}</a></li>
              </ul>
            </div>
          </div>
          <!--cols-->

          <div class="cols">
            <div class="footer-links">
              <h3 style="color:#fff">{{ $t("helpCenter") }}</h3>
              <ul class="nav">
                <!-- <li><a href="#">{{ $t('setupPayment') }}</a></li> -->
                <li><a href="/howto-buy">{{ $t('howToBuy') }}</a></li>
                <li><a href="/warranty-claim">{{ $t('warrantyFooter') }}</a></li>
                <li><a href="/payment">{{ $t('paymentMethod') }}</a></li>
                <li><a href="/howto-point-detail?id=63db41472886d660ca9463f7">{{ $t('howToUsePoint') }}</a></li>
              </ul>
            </div>
          </div>
          <!--cols-->

          <div class="cols">
            <div class="footer-links">
              <h3 style="color: #fff">{{ $t('branches') }}</h3>
              <ul class="nav">
                <template>
                  <li v-for="(branch, index) in allBranch" :key="index">
                    <a :href="'/branch?b=' + branch._id">{{ $i18n.locale === "th" ? branch.name : branch.nameEN }}</a>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!--cols-->

          <div class="cols">
            <div class="footer-form">
              <div class="d-block">
                <h3 style="color: #fff">{{ $t('messageGetDiscount') }}</h3>
                <p>{{ $t('messageRegister') }}</p>
              </div>
              <div class="form-group">
                <input type="email" class="form-control" :placeholder="$t('messageEnterEmail')" v-model="subScribEmail" />
                <button class="btn btn-yellow effect" type="button" @click="subScribe()">
                  <span class="group">{{ $t('submit') }}</span>
                </button>
              </div>
            </div>
          </div>
          <!--cols-->
        </div>
        <!--row-->

        <div class="copyright">
          <p>© Copyright 2023 Munkong ONLINE. All Right Severed.</p>
          <!-- <p class="ml-md-auto">
            Powered by :
            <a href="https://gramickhouse.com/" target="_blank">Gramick House</a>
          </p> -->
        </div>
        <!--copyright-->
      </div>
      <!--container-fluid-->
    </footer>

    <ModelSubScribeSuccess :message="'ลงทะเบียนรับสิทธิพิเศษเรียบร้อยแล้ว'" />
    <ModelSubScribeFail :message="'อีเมลไม่ถูกต้องหรือถูกใช้งานไปแล้ว'" />
  </div>
</template>

<script type="modules">
  import ModelSubScribeFail from "@/components/modal/ModelSubScribeFail";
  import ModelSubScribeSuccess from "@/components/modal/ModelSubScribeSuccess";
  export default {
    components: { ModelSubScribeFail, ModelSubScribeSuccess },
    name: "Footer",
    data() {
      return {
        showComponent: false,
        subScribEmail: '',
      };
    },
    fetch() {
      const reqBranch = this.$store.dispatch("branch/fetchBranch");
      const reqSeoTag = this.$store.dispatch("seo-tag/fetchSeoTag");
      const allRequest = Promise.all([reqBranch, reqSeoTag]);

      allRequest.then(() => (this.showComponent = true));
    },
    computed: {
      isMobile() {
        return this.$store.state.isMobile;
      },
      allBranch() {
        return this.$store.state.branch.branchs;
      },
      seoTags() {
        return this.$store.getters["seo-tag/seoTags"];
      },
    },
    methods: {
      async subScribe() {
      const payload = {
        email: this.subScribEmail,
      };

      try {
        const result = await this.$store.dispatch("setting/subScribe", payload);

        if (result.status) {
          $("#subscribeSuccessModal").appendTo("body").modal("show");
          this.subScribEmail = '';
        } else {
          $("#subscribefailModal").appendTo("body").modal("show");
        }

      } catch (error) {
        $("#subscribefailModal").appendTo("body").modal("show");
      }

    },
    }
  };
</script>

<style scoped>
.footer {
  padding-bottom: 50px;
}

.pc .footer-links .nav li a:hover,
h3:hover {
  color: #fffe01;
}

.fs-22 {
  font-size: 22px;
  margin-top: 30px;
}

.footer {
  background-color: #000;
}

.footer-links .nav li a {
  padding: 5px 0;
}

.card-icon .icon {
  display: inline-block;
}
</style>
