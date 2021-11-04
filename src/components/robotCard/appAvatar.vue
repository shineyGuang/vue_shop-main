<template>
  <div>
    <el-avatar :src="robotSingleInfo.image" shape="square" :size="50"></el-avatar>
  </div>
</template>

<script>
export default {
  name: 'appAvatar',
  props: ['robotSingleInfo']
}
</script>

<style lang="less" scoped>

</style>
