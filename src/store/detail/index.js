import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid---》生成一个随机字符串
import {getUuid} from "@/utils/uuid_token";
const state = {
    //商品详情数据
    goodsInfo: {},
    //游客临时身份
    uuid_token: getUuid(),
}
const mutations = {
    //接收商品详情数据
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
  //获取商品详情数据
  async getGoodsInfo({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  //将商品添加到购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //服务器没有返回其他的数据，不需要三连坏
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
//简化数据而生
const getters = {
  categoryView(state) {
    //初始状态goodsInfo是一个空对象，空对象没有categoryView属性，undefined，返回一个空对象，至少不会报错
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}
export default {
    state,
    mutations,
    actions,
    getters
}
