<template>
  <div>
    <el-row>
      <el-col :push="2" :span="20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name=""></el-tab-pane>
          <el-tab-pane v-for="(item, index) in categoryList" :label="item.category_name"
                       :name="item.category_id" :key="index"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'robotCategory',
  data() {
    return {
      activeName: '',
      cateQueryInfo: {
        category: '',
        pageNum: 1, // 当前的页数
        pageSize: 12 // 当前每页显示多少条数据
      },
      categoryList: [],
      robotInfo: {},
      robotData: {
        data: '',
        total: ''
      }
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    handleClick(tab, event) {
      this.cateQueryInfo.category = this.activeName
      const r = this.$http.get('robot/getAllRobotByCategory', { params: this.cateQueryInfo })
      r.then((res) => {
        this.$emit('chooseCategory', res.data)
      })
    },
    async getCategoryList() {
      const { data: res } = await this.$http.get('category/queryAll')
      this.categoryList = res.data
    }
  }
}
</script>

<style scoped>
.el-tabs /deep/ .el-tabs__item {
  font-size: 0.12rem;
}

</style>
