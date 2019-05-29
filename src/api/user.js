import axios from './index'

const login= (data) =>{
    return axios.request({
        url:'/login',
        method:'post',
        data
    })
}

export {
    login
}