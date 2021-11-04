<template>
  <div style="margin-left: 5%">
    <el-row>
      <!--            机器人分割线-->
      <el-col>
        <el-divider content-position="left"><span style="font-size: 0.2rem">机器人评分</span></el-divider>
      </el-col>
      <!--            机器人评分-->
      <el-col :span="24" class="rate-box">
        <div class="rate-number">
          <span>{{ robotInfo.rate * 2 }}</span>
        </div>
        <div class="rate-pic">
          <el-rate v-model="robotInfo.rate"
                   disabled
                   text-color="#ff9900"
                   score-template="{value}">
          </el-rate>
          <div class="rate-pic-text">
            <span>有<span>{{ robotInfo.download_counter }}</span>人评价</span>
          </div>
        </div>
      </el-col>
      <!--            星级评分条-->
      <el-col>
        <rate-group/>
      </el-col>
      <!--            机器人关键词分割线-->
      <el-col>
        <el-divider content-position="left"><span style="font-size: 0.2rem">机器人关键词</span></el-divider>
      </el-col>
      <el-col>
        <span v-if="robotInfo.details_robot__keywords" style="font-size: 0.15rem">{{
            robotInfo.details_robot__keywords
          }}</span>
        <span v-else style="font-size: 0.15rem">暂无关键词</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RateGroup from '@/components/RateGroup/RateGroup'

export default {
  name: 'RobotInfoTag',
  props: ['robotInfo'],
  components: {
    RateGroup
  }
}
</script>

<style lang="less" scoped>
.rate-box {
  .rate-number {
    font-size: 0.6rem;
  }

  .rate-pic {
    margin-top: 0.12rem;
    margin-left: 0.05rem;

    .rate-pic-text {
      margin-top: 0.05rem;
    }
  }

  display: flex;
  justify-content: space-evenly;
}
</style>
