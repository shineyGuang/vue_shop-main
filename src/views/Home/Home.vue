<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <el-image :src="headImgUrl" alt=""/>
        <span>SN_ROBOT管理系统</span>
      </div>
      <el-button type="info" @click="logOut">登出</el-button>
    </el-header>
    <!--    页面主题区域-->
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="isCollapse ? '49px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--        侧边菜单栏区域-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse="isCollapse"
          :unique-opened="true"
          :collapse-transition="false"
          router
          :default-active="this.$route.path"
        >
          <!--          一级菜单-->
          <el-submenu
            :index="item.id + ''"
            v-for="(item, index) in menuList"
            :key="index"
          >
            <!--            一级菜单的模板区域-->
            <template slot="title">
              <!--              一级菜单图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--              一级菜单内容-->
              {{ item.authName }}
            </template>
<!--            二级菜单-->
            <el-menu-item
              v-for="(subItem, index) in item.children"
              :key="index"
              :index="'/' + subItem.path"
              @click="saveNavState('/' + subItem.path)"
            >
              <!--              二级菜单区域-->
              <template slot="title">
                <!--                二级菜单图标-->
                <i class="el-icon-menu"></i>
                <!--                二级菜单内容-->
                {{ subItem.authName }}
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--      右侧内容主体-->
      <el-main>
        <!--        路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import logo from '../../assets/机器头.png'
export default {
  name: 'Home',
  data() {
    return {
      headImgUrl: logo,
      menuList: [
        {
          id: 125,
          authName: '机器人管理',
          children: [
            {
              id: 1,
              path: 'manager/robot/robotList',
              authName: '机器人列表'
            }
          ]
        }
      ],
      iconsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-tools',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-management'
      },
      // 是否折叠
      isCollapse: false,
      // 当前激活路由
      activePath: ''
    }
  },
  created() {
    // this.getMenuList()
    this.getActivePath()
  },
  methods: {
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('menus')
    //   console.log(res)
    //   if (res.meta.status === 200) {
    //     this.menuList = res.data
    //   } else {
    //     return this.$message.error(res.meta.msg)
    //   }
    // },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    logOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 保存当前点击路由
    saveNavState(activePath) {
      console.log(this.$route.path)
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 获取当前激活的路由
    getActivePath() {
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
  }

  img {
    height: 10%;
    width: 5%;
  }

  span {
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }

  .toggle-button {
    background-color: #4a5064;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>
