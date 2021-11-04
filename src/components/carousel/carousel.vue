<template>
  <el-carousel height="450px">
    <el-carousel-item v-for="(item, index) in carousel_info" :key="index">
      <img :src="item" alt="" class="image">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'carousel',
  props: ['carousel_info']
}
</script>

<style lang="less" scoped>
.el-carousel {
  height: 100%;
  width: 100%;
}

.el-carousel__item img {
  height: 100%;
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
