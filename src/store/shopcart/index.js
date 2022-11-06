import { reqShopCartList, reqDeleteCartById, reqUpdateCheckedByid} from "@/api";
const state = {
    shopCartList: []
}
const mutations = {
    GETSHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const actions = {
    //获取购物车列表数据
    async getShopCartList({ commit }) {
        const result = await reqShopCartList()
        console.log(result);
        if (result.code === 200) {
            commit('GETSHOPCARTLIST', result.data)
        }
    },
    //删除购物车数据
    async deleteCartById({ commit }, skuId) {
        const result = await reqDeleteCartById(skuId)
        if(result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //修改购物车选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code === 200) {
          return 'ok';
        } else {
          return Promise.reject(new Error('fail'));
        }
      },
      //删除选中的购物车数据
    deleteAllCheckedCart({dispatch, getters}) {
        //context是一个对象，里面有commit，state，getters，dispatch
        //获取选中的购物车数据(是一个数组)
        let PromiseArr = [];
        getters.carList.cartInfoList.forEach(item => {
            if (item.isChecked === 1) {
                let result = dispatch('deleteCartById', item.skuId);
                PromiseArr.push(result);
            }
        })
        //如果都成功，返回成功，如果有一个失败，就返回失败
        return Promise.all(PromiseArr);
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch, state}, isChecked) {
        let PromiseArr = [];
        state.shopCartList[0].cartInfoList.forEach(item => {
            let Promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked})
            PromiseArr.push(Promise);
        });
        return Promise.all(PromiseArr);
    }
}
const getters = {
    carList(state) {
        return state.shopCartList[0] || []
    },
    // //计算出来购物车的数据
    // carInfo(state) {
    //     return 
    // }
}
export default {
    state,
    mutations,
    actions,
    getters
};

