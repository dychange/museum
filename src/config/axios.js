import {startLoading,endLoading} from '../lib/loading'
import {clearLocalStorage,getUserInfoMessage} from "../utils/localStorage"
const axios = require('axios')
const {baseURL} = require('./index')

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseURL = baseUrl
        this.queue = [] //定义一个队列用来存贮请求
    }
    getInsideConfig() {
        const config = {
            baseURL : this.baseURL,
            headers: {

            }
        }
        return config
    }
    //  拦截器
    interceptors(instance, url) {
        //  请求拦截
        instance.interceptors.request.use(config => {
            //  如果队列中没有请求则开始加载动画
            console.log('请求拦截：',config)
            startLoading()
            
            // 将Token设置到headers中
            if(getUserInfoMessage('userInfo'))
                config.headers.Authorization = getUserInfoMessage('userInfo').token
                
            return config
        }, err => {
            return Promise.reject(err)
        })

        // 响应拦截
        instance.interceptors.response.use(res => {
            endLoading()
            let {msg,status} = res.data
            if (status === 403) {
                this.$message.error('账号已失效，请重新登录')
                clearLocalStorage()
                this.$router.replace('/login')
            }
            return res
        }, err => {
        })
    }
    request(options, url) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, url)
        return instance(options)
    }
}

export default HttpRequest