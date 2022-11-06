//配置路由的地方
import Vue from 'vue'
import Router from 'vue-router'
//使用插件
Vue.use(Router);
//引入组件

import routes from './routes';

//引入store
import store from '@/store'
//重写push方法
//第一个参数是路径，第二个参数是成功回调函数，第三个参数是失败回调函数
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
//重写replace方法
//第一个参数是路径，第二个参数是成功回调函数，第三个参数是失败回调函数
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

//配置路由
let router = new Router({

    routes,
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y值就是滚动条的位置，y=0为顶部
        return { y: 0 }
    }
})

//全局守卫,前置守卫
router.beforeEach(async (to, from, next) => {
    //用户登录了就有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //用户已经登录了，还想去login页面
        if (to.path === '/login' || to.path === '/register') {
            next('/');
        } else {
            if (name) {
                next();
            } else {
                //没有用户信息，需要获取用户信息，派发action让仓库存储用户信息
                //获取用户信息在首页展示
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //获取用户信息失败，清除token，跳转到登录页面
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录，不能去交易页面，支付页面，个人中心页面
        let path = to.path;
        if (path.indexOf('/trade') != -1 || path.indexOf('/pay') != -1 || path.indexOf('/center') != -1) {
            next('/login?redirect=' + path);
        } else {
            next();
        }
    }
})
//路由独享守卫



//暴露路由
export default router;
