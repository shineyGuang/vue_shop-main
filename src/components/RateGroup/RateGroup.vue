<template>
  <div class="rate-info">
    <div class="rate-group">
      <span>5星</span>
      <el-progress :percentage="67"
                   :format="format"
                   color="#F7B500"></el-progress>
    </div>
    <div class="rate-group">
      <span>4星</span>
      <el-progress :percentage="28"
                   :format="format"
                   color="#F7B500"></el-progress>
    </div>
    <div class="rate-group">
      <span>3星</span>
      <el-progress :percentage="12"
                   :format="format"
                   color="#F7B500"></el-progress>
    </div>
    <div class="rate-group">
      <span>2星</span>
      <el-progress :percentage="2"
                   :format="format"
                   color="#F7B500"></el-progress>
    </div>
    <div class="rate-group">
      <span>1星</span>
      <el-progress :percentage="1"
                   :format="format"
                   color="#F7B500"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RateGroup',
  methods: {
    format(percentage) {
      return `${percentage}%`
    }
  }
}
</script>

<style lang="less" scoped>
.rate-info {
  margin-bottom: 20px;

  .rate-group {
    display: flex;
    justify-content: space-evenly;
    color: #F7B500;

    .el-progress {
      width: 80%;

      .el-progress__text {
        color: #F7B500;
      }
    }
  }
}

</style>
