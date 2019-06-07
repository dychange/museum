import axios from './index'

const getLostList=(data)=>{
    return axios.request({
        url:'/lost/list',
        method:'post',
        data
    })
}

const delLostInfo=(data)=>{
    return axios.request({
        url:'',
        method:'post',
        data
    })
}

export {
    getLostList,
    delLostInfo
}