<template>
  <div class="register_container">
    <div class="register-box">
      <!--      头像部分-->
      <div class="avatar_box">
        <el-upload
          class="avatar-uploader"
          :action=avatarUploadUrl
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <!--          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">-->
          <el-image v-if="form.avatar" :src="form.avatar" fit="fill"></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!--      表单区域-->
      <el-form ref="registerFormRef" status-icon :model="form" :rules="registerFormRules" label-width="0px"
               class="registerForm">
        <!--        工号-->
        <el-form-item prop="auth_user_id">
          <el-input v-model="form.auth_user_id" placeholder="请输入工号"
                    prefix-icon="el-icon-user-solid" clearable></el-input>
        </el-form-item>
        <!--        用户名-->
        <el-form-item prop="user_name">
          <el-input v-model="form.user_name" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" clearable></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"
                    prefix-icon="el-icon-key" show-password></el-input>
        </el-form-item>
        <!--        二次密码-->
        <el-form-item prop="re_password">
          <el-input v-model="form.re_password" placeholder="请再次确认密码" prefix-icon="el-icon-key" show-password></el-input>
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="warning" @click="signUp">去登录</el-button>
          <el-button type="success" @click="submit">提交</el-button>
          <el-button type="info" @click="reSetAll">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    var checkUserIsExist = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工号不能为空'))
      } else {
        this.getOneUser().then((res) => {
          console.log(res)
          if (!res) {
            callback()
          } else {
            callback(new Error('工号已存在，请用工号登录！'))
          }
        })
      }
    }
    var checkUserNameIsExist = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        this.getOneUserByUserName().then((res) => {
          if (!res) {
            callback()
          } else {
            callback(new Error('用户名已存在，请更换用户名！'))
          }
        })
      }
    }
    var checkPss = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      avatarUploadUrl: 'http://127.0.0.1:8000/api/v1/file/fileUploadAvatar',
      form: {
        auth_user_id: '',
        user_name: '',
        password: '',
        re_password: '',
        avatar: ''
      },
      registerFormRules: {
        auth_user_id: [
          {
            validator: checkUserIsExist,
            trigger: 'blur'
          },
          {
            min: 8,
            max: 8,
            message: '长度为8',
            trigger: 'blur'
          }
        ],
        user_name: [
          {
            validator: checkUserNameIsExist,
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在2~10之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          },
          {
            min: 6,
            max: 18,
            message: '长度在6~18之间',
            trigger: 'blur'
          }
        ],
        re_password: [
          {
            validator: checkPss
          }
        ]
      }
    }
  },
  methods: {
    signUp() {
      this.$router.push('/login')
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.statusCode === 200) {
        this.form.avatar = res.data.avatarOssPath
      } else {
        this.$message.error('图片上传失败！')
        this.form.imageUrl = ''
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    reSetAll() {
      this.$refs.registerFormRef.resetFields()
    },
    submit() {
      this.$refs.registerFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) {
        } else {
          const formData = new FormData()
          for (const key in this.form) {
            formData.append(key, this.form[key])
            console.log(formData.get(key))
          }
          const { data: res } = await this.$http.post('register', formData)
          console.log(res)
          if (res.statusCode === 200) {
            this.$message.success('注册成功')
            await this.$router.push('/login')
          } else {
            return this.$message.error('注册失败')
          }
        }
      })
    },
    async getOneUser() {
      const { data: res } = await this.$http.get(`user/getOneUser/${this.form.auth_user_id}`)
      return res.statusCode === 200
    },
    async getOneUserByUserName() {
      const { data: res } = await this.$http.get('user/getOneUserByUserName', { params: { user_name: this.form.user_name } })
      return res.statusCode === 200
    }
  }
}
</script>

<style lang="less" scoped>
.register_container {
  background-color: #2b4b6b;
  height: 100%;
}

.register-box {
  background-color: #fff;
  height: 450px;
  width: 450px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    .avatar-uploader {
      height: 130px;
      width: 130px;
      border: 1px dashed #ddd;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      //overflow: hidden;
    }

    .el-upload {
      height: 130px;
      width: 130px;
      border-radius: 50%;

      .el-image {
        height: 130px;
        width: 130px;
        border-radius: 50%;
      }
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 130px;
      height: 130px;
      line-height: 130px;
      text-align: center;
    }
  }

  .registerForm {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
