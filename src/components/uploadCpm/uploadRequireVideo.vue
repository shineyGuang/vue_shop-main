<template>
  <div class="uploadRequireVideo">
    <el-upload
      class="upload-require-video"
      ref="myVideoUpload"
      :action="requireVideoUploadUrl"
      :show-file-list="true"
      :on-success="handleRequireVideoSuccess"
      :before-upload="beforeRequireVideoUpload"
      :file-list="fileList"
      :limit="1">
      <el-button size="medium" type="primary" style="border-radius: 0">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ requireVideoText }}</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'uploadRequireVideo',
  data() {
    return {
      fileList: [],
      requireVideoUploadUrl: 'http://127.0.0.1:8000/api/v1/file/fileUploadVideo-noAuth',
      fileUploadPercent: 0,
      requireVideoText: '上传实际工作场景流程有助于开发理解您的需求。仅支持MP4、MOV格式，大小不超过35M。',
      requireVideoOssPath: ''
    }
  },
  methods: {
    // 上传之后清除文件列表
    clearFiles() {
      this.$refs.myVideoUpload.clearFiles()
    },
    handleRequireVideoSuccess(res, file) {
      // console.log(res)
      if (res.statusCode === 200) {
        this.requireVideoOssPath = res.data.videoOssPath
        this.fileList.push({
          name: file.name,
          url: file.response.data.requireVideoOssPath
        })
        this.$emit('receiveRequireVideoOssPath', this.requireVideoOssPath)
      } else {
        this.$message.error('视频上传失败！')
        this.clearFiles()
      }
    },
    beforeRequireVideoUpload(file) {
      const isVideo = (['video/mp4', 'video/mov'].indexOf(file.type) !== -1)
      const isLt1GB = file.size / 1024 / 1024 < 35
      if (!isVideo) {
        this.$message.error('请上传正确格式的视频文件')
      }
      if (!isLt1GB) {
        this.$message.error('上传视频大小不能超过35M')
      }
      return isVideo && isLt1GB
    }
  }
}
</script>

<style scoped>

</style>
