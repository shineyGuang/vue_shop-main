<template>
  <div class="robotNameCpn">
    <span>{{ robotSingleInfo.robot_name }}</span>
  </div>
</template>

<script>
export default {
  name: 'robotName',
  props: ['robotSingleInfo']
}
</script>

<style lang="less" scoped>
.robotNameCpn {
  font-size: 0.12rem;
}
</style>
