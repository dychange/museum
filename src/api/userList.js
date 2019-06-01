import axios from './index'

const getUserInfo=(data)=>{
    return axios.request({
        url:'/weChat/list',
        method:'post',
        data
    })
}

export {
    getUserInfo
}