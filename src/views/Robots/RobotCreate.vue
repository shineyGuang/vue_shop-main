<template>
  <div class="RobotCreate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机器人管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manager/robot/robotList'}">机器人列表</el-breadcrumb-item>
      <el-breadcrumb-item>创建机器人</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="robot-card">
      <div slot="header" class="clearfix">
        <span id="robot-name">创建新机器人</span>
        <el-button style="float: right; padding: 3px 0" type="success" :disabled="clickable" @click="submitEditRobot">
          确认创建
        </el-button>
      </div>
      <el-form label-position="left" ref="createRobotFormRef" status-icon :model="form" :rules="createRobotFormRules">
        <el-row :gutter="20">
          <el-col :span="20">
            <!--机器人名称填写框-->
            <el-form-item prop="robot_name" label="机器人名称">
              <el-col :span="8">
                <el-input v-model="form.robot_name" placeholder="请输入机器人名称" clearable></el-input>
              </el-col>
            </el-form-item>
            <!--机器人类别选择框-->
            <el-form-item prop="category_id" label="机器人类别">
              <el-col :span="8">
                <el-select v-model="form.category_id" placeholder="请选择机器人类别">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <!--机器人评分-->
            <el-form-item prop="rate" label="机器人评分">
              <el-col :span="8">
                <el-input v-model="form.rate" placeholder="请输入机器人评分" clearable></el-input>
              </el-col>
            </el-form-item>
            <!--机器人版本-->
            <el-form-item prop="cur_version" label="发布版本号">
              <el-col :span="8">
                <el-input v-model="form.cur_version" placeholder="请输入当前机器人版本号" clearable></el-input>
              </el-col>
            </el-form-item>
            <!--机器人下载次数-->
            <el-form-item prop="download_counter" label="修改下载量">
              <el-col :span="8">
                <el-input v-model="form.download_counter" placeholder="请输入下载次数" clearable></el-input>
              </el-col>
            </el-form-item>
            <!--机器人发布者展示-->
            <el-form-item prop="publisher_id" label="发布者工号">
              <el-col :span="4">
                <el-input v-model="form.publisher_id" placeholder="请输入发布者工号" clearable @blur="getPubName"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input v-model="publisherName" disabled readonly></el-input>
              </el-col>
            </el-form-item>
            <!--机器人关键词-->
            <el-form-item prop="keywords" label="发布关键词">
              <el-col :span="8">
                <el-input v-model="form.keywords" placeholder="请输入关键词(多个关键词用英文逗号链接)"></el-input>
              </el-col>
            </el-form-item>
            <!--机器人图片展示-->
            <el-form-item prop="image" label="机器人APP图片上传">
              <el-col>
                <el-input v-model="form.image" readonly disabled></el-input>
              </el-col>
            </el-form-item>
            <el-row>
              <el-col :span="10" class="upload-box">
                <div class="image">
                  <el-image id="robotImg" :src="form.image" fit="fit"></el-image>
                </div>
                <el-upload
                  ref="createImgUpload"
                  class="upload-demo"
                  :action=robotImgUploadUrl
                  :headers="tokenAuth"
                  :show-file-list="false"
                  :on-success="handleRobotImgSuccess"
                  :before-upload="beforeRobotImgUpload"
                  drag
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-col>
            </el-row>
            <!--机器人视频上传-->
            <el-form-item prop="video" label="机器人视频上传">
              <el-col>
                <el-input v-model="form.video" readonly disabled></el-input>
              </el-col>
            </el-form-item>
            <el-row>
              <el-col :span="10" class="upload-box">
                <video class="video" :src="this.form.video"></video>
                <!--                <my-video-player class="video" :video-url="this.form.video"></my-video-player>-->
                <el-upload
                  ref="createVideoUpload"
                  class="upload-demo"
                  :action=robotVideoUploadUrl
                  :headers="tokenAuth"
                  :show-file-list="false"
                  :on-success="handleRobotVideoSuccess"
                  :on-progress="uploadVideoProcess"
                  :before-upload="beforeRobotVideoUpload"
                  drag
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <el-progress v-if="videoFlag === true"
                               :text-inside="true"
                               :stroke-width="24"
                               :percentage="videoUploadPercent"
                               style="margin-top:7px;"></el-progress>
                </el-upload>
              </el-col>
            </el-row>
            <!--机器人文案-->
            <el-form-item prop="content" label="机器人文案">
              <el-col :span="24">
                <mavon-editor :ishljs="true" ref=md @imgAdd="$imgAdd" @change="change_content" v-model="form.content"/>
              </el-col>
            </el-form-item>
            <!--机器人操作手册-->
            <el-form-item prop="manual" label="机器人操作手册">
              <el-col :span="24">
                <mavon-editor :ishljs="true" ref=md @imgAdd="$imgAdd" @change="change_manual" v-model="form.manual"/>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import MyVideoPlayer from '@/components/MyVideoPlayer/MyVideoPlayer'

export default {
  name: 'RobotCreate',
  data() {
    var checkRate = (rule, value, callback) => {
      if (value > 5) {
        return callback(new Error('评分不能大于5分'))
      } else {
        callback()
      }
    }
    return {
      clickable: false,
      videoFlag: false,
      videoUploadPercent: '',
      tokenAuth: { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') },
      robotImgUploadUrl: 'http://127.0.0.1:8000/api/v1/file/fileUploadAppImg',
      robotVideoUploadUrl: 'http://127.0.0.1:8000/api/v1/file/fileUploadVideo',
      categoryList: [],
      robotName: '',
      publisherName: '',
      form: { // 用于提交
        robot_name: '',
        download_counter: '',
        cur_version: '',
        image: '',
        video: '',
        rate: '',
        category_id: '',
        publisher_id: '',
        c_html: '',
        content: '',
        manual: '',
        m_html: '',
        keywords: ''
      },
      createRobotFormRules: {
        robot_name: [
          {
            required: true,
            message: '请输入机器人名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字符',
            trigger: 'blur'
          }
        ],
        category_id: [
          {
            required: true,
            message: '请选择机器人分类',
            trigger: 'blur'
          }
        ],
        rate: [
          {
            validator: checkRate,
            trigger: 'blur'
          },
          {
            required: true,
            message: '请输入机器人评分',
            trigger: 'blur'
          },
          {
            pattern: /(^[1-4]?(\.[0-9])?$)|5?(\.0)?$/,
            message: '请输入正确格式,可保留 1 位小数'
          }
        ],
        cur_version: [
          {
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          },
          {
            pattern: /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]|(\.)*$/i,
            message: '只能是数字和字母的组合'
          }
        ],
        download_counter: [
          {
            required: true,
            message: '请输入下载次数',
            trigger: 'blur'
          },
          {
            pattern: /^([0-9]+$)/,
            message: '只能填写数字'
          }
        ],
        publisher_id: [
          {
            required: true,
            message: '请输入工号'
          },
          {
            pattern: /^([0-9]{8}$)/,
            message: '只能填写8位工号'
          }
        ],
        image: [
          {
            required: true,
            message: '请上传机器人APP图片'
          }
        ],
        video: [
          {
            required: true,
            message: '请上传机器人展示视频'
          }
        ],
        content: [
          {
            required: true,
            message: '文案不能为空'
          }
        ],
        manual: [
          {
            required: true,
            message: '操作手册内容不能为空'
          }
        ],
        keywords: [
          {
            required: true,
            message: '关键词不能为空'
          }
        ]
      }
    }
  },
  created() {
    this.form.publisher_id = window.sessionStorage.getItem('curUser')
    this.getAllCategory()
  },
  methods: {
    clearImg() {
      this.$refs.createImgUpload.clearFiles()
    },
    clearFiles() {
      this.$refs.createVideoUpload.clearFiles()
    },
    submitEditRobot() {
      this.$refs.createRobotFormRef.validate(async valid => {
        if (!valid) {
          const h = this.$createElement
          this.$notify({
            title: '有必填项没有填写',
            message: h('i', { style: 'color: red' }, '请检查表单中的必填项是否填写！')
          })
        } else {
          const formData = new FormData()
          for (const key in this.form) {
            formData.append(key, this.form[key])
          }
          const { data: res } = await this.$http.post('/robot/createOneRobot', formData)
          if (res.statusCode === 200) {
            this.$message.success('机器人创建成功')
            await this.$router.push('/manager/robot/robotList')
          }
        }
      })
    },
    async getPubName() {
      const { data: res } = await this.$http.get(`/user/getOneUser/${this.form.publisher_id}`)
      if (res.statusCode === 200) {
        this.publisherName = res.data[0].username
      } else {
        this.$message.error('查无此人！')
      }
    },
    async getAllCategory() {
      const { data: res } = await this.$http.get('/category/queryAll')
      this.categoryList = res.data
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.clickable = true
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传图片
    handleRobotImgSuccess(res, file) {
      console.log(res)
      if (res.statusCode === 200) {
        this.form.image = res.data.appImgOssPath
      } else {
        this.$message.error('图片上传失败！')
      }
      this.clearImg()
    },
    beforeRobotImgUpload(file) {
      const isJPG = (['image/jpeg', 'image/png'].indexOf(file.type) !== -1)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传视频成功返回的钩子
    handleRobotVideoSuccess(res, file) {
      console.log(res)
      this.clickable = false
      if (res.statusCode === 200) {
        this.form.video = res.data.videoOssPath
        this.videoFlag = false
      } else {
        this.$message.error('视频上传失败！')
      }
      this.clearFiles()
    },
    beforeRobotVideoUpload(file) {
      const isVideo = (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) !== -1)
      const isLt1GB = file.size / 1024 / 1024 < 1024
      if (!isVideo) {
        this.$message.error('请上传正确格式的视频文件')
      }
      if (!isLt1GB) {
        this.$message.error('上传视频大小不能超过1GB')
      }
      return isVideo && isLt1GB
    },
    change_content(value, render) {
      this.form.c_html = render
    },
    change_manual(value, render) {
      this.form.m_html = render
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      const res = this.$http.post(this.robotImgUploadUrl, formdata)
      res.then((res) => {
        this.$refs.md.$img2Url(pos, res.data.data.appImgOssPath)
      })
    }
  },
  components: {
    // MyVideoPlayer
  }
}
</script>

<style lang="less" scoped>
.upload-box {
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;

  .el-image {
    width: 180px;
    height: 180px;
    margin-right: 20px;
  }

  .video {
    width: 360px;
    height: 180px;
  }
}

.robot-text {
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
</style>
