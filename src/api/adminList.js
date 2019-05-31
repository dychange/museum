import axios from './index'

const getAdminInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/list',
        method:'post',
        data
    })
}

const deleteAdminInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/delete',
        method:'post',
        data
    })
}

const addAdmin=(data)=>{
    return axios.request({
        url:'/memberInfo/insert',
        method:'post',
        data
    })
}

const checkName=(data)=>{
    return axios.request({
        url:'/memberInfo/verification',
        method:'post',
        data
    })
}

const updateInfo=(data)=>{
    return axios.request({
        url:'/memberInfo/update',
        method:'post',
        data
    })
}

export {
    getAdminInfo,
    deleteAdminInfo,
    addAdmin,
    checkName,
    updateInfo
}