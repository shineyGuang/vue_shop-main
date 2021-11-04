<template>
  <div class="Users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
        <el-table
          :data="userList"
          style="width: 100%"
          stripe
          border>
          <el-table-column
            prop="username"
            label="姓名"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="mg_state"
            label="状态"
            width="auto">
            <template v-slot="scope">
              <el-switch v-model="scope.row.mg_state" active-color="#13ce66"
                         inactive-color="#ff4949" @change="userStateChanged(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="auto">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="warning" icon="el-icon-delete" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-setting" size="mini"></el-button>
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
    <!--    对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      userList: [],
      queryInfo: {
        query: '',
        pagenum: 1, // 当前的页数
        pagesize: 10 // 当前每页显示多少条数据
      },
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户权限列表失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 更新用户状态
    async updateUserState(userState) {
      // await this.$http.put('/users/' + userState.id + '/state/' + userState.mg_state)
      const { data: res } = await this.$http.put(`/users/${userState.id}/state/${userState.mg_state}`)
      if (res.meta.status !== 200) {
        userState.mg_state = !userState.mg_state
        return this.$message.error('用户状态更新失败！')
      }
      return this.$message.success('用户更新状态成功！')
    },
    // 监听pageSize改变的事件
    handleSizeChange(pageSize) {
      this.queryInfo.pagesize = pageSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听用户状态改变
    userStateChanged(userState) {
      console.log(userState)
      console.log(userState.mg_state)
      this.updateUserState(userState)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  top: 10px;
  //box-shadow: 0 10px -10px #4a5064;
}

.el-pagination {
  margin-top: 15px;
}
</style>
