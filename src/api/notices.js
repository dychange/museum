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

const getNoticeInfo=(data)=>{
    return axios.request({
        url:'/Announcement/list',
        method:'post',
        data
    })
}

const addNoticeInfo=(data)=>{
    return axios.request({
        url:'/Announcement/insert',
        method:'post',
        data
    })
}

const editNoticeInfo=(data)=>{
    return axios.request({
        url:'/Announcement/update',
        method:'post',
        data
    })
}

const delNoticeInfo=(data)=>{
    return axios.request({
        url:'/Announcement/delete',
        method:'post',
        data
    })
}

const Release=(data)=>{
    return axios.request({
        url:'/Announcement/update',
        method:'post',
        data
    })
}

export {
    getLostList,
    delLostInfo,
    addLostInfo,
    recevied,
    getNoticeInfo,
    addNoticeInfo,
    editNoticeInfo,
    delNoticeInfo,
    Release
}