<template>
  <div class="RobotShow">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机器人管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manager/robot/robotList'}">机器人列表</el-breadcrumb-item>
      <el-breadcrumb-item>机器人详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="2" class="title-left">
          <el-image v-if="robotInfo.image" :src="robotInfo.image" fit="contain"></el-image>
          <div v-else class="demo-image__error">
            <div class="block">
              <span class="demonstration">自定义</span>
              <el-image fit="contain" style="width: 100%; height: 100%;">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
        </el-col>
        <el-col :span="13" class="title-medium">
          <div class="title">
            <span>{{ robotName }}</span>
          </div>
          <div class="title-bottom">
            <div>
              <span>开发者: </span><span>{{ robotInfo.publisher__username }}</span>
            </div>
            <div>
              <span>类型: </span><span>{{ robotInfo.category__category_name }}</span>
            </div>
            <div>
              <span>版本: </span><span>{{ robotInfo.details_robot__cur_version }}</span>
            </div>
            <div>
              <span>更新时间: </span><span>{{ updateTime }}</span>
            </div>
            <div>
              <span>下载: </span><span>{{ robotInfo.download_counter }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="video" :gutter="20">
        <el-col :span="15">
          <!--          <video :src="robotInfo.details_robot__video" controls autoplay class="video" width="100%"></video>-->
          <my-video-player class="my-video-player" :videoUrl="robotInfo.details_robot__video"/>
        </el-col>
        <el-col :span="6">
          <div class="rate-content">
            <el-divider content-position="left"><span style="font-size: 20px">机器人评分</span></el-divider>
            <el-row type="flex">
              <el-col :span="8" class="robot-rate" justify="space-between">
                <div>
                  <span style="font-size: 60px;">{{ robotInfo.rate }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <el-rate
                  v-model="robotInfo.rate"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs type="border-card" style="height: 100%;">
      <el-tab-pane label="机器人文案">
        <el-row class="robot-content">
          <el-col :span="15">
            <div class="markdown-body" v-html="robotInfo.details_robot__c_html"
                 style="text-align:left;width:90%;margin-bottom:50px"></div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="操作说明">
        <el-row class="robot-readMe">
          <el-col :span="15">
            <div class="markdown-body" v-html="robotInfo.details_robot__m_html"
                 style="text-align:left;width:90%;margin-bottom:50px"></div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="更新日志">
        <el-col :span="15">
          <div v-if="showTable">
            <span>当前版本<span>{{ robotUpdateInfo[0].version }}</span></span><br>
            <span>发布时间：{{ robotUpdateInfo[0].update_date }}</span><br>
          </div>
          <span>关键词：{{robotInfo.details_robot__keywords}}</span>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyVideoPlayer from '@/components/MyVideoPlayer/MyVideoPlayer'

export default {
  name: 'RobotShow',
  created() {
    this.robotName = window.sessionStorage.getItem('curShowRobotName')
    this.getRobotDetails()
    this.getRobotUpdateInfo()
  },
  mounted() {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
    document.head.appendChild(link)
  },
  methods: {
    async getRobotDetails() {
      const { data: res } = await this.$http.get(`/robot/getOneRobot/${this.robotName}`)
      if (res.statusCode === 200) {
        this.robotInfo = res.data[0]
      } else {
        this.$message.error('无查询数据！')
      }
    },
    async getRobotUpdateInfo() {
      const { data: res } = await this.$http.get(`/robot/getRobotUpdateInfo/${this.robotName}`)
      if (res.statusCode === 200) {
        this.showTable = true
        this.robotUpdateInfo = res.data
        this.updateTime = res.data[0].update_date.slice(0, 10)
      } else {
        this.updateTime = this.robotInfo.modified_at
      }
    }
  },
  data() {
    return {
      robotName: '',
      robotInfo: '',
      robotUpdateInfo: [],
      updateTime: '',
      showTable: false
    }
  },
  components: {
    MyVideoPlayer
  }
}
</script>

<style lang="less" scoped>
.title {
  //border: solid 1px green;
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #333333;
  letter-spacing: 0;
  text-align: justify;
  margin-top: 5px;
}

.title-bottom {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
  text-align: justify;
  position: absolute;
  bottom: 5px;
  //border: solid 1px yellow;
  display: flex;
  justify-content: space-around;

  > div {
    margin-right: 20px;
  }
}

.robot-rate {
  display: flex;
}

.title-right {
  .button {
    //border: solid 1px red;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translate(0, 50%);

    .el-button {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
    }
  }
}

.video {
  margin-top: 20px;
}

.el-card {
  margin-top: 20px;
}

.robot-content {
  margin-top: 20px;
}

.el-rate {
  margin-top: 10%;
}

.el-tabs {
  margin-top: 20px;
}

</style>
