<template>
  <div class="feed-back-dialog">
    <el-button type="primary" style="height: 0.6rem; font-size: 0.2rem; border-radius: 0" @click="dialogFormVisible=true">定制类似机器人
    </el-button>
    <!--    对话框面板-->
    <el-dialog title="立即定制机器人" :visible.sync="dialogFormVisible">
      <feedback-header></feedback-header>
      <el-form :model="form" ref="submitFeedBackRef" :rules="submitFeedBackRules" label-position="right"
               class="feed-back-form" status-icon>

        <el-form-item label="我需要的机器人属于" :label-width="formLabelWidth">
          <el-select v-model="form.category_id" placeholder="请选择类别" style="width: 100%">
            <el-option v-for="(item, index) in categoryInfo" :key="index" :label="item.category_name"
                       :value="item.category_id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="fb_phone_num">
          <el-input v-model="form.fb_phone_num" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="fb_email">
          <el-input v-model="form.fb_email" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="详细需求" :label-width="formLabelWidth" prop="require_text">
          <el-input type="textarea" v-model="form.require_text" :autosize="{ minRows: 4, maxRows: 8}"
                    :placeholder="requireDetailsEg" maxlength="500"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="9">
            <el-form-item label="预算范围" :label-width="formLabelWidth" prop="budget_low" class="budget">
              <el-input v-model="form.budget_low"><span slot="suffix">元</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="display: flex; justify-content: center;"><span style="margin-top: 20%">-</span>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="budget_high" class="budget">
              <el-input v-model="form.budget_high"><span slot="suffix">元</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="需求开发周期" label-width="130px" prop="develop_cycle">
              <el-input v-model="form.develop_cycle"><span slot="suffix">天</span></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="需求案例" :label-width="formLabelWidth" prop="require_doc">
          <upload-cpm @receiveRequireDocOssPath="getRequireDocOssPath"/>
        </el-form-item>

        <el-form-item label="场景视频" :label-width="formLabelWidth" prop="require_video">
          <upload-require-video @receiveRequireVideoOssPath="getRequireVideoOssPath"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFeedBackInfo" style="border-radius: 0">提交定制机器人需求</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import uploadCpm from '@/components/uploadCpm/uploadCpm'
import uploadRequireVideo from '@/components/uploadCpm/uploadRequireVideo'
import feedbackHeader from '@/views/Robots/components/feedbackHeader'

export default {
  name: 'feedBackDialog',
  data() {
    var checkRequireText = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (value.length <= 500) {
          console.log(value.length)
          callback()
        } else {
          callback(new Error('需求详情正文长度不能超过500'))
        }
      }
    }
    return {
      dialogFormVisible: false,
      submitFeedBackRules: {
        fb_phone_num: [
          {
            required: true,
            trigger: 'blur',
            message: '手机号必填'
          },
          {
            pattern: /^1[35789]\d{9}$/,
            message: '请输入正确手机号'
          }
        ],
        fb_email: [
          {
            required: true,
            trigger: 'blur',
            message: '邮箱必填'
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '请输入正确邮箱'
          }
        ],
        require_text: [
          {
            validator: checkRequireText,
            trigger: 'blur'
          }
        ]
      },
      form: {
        category_id: '',
        fb_phone_num: '',
        fb_email: '',
        require_text: '',
        budget_low: 0.0,
        budget_high: 0.0,
        develop_cycle: 0.0,
        require_doc: '',
        require_video: ''
      },
      formLabelWidth: '150px',
      requireDetailsEg: '填写范例-自动为获奖用户充值话费\n' +
        '1.浏览器打开活动页面\n' +
        '2.复制获奖用户用户名，并将帐号填入Excel\n' +
        '3.将获奖用户去重\n' +
        '4.查询获奖用户手机号，并将手机号填入Excel表格，与用户名一一对应\n' +
        '5.打开淘宝或话费充值网页，给获奖用户充值话费' // 文本
    }
  },
  methods: {
    submitFeedBackInfo() {
      this.$refs.submitFeedBackRef.validate(async valid => {
        if (!valid) {
          const h = this.$createElement
          this.$notify({
            title: '有必填项没有按照要求填写',
            message: h('i', { style: 'color: red' }, '请检查表单中的必填项是否按照要求填写！')
          })
        } else {
          this.$http.post('/robotFeedBack/create', this.form).then((res) => {
            console.log(res.data)
            if (res.data.statusCode === 200) {
              this.$message.success('反馈提交成功！工作人员将在3天内和您取得联系！')
              this.dialogFormVisible = false
            } else {
              this.$message.error('反馈提交失败！请致电11111111111')
            }
          })
        }
      })
    },
    getRequireDocOssPath(path) {
      // console.log(path)
      this.form.require_doc = path
    },
    getRequireVideoOssPath(path) {
      // console.log(path)
      this.form.require_video = path
    }
  },
  props: ['categoryInfo'],
  components: {
    uploadCpm,
    uploadRequireVideo,
    feedbackHeader
  }
}
</script>

<style lang="less" scoped>
.feed-back-form {
  padding: 20px;
  box-sizing: border-box;
}
</style>
