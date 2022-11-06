import Vue from 'vue'
import App from './App.vue'
//引入饿了么UI
// import ElementUI from 'element-ui';
import { Button, MessageBox } from 'element-ui'
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数是组件名，第二个参数是组件对象
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入MockServer.js----mock数据
import '@/mock/mockServer';
//引入路由
import router from '@/router'
//引入store
import store from '@/store'
//引入Swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
//引入lazyload
// import VueLazyload from 'vue-lazyload'
// import atm from '@/assets/images/atm.gif'
// Vue.use(VueLazyload, {
//   //懒加载默认图片
//   loading: atm
// })
//统一引入api文件下的所有请求函数
import * as API from '@/api'
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API

  },
  //挂载路由
  router,
  //挂载store,所有的组件对象都多了一个属性$store
  store
}).$mount('#app')
