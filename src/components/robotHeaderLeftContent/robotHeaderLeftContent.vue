<template>
  <div>
    <div class="content">
      <span style="color: #FFFFFF;">免费发布需求</span><br>
      <span style="color: #f7b500">享受私人订制</span>
    </div>
    <div class="orderButton">
      <el-button type="primary" style="border-radius: 2px; height: 0.5rem; width: 1.3rem; font-size: 0.18rem">订制机器人</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'robotHeaderLeftContent'
}
</script>

<style lang="less" scoped>
.content {
  //border: solid 1px red;
  width: 2.45rem;
  height: 1.1rem;
  font-family: PingFangSC-Light;
  font-size: 0.4rem;
  letter-spacing: 0;
}
.orderButton {
  margin-top: 15%;
}
</style>
