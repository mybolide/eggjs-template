import router from './index'
import store from '../store/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { query } from '@/api/common/common-crud'
import { permissionGet } from '@/api/sysAuth'
NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.addRouters.length === 0 && store.getters.id) { // 判断是否已经初始化路由信息
        const permissionsRes = await permissionGet()
        if (permissionsRes.code * 1 === 1) {
          window.GLOBAL_ADMIN_PERMISSIONS = permissionsRes.data
        } else if(permissionsRes.code * 1 === 240420){
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        } else {
          window.GLOBAL_ADMIN_PERMISSIONS = []
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'NO PERMISSION')
            next({ path: '/' })
          })
        }

        const url = '/fed-api/users/powers'
        query(url)
          .then(res => { // 拉取权限信息
            const powers = res.data
            if (powers.length === 0){
              store.dispatch('FedLogOut').then(() => {
                Message.error('NO PERMISSION')
                next({ path: '/' })
              })
            }
            store.dispatch('GenerateRoutes', { powers }).then(() => { // 根据权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100)
  }
  NProgress.done() // finish progress bar
})
