import axios from './index'

const getItemTypeInfo=(data)=>{
    return axios.request({
        url:'/itemType/list',
        method:'post',
        data
    })
}

const addItemType=(data)=>{
    return axios.request({
        url:"/itemType/insert",
        method:'post',
        data
    })
}

const checkItemTypeName=(data)=>{
    return axios.request({
        url:'/itemType/verification',
        method:'post',
        data
    })
}

const delItemType=(data)=>{
    return axios.request({
        url:'/itemType/delete',
        method:'post',
        data
    })
}

const editItemType=(data)=>{
    return axios.request({
        url:'itemType/update',
        method:'post',
        data
    })
}

const getItemInfo=(data)=>{
    return axios.request({
        url:'/itemInfo/list',
        method:'post',
        data
    })
}

const addItem=(data)=>{
    return axios.request({
        url:'/itemInfo/insert',
        method:'post',
        data
    })
}

const getTypeName=()=>{
    return axios.request({
        url:'/itemInfo/listOnItemType/verification',
        method:'post',
    })
}

const delItem=(data)=>{
    return axios.request({
        url:'/itemInfo/delete',
        method:'post',
        data
    })
}

const updateItem=(data)=>{
    return axios.request({
        url:'/itemInfo/update',
        method:'post',
        data
    })
}


const getItemName=(data)=>{
    return axios.request({
        url:'/itemInfo/list/name',
        method:'post',
        data
    })
} 

export {
    getItemTypeInfo,
    addItemType,
    checkItemTypeName,
    delItemType,
    editItemType,
    getItemInfo,
    addItem,
    getTypeName,
    delItem,
    updateItem,
    getItemName
}