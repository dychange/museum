import axios from './index'

const getDataList=(data)=>{
    return axios.request({
        url:'/selectLog/list',
        method:'post',
        data
    })
}


export {
    getDataList
}