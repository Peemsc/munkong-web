<template>
  <div id="myReviewModal" class="modal modal-alert review fade">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <div class="modal-content p-0">
          <h4 class="modal-title">{{ $t('myReview') }}</h4>

          <hr class="m-0 mt-4">
          <div class="card-order">
            <div class="card-photo">
              <div class="photo" :style="{ backgroundImage: 'url(' + order.image + ')' }"></div>
            </div>
            <div class="card-body">
              <div class="cols info ml-0">
                <h5 class="mb-2">{{ order.name }}</h5>
                <p class="m-0 black-50">{{ order.option.name }} : {{ order.option.attribute }}</p>
              </div>
            </div><!--card-body-->
          </div><!--card-order-->
          <div class="d-flex py-3 justify-content-center">
            <ul class="rating-review">
              <li :class="{'active': order.review.star >= 1}"><span></span></li>
              <li :class="{'active': order.review.star >= 2}"><span></span></li>
              <li :class="{'active': order.review.star >= 3}"><span></span></li>
              <li :class="{'active': order.review.star >= 4}"><span></span></li>
              <li :class="{'active': order.review.star >= 5}"><span></span></li>
            </ul>
          </div>
          <div class="f-14">

            <ul class="nav nav-upload" style="margin-top: 0px">
              <li class="done" v-for="(image, index) in order.review.listImage" :key="index">
                <div class="photo" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
              </li>
            </ul>

            <div style="margin-top: -5px">
              <textarea class="form-control kanit" v-model="order.review.detail" readonly></textarea>
            </div>
          </div>

          <div class="mb-4"></div>
          <div class="modal-footer center">
            <button class="btn btn-gray effect w-150" data-dismiss="modal" @click="clearField"><span>{{ $t('cancel') }}</span></button>
<!--            <button class="btn btn-black effect w-150" data-dismiss="modal" @click="submitData"><span>{{ $t('submit') }}</span></button>-->
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
      this.review.star = 0
      this.review.showName = false
      this.review.image = []
      this.review.detail = ''
    },
    // inputImage (e) {
    //   const file = e.target.files[0]
    //   this.review.images.push(URL.createObjectURL(file))
    //   this.files.push(file)
    // },
    // deleteImage (index) {
    //   this.review.images.splice(index, 1)
    //   this.files.splice(index, 1)
    // },
    // async submitData () {
    //   if (this.files.length !== 0) {
    //     for (let i=0; i<this.files.length; i++) {
    //       const formData = new FormData()
    //       formData.append('file', this.files[i], this.files[i].name)
    //       const image = await this.$store.dispatch('upload_file/uploadFile', formData)
    //       this.review.listImage.push(image.url)
    //     }
    //   }
    //
    //   const payload = {
    //     showName: this.review.showName,
    //     detail: this.review.detail,
    //     customer: this.$auth.user._id,
    //     order: this.order.orderId,
    //     catalog: this.order.product.product,
    //     star: this.review.star,
    //     listImage: this.review.listImage
    //   }
    //
    //   await this.$store.dispatch('review/createReview', payload)
    //   await this.$store.dispatch('order/fetchOrder', this.$auth.user.custId)
    //
    //   this.clearField()
    // }
  },
  computed: {
    order () {
      return this.$store.state.review.myReview
    }
  }
}
</script>

<style scoped>

</style>
