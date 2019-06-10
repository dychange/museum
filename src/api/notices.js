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
        url:'/lost/delete',
        method:'post',
        data
    })
}

const addLostInfo=(data)=>{
    return axios.request({
        url:'/lost/insert',
        method:'post',
        data
    })
}

const recevied=(data)=>{
    return axios.request({
        url:'/lost/updateStatus',
        method:'post',
        data
    })
}

export {
    getLostList,
    delLostInfo,
    addLostInfo,
    recevied
}