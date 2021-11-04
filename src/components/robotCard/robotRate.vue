<template>
  <div>
    <el-rate
      v-model="robotSingleInfo.rate"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}"
    >
    </el-rate>
  </div>
</template>

<script>
export default {
  name: 'robotRate',
  props: ['robotSingleInfo']
}
</script>

<style lang="less" scoped>
.el-rate {
  margin-top: 0.1rem;

  /deep/ .el-rate__icon {
    font-size: 0.13rem;
  }

  /deep/ .el-rate__text {
    font-size: 0.13rem;
  }
}
</style>
