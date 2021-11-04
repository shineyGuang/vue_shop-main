<template>
  <div class="pubAvatarCpn">
    <el-avatar :src="robotSingleInfo.publisher__avatar" :size="24"></el-avatar>
  </div>
</template>

<script>
export default {
  name: 'pubAvatar',
  props: ['robotSingleInfo']
}
</script>

<style lang="less" scoped>
.pubAvatarCpn {
  .el-avatar {
  }
}

</style>
