//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//start()开启进度条,done()进度条结束
//引入store
import store from '@/store'

//1:利用axios.create()创建一个新的axios实例
//
const requests = axios.create({
    //配置对象
    //基础路径，所有的请求都会在路径前面加上这个路径/api
    baseURL: '/api',
    //超时时间5s
    timeout: 5000
});
//请求拦截器
requests.interceptors.request.use(config => {
    //config:请求的配置对象,对象中有header请求头
    //开启进度条
    NProgress.start();
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段(userTempId)，和后台商量好了
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if (store.state.user.token) {
        //请求头添加一个字段(token)，和后台商量好了
        config.headers.token = store.state.user.token;
    }
    return config;
})


//响应拦截器
requests.interceptors.response.use(response => {
    //response:响应对象
    //关闭进度条
    NProgress.done();
    return response.data;
}, error => {
    //失败的回调
    return Promise.reject(error);
})
//对外暴露
export default requests;