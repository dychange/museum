import {formatDate} from './formate'

const handleAdminData=(result)=>{
    let list = result.data.info.rows;
    for(let j in list){
      Object.assign(list[j],{memberAccountId:list[j].memberAccountTypeId})
    }
    for (let i in list) {
      let openDate = formatDate(list[i].openDate);
      let lastLoginDate = formatDate(list[i].lastLoginDate);
      if (list[i].memberAccountTypeId === 2) {
        list[i].memberAccountTypeId = "管理员";
      } else if(list[i].memberAccountTypeId === 3) {
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

const handleAddTime=(result)=>{
  let list =result.data.info.rows
  for (let i in list){
    let addTime=formatDate(list[i].addTime)
    list[i].addTime=addTime
  }
  return list
}

const handleLostData=(result)=>{
      let list=result.data.info.rows
      for(let i in list){
        let lostTime=formatDate(list[i].lostTime)
        list[i].lostTime=lostTime
      }
      return list
}

const createRandom=()=>{
        let num = '';
     for (let i = 0; i <= 16; i++)
     {
        var tmp = Math.ceil(Math.random()*15); 
        if(tmp > 9){
               switch(tmp){  
                   case(10):
                       num+='a';
                       break; 
                   case(11):
                       num+='b';
                       break;
                   case(12):
                       num+='c';
                       break;
                   case(13):
                       num+='d';
                       break;
                   case(14):
                       num+='e';
                       break;
                   case(15):
                       num+='f';
                       break;
               } 
            }else{
               num+=tmp;
            }
   }
  return num
}

export {
  handleAdminData,
  handleUserData,
  handleAddTime,
  handleLostData,
  createRandom
}