<template>
  <div id="reviewModal" class="modal modal-alert review fade" v-if="order">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <div class="modal-content p-0">
          <h4 class="modal-title">{{ $t('reviewProduct') }}</h4>

          <hr class="m-0 mt-4">
          <div class="card-order">
            <div class="card-photo">
              <div class="photo" :style="{ backgroundImage: 'url(' + order.product.image + ')' }"></div>
            </div>
            <div class="card-body">
              <div class="cols info ml-0">
                <h5 class="mb-2">{{ order.product.name }}</h5>
<!--                <p class="m-0 black-50">สี : เทา</p>-->
              </div>
            </div><!--card-body-->
          </div><!--card-order-->
          <div class="d-flex py-3 justify-content-center">
            <ul class="rating-review">
              <li :class="{'active': review.star >= 1}" @click="review.star = 1"><span></span></li>
              <li :class="{'active': review.star >= 2}" @click="review.star = 2"><span></span></li>
              <li :class="{'active': review.star >= 3}" @click="review.star = 3"><span></span></li>
              <li :class="{'active': review.star >= 4}" @click="review.star = 4"><span></span></li>
              <li :class="{'active': review.star >= 5}" @click="review.star = 5"><span></span></li>
            </ul>
          </div>
          <div class="f-14">
            <div style="display: flex; justify-content: space-between; margin-top: 20px">
              <div class="box-outline-review" @click="$refs.selectedImage.click()">
                <img src="/img/icons/icon-image.svg" alt="" width="25px" height="25px">
                <span class="mt-2">{{ $t('addImage') }}</span>
              </div>

              <input type="file" class="d-none" ref="selectedImage" @input="inputImage"/>

              <div class="box-outline-review">
                <img src="/img/icons/icon-video.svg" alt="" width="25px" height="25px" style="opacity: 0.6">
                <span class="mt-2">{{ $t('addVideo') }}</span>
              </div>
            </div>

            <ul class="nav nav-upload" style="margin-top: 0px">
              <li class="done" v-for="(image, index) in review.images" :key="index">
                <div class="photo" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
                <span class="icons" @click="deleteImage(index)"></span>
              </li>
            </ul>

            <div style="margin-top: -5px">
              <textarea class="form-control kanit" :placeholder="$t('typeReviewProduct')" v-model="review.detail"></textarea>
            </div>

            <div style="margin-top: 20px">
              <div style="display: flex; justify-content: space-between">
                <h6>{{ $t('showNameReview') }}</h6>
                <span>{{ $t('show') }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                <span>{{ $t('showName') }} : {{ this.$auth.user.custId }}</span>
                <label class="switch-item xs ml-auto">
                  <input type="checkbox" checked="" v-model="review.showName">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="mb-4"></div>
          <div class="modal-footer center">
            <button class="btn btn-gray effect w-150" @click="clearField"><span>{{ $t('cancel') }}</span></button>
            <button class="btn btn-black effect w-150" data-dismiss="modal" @click="submitData"><span>{{ $t('submit') }}</span></button>
          </div>
        </div><!--modal-content-->
      </div><!--modal-content-->
    </div><!--modal-dialog-->
  </div><!--modal-alert-->
</template>

<script>
export default {
  data () {
    return {
      review: {
        star: 0,
        showName: false,
        images: [],
        listImage: [],
        detail: ''
      },
      files: []
    }
  },
  methods: {
    clearField () {
      window.location.href = '/member?status=review'
      // this.review.star = 0
      // this.review.showName = false
      // this.review.images = []
      // this.review.listImage = []
      // this.review.detail = ''

      // $('#reviewModal').modal('hide')
    },
    inputImage (e) {
      const file = e.target.files[0]
      this.review.images.push(URL.createObjectURL(file))
      this.files.push(file)
    },
    deleteImage (index) {
      this.review.images.splice(index, 1)
      this.files.splice(index, 1)
    },
    async submitData () {
      if (this.files.length !== 0) {
        for (let i=0; i<this.files.length; i++) {
          const formData = new FormData()
          formData.append('file', this.files[i], this.files[i].name)
          const image = await this.$store.dispatch('upload_file/uploadFile', formData)
          this.review.listImage.push(image.url)
        }
      }

      const payload = {
        showName: this.review.showName,
        detail: this.review.detail,
        customer: this.$auth.user._id,
        order: this.order.orderId,
        catalog: this.order.product.product,
        star: this.review.star,
        listImage: this.review.listImage
      }

      await this.$store.dispatch('review/createReview', payload)
      await this.$store.dispatch('order/fetchOrder', this.$auth.user.custId)

      this.clearField()
    }
  },
  computed: {
    order () {
      return this.$store.state.review.reviewProduct
    }
  }
}
</script>

<style scoped>

</style>
