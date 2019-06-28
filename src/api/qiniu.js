import axios from './index'

const getToken=()=>{
    return axios.request({
        url:'/file/upload',
        method:'get'
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
    delPhoto
}