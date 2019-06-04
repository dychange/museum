import axios from './index'

const login= (data) =>{
    return axios.request({
        url:'/login',
        method:'post',
        data
    })
}

const editInfo=(data)=>{
    return axios.request({
        url:'/personInfo/updatePersonInfo',
        method:'post',
        data
    })
}

const editpass=(data)=>{
    return axios.request({
        url:'/personInfo/updatePassword',
        method:'post',
        data
    })
}

export {
    login,
    editInfo,
    editpass
}