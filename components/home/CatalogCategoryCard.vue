<template>
  <div class="col-lg-3 col-md-4 col-6">
    <div class="card-gadget-type" :style="{ backgroundColor: backgroundColor }">
      <a v-if="name" class="card-link" :href="`/product/?subname=${name}&subid=${id}`"></a>
      <div class="card-photo">
        <div class="photo" :style="{ backgroundImage: 'url(' + data.cover + ')' }">
          <img src="/img/thumb/frame-100x100.png" alt="" />
        </div>
      </div>
      <h2 class="card-title">
        <span>{{ name ? name : '-'}}</span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object }
  },
  data () {
    return {
      backgroundColor: '#e0afab',
      name: this.data.subCategory ? this.data.subCategory.productGroupName : null,
      id: this.data.subCategory ? this.data.subCategory._id : null
    }
  }
}
</script>
