<template>
  <div class="downLoadCounterCpn">
    <span id="counter">{{ robotSingleInfo.download_counter }}</span><span>人在用</span>
  </div>
</template>

<script>
export default {
  name: 'downLoadCounter',
  props: ['robotSingleInfo']
}
</script>

<style lang="less" scoped>
.downLoadCounterCpn {
  margin-top: 0.05rem;
  font-size: 0.09rem;
}
</style>
