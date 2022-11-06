import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

//state:状态对象
// const state = {}
//mutations:包含多个更新state函数的对象
// const mutations = {}
//actions:包含多个对应事件回调函数的对象
// const actions = {}
//getters:包含多个getter计算属性函数的对象
// const getters = {}

//引入home模块的小仓库
import home from './home'
//引入search模块的小仓库
import search from './search'
//引入detail模块的小仓库
import detail from './detail'
//引入shopcart模块的小仓库
import shopcart from './shopcart'
//引入user模块的小仓库
import user from './user'
//引入trade模块的小仓库
import trade from './trade'
//对外暴露一个store对象
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});

