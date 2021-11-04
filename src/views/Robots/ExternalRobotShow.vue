<template>
  <div style="overflow: hidden">

    <el-row>
      <!--应用市场大图-->
      <el-col class="headerBox">
        <el-image :src="headImage" fit="contain" style="width: 100%; height: 100%"></el-image>
        <div id="head-circle">
          <robot-header-pic style="margin-top: 0.5rem"></robot-header-pic>
        </div>
        <div id="head-content">
          <robotHeaderLeftContent></robotHeaderLeftContent>
        </div>
      </el-col>
      <!--搜索框-->
      <el-col :span="12" :push="6">
        <el-input placeholder="请输入机器人名称" v-model="pageQueryInfo.query" clearable @clear="getRobotInfo"
                  @blur="getRobotInfo" class="key-in-rname">
          <el-button slot="append" icon="el-icon-search" @click="getRobotInfo" type="primary"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20" :push="2">
        <!--分割线-->
        <robot-category @chooseCategory="chooseCategory"></robot-category>
        <el-col :xs="{span:20}" :sm="{span:6}" :lg="{span:6}" :xl="{span:6}"
                v-for="(item, index) in this.robot_data"
                :key="index">
          <robotCard :robot-single-info="item" class="robot-card"></robotCard>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageQueryInfo.pagenum"
          :page-sizes="[12, 8, 4, 1]"
          :page-size="pageQueryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import robotCard from '@/components/robotCard/robotCard'
import robotCategory from '@/components/robotCategory/robotCategory'
import headImg from '@/assets/carousel_pic/位图.png'
import headCircleImg from '@/assets/carousel_pic/编组 27.png'
import robotHeaderPic from '@/components/robotHeaderPic/robotHeaderPic'
import robotHeaderLeftContent from '@/components/robotHeaderLeftContent/robotHeaderLeftContent'

export default {
  name: 'ExternalRobotShow',
  data() {
    return {
      headCircle: headCircleImg,
      headImage: headImg,
      categoryList: [],
      isClick: false,
      robot_data: [],
      pageQueryInfo: {
        query: '',
        pageNum: 1, // 当前的页数
        pageSize: 12 // 当前每页显示多少条数据
      },
      cateQueryInfo: {
        category: '',
        pageNum: 1, // 当前的页数
        pageSize: 12 // 当前每页显示多少条数据
      },
      total: 0
    }
  },
  created() {
    this.getRobotInfo()
  },
  methods: {
    chooseCategory(val) {
      this.robot_data = val.data.data
      this.total = val.data.total
    },
    async getRobotInfo() {
      const { data: res } = await this.$http.get('robot/getAllRobot', { params: this.pageQueryInfo })
      if (res.statusCode === 40001) {
        return
      }
      this.robot_data = res.data.data
      this.total = res.data.total
      // console.log(this.robot_data)
    },
    // 监听pageSize改变的事件
    handleSizeChange(pageSize) {
      this.pageQueryInfo.pageSize = pageSize
      this.getRobotInfo()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.pageQueryInfo.pageNum = newPage
      this.getRobotInfo()
    }
  },
  components: {
    robotCard, // 机器人卡片
    robotCategory, // 机器人类别
    robotHeaderPic, // header右侧动图
    robotHeaderLeftContent // header左侧文本
  }
}
</script>

<style lang="less" scoped>
.headerBox {
  #head-circle {
    margin-top: 2.2%;
    width: 50%;
    height: 80%;
    //border: solid 1px red;
    position: absolute;
    top: 0;
    left: 40%;

    .gif-pic {
      width: 100%;
      height: 100%;
    }
  }

  #head-content {
    position: absolute;
    top: 15%;
    left: 21.4%;
  }
}

.robot-card {
  margin-top: 10px;
}

.el-pagination {
  display: flex;
  justify-content: center;
}

.dividerCpn {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.el-input {
  margin-top: 30px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.key-in-rname /deep/ .el-input__inner {
  height: 0.4rem;
  font-size: 0.12rem;
}

</style>
