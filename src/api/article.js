import axios from './index'

const getArtList=(data)=>{
    return axios.request({
        url:'/essay/list',
        method:'post',
        data
    })
}

const editArt=(data)=>{
    return axios.request({
        url:'/essay/update',
        method:'post',
        data
    })
}

const creArt=(data)=>{
    return axios.request({
        url:'/essay/insert',
        method:'post',
        data
    })
}

const delArt=(data)=>{
    return axios.request({
        url:'/essay/delete',
        method:'post',
        data
    })
}

const getServer=(data)=>{
    return axios.request({
        url:'/ServiceCentre/get',
        method:'post',
        data
    })
}

const editServer=(data)=>{
    return axios.request({
        url:'/ServiceCentre/update',
        method:'post',
        data
    })
}

export {
    getArtList,
    editArt,
    creArt,
    delArt,
    editServer,
    getServer
}