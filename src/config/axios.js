import {startLoading,endLoading} from '../lib/loading'
import {clearLocalStorage,getUserInfoMessage} from "../utils/localStorage"
import {Message} from 'element-ui'
import router from '../router/router'
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
            if(!config.url.endsWith('/verification')){
                startLoading()
            }
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
            let {msg,status}=res.data
            if (status === 401) {
                Message.error(msg)
                clearLocalStorage()
                router.replace('/login')
            }else if( status === 403){
                Message.error(msg)
                router.replace('/')
            }else if( status === 400){
                Message.error(msg)
            }
            return res
        }, err => {
            if(err.response.status === 500){
                Message.error('服务器被程序员吃了ヾﾉ≧∀≦)o')
                endLoading()
            }else if(err.response.status === 404){
                router.replace('/404')
            }
           return Promise.reject(err)
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