<template>
  <div class="downloadClient">
    <el-button type="primary" size="small" @click="dialogFormVisible=true">下载客户端</el-button>
    <el-dialog title="立即定制机器人" :visible.sync="dialogFormVisible" width="36%">
      <!--      <el-divider></el-divider>-->
      <div class="content-box">
        <el-col class="download-content"><span>下载使用本机器主要步骤</span></el-col>
        <el-col class="use-details">
          <span class="num-cir">&#9312;</span><span>如果没有下载客户端，请先下载客户端；</span><br>
          <span class="num-cir">&#9313;</span><span>下载本地机器人</span><br>
          <span class="num-cir">&#9314;</span><span>在客户端中安装并使用机器人，详见</span>
          <el-link class="num-cir">《客户机器人安装说明》</el-link>
        </el-col>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false" class="button-bottom">取消</el-button>
        <el-button type="primary" class="button-bottom" style="margin-left: 0.35rem"
                   @click="handleClose">立即下载
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'downloadClient',
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
      console.log('下载！')
      // 此处进行下载逻辑
    }
  }
}
</script>

<style scoped>
.num-cir {
  color: #66b1ff;
  margin-right: 0.04rem;
}

.content-box {
  border-top: 1px solid #E6E6E6;
  padding-left: 0.4rem;
}

.download-content {
  font-family: PingFangSC-Semibold;
  font-size: 0.13rem;
  color: #333333;
  letter-spacing: 0;
  text-align: justify;
  line-height: 0.3rem;
}

.use-details {
  font-family: PingFangSC-Regular;
  font-size: 0.12rem;
  color: #666666;
  letter-spacing: 0;
  text-align: justify;
  line-height: 0.25rem;
}

.button-bottom {
  border-radius: 0;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  height: 40%;
}

/deep/ .el-dialog__footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
