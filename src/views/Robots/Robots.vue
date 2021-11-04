<template>
  <div class="Robots">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机器人管理</el-breadcrumb-item>
      <el-breadcrumb-item>机器人列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getRobotsList">
            <el-button slot="append" icon="el-icon-search" @click="getRobotsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="goToCreate">添加机器人</el-button>
        </el-col>
        <el-table :data="robotsList" style="width: 100%" stripe border>
          <el-table-column prop="category__category_name" label="类别" width="auto"></el-table-column>
          <el-table-column prop="robot_name" label="机器人名称" width="auto"></el-table-column>
          <el-table-column prop="publisher__username" label="发布者" width="auto"></el-table-column>
          <el-table-column
            label="操作"
            width="auto"
            prop="robot_id"
          >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle
                         @click="routePush(scope.row.robot_name)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle
                         @click="deleteRobot(scope.row.robot_name)"></el-button>
              <el-button type="warning" icon="el-icon-view" size="mini" circle
                         @click="showRobot(scope.row.robot_name)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Robots',
  inject: ['reload'],
  data() {
    return {
      robotsList: [],
      queryInfo: {
        query: '',
        pageNum: 1, // 当前的页数
        pageSize: 10 // 当前每页显示多少条数据
      },
      total: 0
    }
  },
  created() {
    this.getRobotsList()
  },
  methods: {
    goToCreate() {
      this.$router.push('/manager/robot/robotCreate')
    },
    showRobot(robotName) {
      window.sessionStorage.setItem('curShowRobotName', robotName)
      this.$router.push('/manager/robot/robotShow')
    },
    deleteRobot(robotName) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/robot/delOneRobot/${robotName}`).then((res) => {
          if (res.data.statusCode === 20041) {
            this.reload()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getRobotsList() {
      this.$http.get('/robot/getAllRobot', { params: this.queryInfo }).then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.data)
          this.robotsList = res.data.data.data
          this.total = res.data.data.total
        }
      })
    },
    // 监听pageSize改变的事件
    handleSizeChange(pageSize) {
      this.queryInfo.pageSize = pageSize
      this.getRobotsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getRobotsList()
    },
    routePush(robotName) {
      window.sessionStorage.setItem('CurRobotEditName', robotName)
      this.$router.push('/manager/robot/robotEdit')
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  top: 10px;
  //box-shadow: 0 10px -10px #4a5064;
}

.el-table {
  //box-shadow: 0 1px 5px #4a5064;
}

.el-pagination {
  margin-top: 15px;
}
</style>
