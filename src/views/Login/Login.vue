<template>
  <div class="login_container">
    <div class="login-box">
      <!--      头像部分-->
      <div class="avatar_box">
        <img v-if="userAvatarUrl" :src=userAvatarUrl alt=""/>
        <img v-else src="../../assets/carousel_pic/logo.png" alt=""/>
      </div>
      <!--      表单区域-->
      <el-form ref="loginFormRef" :model="form" :rules="loginFormRules" label-width="0px" class="loginForm">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="form.user_id" placeholder="请输入工号"
                    prefix-icon="el-icon-user-solid" @blur="getUserAvatar" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"
                    prefix-icon="el-icon-key" show-password></el-input>
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="warning" @click="register">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reSetAll">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userAvatarUrl: '',
      form: {
        user_id: '',
        password: ''
      },
      loginFormRules: {
        user_id: [
          {
            required: true,
            message: '请输入用户名'
          },
          {
            min: 3,
            max: 8,
            message: '长度在3~8之间',
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
            max: 12,
            message: '长度在6~12之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    reSetAll() {
      this.$refs.loginFormRef.resetFields()
    },
    async getUserAvatar() {
      const { data: res } = await this.$http.get(`/user/getUserAvatar/${this.form.user_id}`)
      if (res.statusCode === 200) {
        this.userAvatarUrl = res.data.userAvatarUrl
      }
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => { // validate() 表单的预校验
        console.log(valid)
        if (!valid) {
        } else {
          const { data: res } = await this.$http.post('login', this.form)
          console.log(res)
          if (res.statusCode === 200) {
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('curUser', res.data.user_id)
            await this.$router.push('/manager/home')
          } else {
            return this.$message.error('登录失败！')
          }
        }
      })
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login-box {
  background-color: #fff;
  height: 300px;
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

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #fff;
    }
  }

  .loginForm {
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
