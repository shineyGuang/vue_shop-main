<template>
  <div>
    <el-tabs>
      <el-tab-pane label="机器人详情">
        <div class="markdown-body" v-html="singleRobotInfo.details_robot__c_html"
             style="text-align:left;width:100%;margin-bottom:50px"></div>
      </el-tab-pane>
      <el-tab-pane label="更新日志">
        <div v-if="showTable">
          <span>当前版本<span>{{ robotUpdateInfo[0].version }}</span></span><br>
          <span>发布时间：{{ robotUpdateInfo[0].update_date }}</span><br>
        </div>
        <span>关键词：{{singleRobotInfo.details_robot__keywords}}</span>
      </el-tab-pane>
      <el-tab-pane label="操作说明">
        <div class="markdown-body" v-html="singleRobotInfo.details_robot__m_html"
             style="text-align:left;width:90%;margin-bottom:50px"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'RobotDetailsTags',
  created() {
    this.robot_name = window.sessionStorage.getItem('externalCurRobotName')
    this.getRobotUpdateInfo()
  },
  mounted() {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
    document.head.appendChild(link)
  },
  data() {
    return {
      showTable: false,
      robotUpdateInfo: [],
      robot_name: ''
    }
  },
  props: ['singleRobotInfo'],
  methods: {
    async getRobotUpdateInfo() {
      const { data: res } = await this.$http.get(`/robot/getRobotUpdateInfo/${this.robot_name}`)
      if (res.statusCode === 200) {
        this.showTable = true
        this.robotUpdateInfo = res.data
        console.log(this.robotUpdateInfo)
      }
    }
  }
}
</script>

<style scoped>

</style>
