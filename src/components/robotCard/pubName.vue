<template>
  <div class="pubNameCpn">
    <span class="pub">{{ robotSingleInfo.publisher__username }}</span>
  </div>
</template>

<script>
export default {
  name: 'pubName',
  props: ['robotSingleInfo']
}
</script>

<style lang="less" scoped>
.pubNameCpn {
  margin-top: 0.05rem;
  font-size: 0.09rem;
}
</style>
