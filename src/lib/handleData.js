import {formatDate} from './formate'

const handleAdminData=(result)=>{
    let list = result.data.info.rows;
    for (let i in list) {
      let openDate = formatDate(list[i].openDate);
      let lastLoginDate = formatDate(list[i].lastLoginDate);
      if (list[i].memberAccountTypeId === 1) {
        list[i].memberAccountTypeId = "超级管理员";
      } else if (list[i].memberAccountTypeId === 2) {
        list[i].memberAccountTypeId = "管理员";
      } else {
        list[i].memberAccountTypeId = "客服";
      }
      list[i].openDate = openDate;
      list[i].lastLoginDate = lastLoginDate;
    }
    return list
}

const handleUserData=(result)=>{
    let list =result.data.info.rows
    for (let i in list){
      let openTime=formatDate(list[i].openTime)
      list[i].openTime=openTime
    }
    return list
}

const handleItemData=(result)=>{
  let list =result.data.info.rows
  for (let i in list){
    let addTime=formatDate(list[i].addTime)
    list[i].addTime=addTime
  }
  return list
}

export {
  handleAdminData,
  handleUserData,
  handleItemData
}