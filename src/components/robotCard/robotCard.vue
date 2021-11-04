<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click.native="toRobtShowDetails(robotSingleInfo)">
      <!--卡片上半部分-->
      <el-row :gutter="30" class="upPartial">
        <el-col :span="6" class="upPartial-left" :push="2">
          <div class="avatar">
            <appAvatar :robot-single-info="robotSingleInfo"></appAvatar>
          </div>
        </el-col>
        <el-col :span="18" class="upPartial-right" :push="1">
            <el-col>
              <robotName :robot-single-info="robotSingleInfo"></robotName>
            </el-col>
            <el-col>
              <robotRate :robot-single-info="robotSingleInfo"></robotRate>
            </el-col>
        </el-col>
      </el-row>
      <!--卡片下半部分-->
      <el-row :gutter="20" class="bottomPartial">
        <el-col :span="4" :push="2">
          <pubAvatar :robot-single-info="robotSingleInfo" class="pubAvatar"></pubAvatar>
        </el-col>
        <el-col :span="8" :push="2">
          <pubName :robot-single-info="robotSingleInfo"></pubName>
        </el-col>
        <el-col :span="8" :push="2">
          <downLoadCounter :robot-single-info="robotSingleInfo"></downLoadCounter>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import appAvatar from '@/components/robotCard/appAvatar'
import robotName from '@/components/robotCard/robotName'
import robotRate from '@/components/robotCard/robotRate'
import pubAvatar from '@/components/robotCard/pubAvatar'
import pubName from '@/components/robotCard/pubName'
import downLoadCounter from '@/components/robotCard/downLoadCounter'

export default {
  name: 'robotCard',
  props: ['robotSingleInfo'],
  methods: {
    // 点击跳转到详情
    toRobtShowDetails(item) {
      console.log(item)
      window.sessionStorage.setItem('externalCurRobotObj', JSON.stringify(item))
      window.sessionStorage.setItem('externalCurRobotName', item.robot_name)
      window.sessionStorage.setItem('externalCurRobotId', item.robot_id)
      this.$router.push('/externalDisplay/robotShowDetails')
    }
  },
  components: {
    appAvatar,
    robotName,
    robotRate,
    pubAvatar,
    pubName,
    downLoadCounter
  }
}
</script>

<style lang="less" scoped>
.pubAvatar {
  margin-top: 0.02rem;
}
.upPartial {
  //display: flex;
  //align-items: center;
  margin-top: 10px;
}

.bottomPartial {
  background-color: #fbfbfb;
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
}

.el-card {
  cursor: pointer;
}
</style>
