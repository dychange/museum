import axios from './index'

const getToken=()=>{
    return axios.request({
        url:'/file/upload',
        method:'get'
    })
}

const getDomain=(data)=>{
    return axios.request({
        url:'/file/bucketHostName',
        method:'post',
        data
    })
}

const delPhoto=(data)=>{
    return axios.request({
        url:'/file/delete',
        method:"post",
        data
    })
}



export {
    getToken,
    delPhoto,
    getDomain
}