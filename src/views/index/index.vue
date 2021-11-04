<template>
  <div class="homeIndex">
    <iframe :src="indexUrl" ref="iframe" style="height: 100%;width: 100%;"></iframe>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      indexUrl: '../../../public/homeIndex/index.html'
    }
  }
}
</script>

<style scoped>

</style>
