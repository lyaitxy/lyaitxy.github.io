//当前这个模块，API进行统一管理
import request from './request'
import mockRequest from './mockRequest'

//三级联动接口
///api/product/getBaseCategoryList  get  无参数
//发请求：axios发请求返回的是一个promise对象
export const reqCategoryList = () => {
    return request({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//获取轮播图和推荐数据
export const reqBannerList = () => {
    return mockRequest({
        url: '/banners',
        method: 'get'
    })
}

//获取floor数据
export const reqFloorList = () => {
    return mockRequest({
        url: '/floors',
        method: 'get'
    })
}

//获取搜索列表数据，请求需要带参数
//当前这个接口，给服务器传递参数params。至少是一个空对象，才能请求成功
export const reqSearchInfo = (params) => {
    return request({
        url: '/list',
        method: 'post',
        data: params,
    })
}

//获取商品详情数据，请求需要参数 URL地址：/api/item/{ skuId } get
export const reqGoodsInfo = (skuId) => {
    return request({
        url: `/item/${skuId}`,
        method: 'get'
    })
}

//将产品添加到购物车
//URL地址：/api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

//获取购物车列表数据
//URL地址：/api/cart/cartList get
export const reqShopCartList = () => {
    return request({
        url: '/cart/cartList',
        method: 'get'
    })
}

//删除购物车数据
//URL地址：/api/cart/deleteCart/{ skuId } delete
export const reqDeleteCartById = (skuId) => {
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

//切换商品选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckedByid = (skuId, isChecked) => {
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => {
    return request({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
};

//注册
//url:/api/user/passport/register  method:post    phone password code
export const reqUserRegister = (data)=> {
    return request({
        url: '/user/passport/register',
        
        method: 'post',
        data,
    })
}

//登录
//URL: /api/user/passport/login  method:post  phone  password
export const reqUserLogin = (data) => {
    return request({
        url: '/user/passport/login',
        data,
        method: 'post'
    })
}

//获取用户信息,需要带着token
//URL: /api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => {
    return request({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

//退出登录
//URL: /api/user/passport/logout  method:get
export const reqUserLogout = () => {
    return request({
        url: '/user/passport/logout',
        method: 'get'
    })
}

//获取用户地址信息
//URL: /api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () => {
    return request({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

//获取商品清单
//URL: /api/order/auth/trade  method:get
export const reqTradeInfo = () => {
    return request({
        url: '/order/auth/trade',
        method: 'get'
    })
}

//提交订单
//URL: /api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) => {
    return request({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data,
    })
}

//获取订单支付信息
//URL: /api/payment/weixin/createNative/{orderId}  method:get
export const reqPayInfo = (orderId) => {
    return request({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

//获取支付订单状态
//URL: /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => {
    return request({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}

//获取我的订单列表
//URL: /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) => {
    return request({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}