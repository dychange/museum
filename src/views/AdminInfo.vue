<template>
  <div class="container" >
    <div class="info">
    <div class="icon">
      <i class="el-icon-s-custom"></i>
      <span>管理员信息</span>
    </div>
    <el-card class="box-card">
      <div  class="nick">昵称：{{adminInfo.nickname}}</div>
      <div  class="phone">联系方式：{{adminInfo.phone}}</div>
      <div  class="type">账户类型：{{adminInfo.type}}</div>
    </el-card>
    </div>
     <div class="decorate">
      <el-image :src="Img" lazy ></el-image>
    </div>
  </div>
</template>

<script>
import {getUserInfoMessage} from '../utils/localStorage'
import {getDomain} from '../api/qiniu'
export default {
  name: "AdminInfo",
  data() {
      return {
          adminInfo:{
              nickname:'',
              phone:'无',
              type:''
          },
          Img:''
      }
  },
  created() {
      let adminInfo = getUserInfoMessage('userInfo')
      let Admintype=adminInfo.memberAccountTypeId
      this.adminInfo={
          nickname:adminInfo.nickname,
          phone:adminInfo.phone,
          type:Admintype === 1 ? '超级管理员' : ( Admintype === 2 ? '管理员' : '客服')
      }
      getDomain().then((result) => {
        if(result.data.status===200){
          this.Img=result.data.info+'important/adminInfo.jpg'
        }
      })
  },
};
</script>

<style scoped>
.container {
  position: relative;
  padding: 25px 20px;
  height: 100%;
  box-sizing: border-box;
}
.icon {
  font-size: 30px;
  margin-bottom: 30px;
}

.nick , .phone , .type {
    border-bottom: 1px solid #E4E7ED;
    padding: 10px;
}
.info {
  margin-left: 10%;
  margin-top: 5%;
}
.box-card {
  width: 300px;
}
.box-card >>> .el-card__body{
    padding: 10px 15px;
}
.decorate{
  width: 200px;
  height: 200px;
  position: absolute;
  right: 8%;
  bottom: 5%;
}
</style>
