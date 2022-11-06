import { reqSearchInfo } from "@/api";
//search模块的小仓库
const state = {
    //搜索列表数据
    searchList: {},
};
const mutations = {
    //直接修改数据,第一个参数是state,第二个参数是传递过来的数据
    GETSEARCHLIST(state, searchInfo) {
        state.searchList = searchInfo;
        
    }
};
const actions = {
    //获取数据
    //params形参：是当用户派发action的时候（dispatch），第二个参数传递过来的
    async getSearchList({ commit }, params={}) {
        let result = await reqSearchInfo(params);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
//getters:包含多个getter计算属性函数的对象，为了简化数据而生,不要数据嵌套太深，获取数据方便

const getters = {
    //当前的state是search模块的state，不是大仓库中的state
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters
};
