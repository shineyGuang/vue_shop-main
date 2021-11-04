<template>
  <el-container>
    <!--    顶部导航栏-->
    <el-header>
      <div>
        <el-image :src="headerImgUrl" alt=""/>
        <span>苏宁RPA机器人</span>
      </div>
      <div class="content">
        <div>
          <el-link :underline="false" style="color: #EAEAEA" :href="returnToIndex">首页</el-link>
        </div>
        <div>
          <el-link :underline="false" style="color: #EAEAEA" :href="homeUrl">应用市场</el-link>
        </div>
      </div>
      <div class="download-client">
        <download-client></download-client>
      </div>
    </el-header>
    <!--    内容区域-->
    <el-main>
      <router-view/>
    </el-main>
    <el-footer height="60px">
      <el-col :span="24" class="footer-up">
        <el-col :span="6" :push="10">
          <span><i class="el-icon-phone-outline"></i>025-66996699</span>
        </el-col>
        <el-col :span="6" :push="6">
          <span><i class="el-icon-message"></i>rpa@suning.com</span>
        </el-col>
      </el-col>
      <div class="footer-down">
        <span>Copyright© 2002-2018，苏宁易购集团股份有限公司版权所有| 苏公网安备 32010202010078号| 苏ICP备10207551号-4</span><br>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import logo from '../../assets/机器头.png'
import downloadClient from '@/components/downloadClientDialog/downloadClient'

export default {
  name: 'Home2',
  data() {
    return {
      headerImgUrl: logo,
      homeUrl: 'http://127.0.0.1:8080/externalDisplay/robotShow',
      returnToIndex: 'http://127.0.0.1:8080/snRobotRPA/index'
    }
  },
  components: {
    downloadClient
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  .el-header {
    font-size: 0.15rem;
    padding-left: 0;
    display: flex;
    justify-content: space-evenly;
    background-color: #0A2145;
    color: #FFFFFF;

    .content {
      display: flex;
      //justify-content: space-between;

      > div {
        margin: 0 30px 0 30px;
      }

      span {
        font-size: 0.12rem;
      }
    }

    > div {
      display: flex;
      align-items: center;
      height: 100%;
    }

    img {
      height: 100%;
    }

    span {
      margin-left: 0.09rem;
    }
  }

  .el-footer {
    background-color: #F1F1F1;;
    color: #666666;
    font-size: 0.1rem;

    .footer-up {
      margin-top: 0.08rem;
    }

    .footer-down {
      margin-top: 0.21rem;
      text-align: center;
    }
  }
}

</style>
