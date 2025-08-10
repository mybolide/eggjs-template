import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
// import '@/icons' // icon
import 'virtual:svg-icons-register'
import '@/icons'
import '@/router/permission' // permission control

import hasPermission from './directive/hasPerm'


Vue.use(VueClipboard)

// Vue.directive('hasPerm', hasPermission)
// import "preline/preline";
// document.domain = 'lexiangchaobai.com'

// fortawesome start
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
// fortawesome end
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false


Vue.directive('hasPerm', hasPermission)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
HSStaticMethods.autoInit()


const observer = new MutationObserver(() => {});
observer.observe(document, { childList: true, subtree: true });