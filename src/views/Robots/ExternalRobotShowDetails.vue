<template>
  <div class="externalRobotDetails">
    <el-row>
      <el-col :span="16" :push="4">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/externalDisplay/robotShow' }">应用市场</el-breadcrumb-item>
          <el-breadcrumb-item>{{ robot_name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
          <!--APP图片-->
          <el-col :span="3" class="box-left">
            <div class="img-container">
              <el-image :src="robotObj.image" fit="contain"></el-image>
            </div>
          </el-col>
          <!--中间部分说明-->
          <el-col :span="18" class="box-medium">
            <div class="title">
              <span>{{ robotObj.robot_name }}</span>
            </div>
            <div class="info">
              <div class="title-bottom">
                <div>
                  <span>开发者: </span><span>{{ robotObj.publisher__username }}</span>
                </div>
                <div>
                  <span>类型: </span><span>{{ robotObj.category__category_name }}</span>
                </div>
                <div>
                  <span>版本: </span><span>{{ robotInfo.details_robot__cur_version }}</span>
                </div>
                <div>
                  <span>更新时间: </span><span>{{ updateTime }}</span>
                </div>
                <div>
                  <span>下载: </span><span>{{ robotObj.download_counter }}</span>
                </div>
              </div>
            </div>
          </el-col>
          <!--右边button-->
          <el-col :span="3" class="box-right">
            <!--            <el-button type="primary" style="height: 56px; font-size: 20px" @click="dialogVisible">定制类似机器人</el-button>-->
            <feedBackDialog :categoryInfo="this.categoryInfo"></feedBackDialog>
          </el-col>
        </el-row>
        <!--分割线-->
        <el-row>
          <el-col>
            <el-divider></el-divider>
          </el-col>
        </el-row>

        <div class="video-box-outer">
          <!--视频-->
          <my-video-player class="video-box" :video-url="robotInfo.details_robot__video"/>
          <!--视频右边部分-->
          <robot-info-tag :robot-info="robotInfo"></robot-info-tag>
        </div>

        <!--详情面板-->
        <el-row class="robot-tags">
          <robot-details-tags :singleRobotInfo="robotInfo"/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import RobotDetailsTags from '@/components/robotDetailsTags/RobotDetailsTags'
import MyVideoPlayer from '@/components/MyVideoPlayer/MyVideoPlayer'
import RobotInfoTag from '@/views/Robots/components/RobotInfoTag'
import feedBackDialog from '@/views/Robots/components/feedBackDialog'

export default {
  name: 'ExternalRobotShowDetails',
  mounted() {
    this.getRobotInfo()
    this.getRobotUpdateInfo()
  },
  created() {
    this.robotObj = JSON.parse(window.sessionStorage.getItem('externalCurRobotObj'))
    this.robot_name = window.sessionStorage.getItem('externalCurRobotName')
    this.robot_id = window.sessionStorage.getItem('externalCurRobotId')
    this.getCategoryInfo()
  },
  data() {
    return {
      robotObj: null,
      robot_id: '',
      robot_name: '',
      robotInfo: '',
      updateTime: '',
      robotUpdateInfo: [],
      showTable: false,
      dialogVisible: false,
      categoryInfo: ''
    }
  },
  methods: {
    getRobotInfo() {
      this.$http.get(`/robot/getOneRobotById/${this.robot_id}`).then((res) => {
        this.robotInfo = res.data.data
      })
    },
    getRobotUpdateInfo() {
      this.$http.get(`/robot/getRobotUpdateInfo/${this.robotName}`).then((res) => {
        if (res.statusCode === 200) {
          this.showTable = true
          this.robotUpdateInfo = res.data.data
          // console.log(this.robotUpdateInfo)
          this.updateTime = res.data.data[0].update_date.slice(0, 10)
        } else {
          this.updateTime = this.robotInfo.modified_at
        }
      })
    },
    async getCategoryInfo() {
      const { data: res } = await this.$http.get('/category/queryAll')
      if (res.statusCode === 200) {
        this.categoryInfo = res.data
      }
    }
  },
  components: {
    RobotInfoTag,
    RobotDetailsTags,
    MyVideoPlayer,
    feedBackDialog
  }
}
</script>

<style lang="less" scoped>
.box-left {
  width: 0.8rem;
  height: 0.8rem;

  .img-container {
    margin-top: 0.1rem;
  }
}

.box-medium {
  .title {
    font-size: 0.3rem;
  }

  .info {
    .title-bottom {
      font-family: PingFangSC-Regular;
      font-size: 0.11rem;
      color: #999999;
      letter-spacing: 0;
      text-align: justify;
      position: absolute;
      bottom: 0.03rem;
      //border: solid 1px yellow;
      display: flex;
      justify-content: space-around;

      > div {
        margin-right: 0.2rem;
      }
    }
  }
}

.robot-tags {
  margin-top: 0.8rem;
}

.video-box-outer {
  .video-box {
    height: 70%;
    width: 70%;
  }

  display: flex;
}

.video {
  margin-top: 0.13rem;
}
</style>
