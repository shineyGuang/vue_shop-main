import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const whiteList = [
  '/index',
  '/login',
  '/register',
  '/externalDisplay/robotShow',
  '/externalDisplay/robotShowDetails'
]

const routes = [
  {
    path: '/index',
    name: 'ExternalIndex',
    meta: {
      title: 'SN_RPA_Robot'
    },
    component: () => import('@/views/index/index')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '欢迎登录CMS登录系统'
    },
    component: () => import('@/views/Login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '管理员注册'
    },
    component: () => import('@/views/Register/Register')
  },
  {
    path: '/',
    redirect: '/externalDisplay'
  },
  {
    path: '/externalDisplay',
    name: 'Home2',
    meta: {
      title: 'SN_RPA_Robot'
    },
    component: () => import('@/views/Home2/Home2'),
    redirect: '/externalDisplay/robotShow',
    children: [
      {
        path: '/externalDisplay/robotShow',
        name: 'ExternalRobotShow',
        meta: {
          title: 'SN_RPA_Robot'
        },
        component: () => import('@/views/Robots/ExternalRobotShow')
      },
      {
        path: '/externalDisplay/robotShowDetails',
        name: 'ExternalRobotShowDetails',
        meta: {
          title: 'SN_RPA_Robot'
        },
        component: () => import('@/views/Robots/ExternalRobotShowDetails')
      }
    ]
  },
  {
    path: '/manager/home',
    name: 'Home',
    meta: {
      title: 'SN_ROBOT管理后台'
    },
    component: () => import('@/views/Home/Home'),
    redirect: '/manager/home/welcome',
    children: [
      {
        path: '/manager/home/welcome',
        name: 'Welcome',
        meta: {
          title: 'CMS首页'
        },
        component: () => import('@/components/Welcome/Welcome')
      },
      {
        path: '/manager/user/users',
        name: 'Users',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/Users/Users')
      },
      {
        path: '/manager/robot/robotList',
        name: 'Robots',
        meta: {
          title: '机器人管理'
        },
        component: () => import('@/views/Robots/Robots')
      },
      {
        path: '/manager/robot/robotEdit',
        name: 'RobotEdit',
        meta: {
          title: '机器人详情'
        },
        component: () => import('@/views/Robots/RobotEdit')
      },
      {
        path: '/manager/robot/robotCreate',
        name: 'RobotCreate',
        meta: {
          title: '机器人创建'
        },
        component: () => import('@/views/Robots/RobotCreate')
      },
      {
        path: '/manager/robot/robotShow',
        name: 'RobotCreate',
        meta: {
          title: '机器人详情展示'
        },
        component: () => import('@/views/Robots/RobotShow')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  for (let i = 0; i < whiteList.length; i++) {
    if (to.path === whiteList[i]) {
      if (to.meta.title) {
        document.title = to.meta.title
      }
      console.log(to.path, '白名单')
      return next()
    }
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    return next('/login')
  } else {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
})

export default router
