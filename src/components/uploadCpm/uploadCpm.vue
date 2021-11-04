<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      ref="myUpload"
      :action="requireDocUploadUrl"
      :show-file-list="true"
      :on-success="handleRequireDocSuccess"
      :before-upload="beforeRequireDocUpload"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :limit="1">
      <el-button size="medium" type="primary" :disabled="clickable" style="border-radius: 0">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ requireDocText }}</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'uploadCpm',
  data() {
    return {
      requireDocText: '为了更好的解决您的问题，希望按模版格式描述需求，收到需求后，我们会第一时间联系您。仅支持上传XLS、PPT格式，大小不超过35M。',
      clickable: false,
      fileFlag: false,
      fileUploadPercent: 0,
      requireDocUploadUrl: 'http://127.0.0.1:8000/api/v1/file/fileUploadRequireDoc',
      requireDocOssPath: '',
      fileList: []
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    // 上传之后清除文件列表
    clearFiles() {
      this.$refs.myUpload.clearFiles()
    },
    // 上传文件成功返回的钩子
    handleRequireDocSuccess(res, file) {
      // console.log(res)
      if (res.statusCode === 200) {
        this.requireDocOssPath = res.data.requireDocOssPath
        this.fileList.push({
          name: file.name,
          url: file.response.data.requireDocOssPath
        })
        this.$emit('receiveRequireDocOssPath', this.requireDocOssPath)
      } else {
        this.$message.error('文件上传失败！')
        this.clearFiles()
      }
    },
    // // 进度条
    // uploadRequireDocProcess(event, file, fileList) {
    //   console.log(file)
    //   this.fileFlag = true
    //   this.fileUploadPercent = file.percent.toFixed(0) * 1
    // },
    beforeRequireDocUpload(file) {
      const isFile = (['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'].indexOf(file.type) !== -1)
      const isLt35M = file.size / 1024 / 1024 < 35
      if (!isFile) {
        this.$message.error('请上传正确格式的文件')
      }
      if (!isLt35M) {
        this.$message.error('上传文件大小不能超过35M')
      }
      return isFile && isLt35M
    }
  }
}
</script>

<style scoped>

</style>
