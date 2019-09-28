import Vue from 'vue'
import App from './App'

// 路由
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)

// ajax
const Fly=require("flyio/dist/npm/wx") 
const fly=new Fly
 //添加全局配置、拦截器等
Vue.prototype.$http=fly //将fly实例挂在vue原型上


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
