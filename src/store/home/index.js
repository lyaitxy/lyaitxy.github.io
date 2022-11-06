import { reqCategoryList, reqBannerList, reqFloorList} from "@/api";
//home模块的小仓库
const state = {
    //state中的数据是根据接口返回值来初始化的
    categoryList: [],
    //轮播图数据
    bannerList: [],
    //楼层数据
    floorList: []
};
const mutations = {
    //直接修改数据,第一个参数是state,第二个参数是传递过来的数据
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    //修改轮播图数据
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
        //console.log(state);
        //console.log("@@",state.bannerList);
    },
    //修改floor数据
    FLOORLIST(state, floorList) {
        state.floorList = floorList;
        
    }

};
const actions = {
    //通过API获取数据
    async getCategoryList({ commit }) {
        let result = await reqCategoryList();
        
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data);
        }
    },
    //获取轮播图数据
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        //console.log(result);
        if (result.code === 200) {
            commit('BANNERLIST', result.data);
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code === 200) {
            commit('FLOORLIST', result.data);
        }
    }

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
};
