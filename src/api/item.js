import axios from './index'

const getItemTypeInfo=(data)=>{
    return axios.request({
        url:'/itemType/list',
        method:'post',
        data
    })
}

export {
    getItemTypeInfo
}