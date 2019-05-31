<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机:">
        <el-input v-model="searchphone" placeholder="输入要查询的手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-right"  >重置</el-button>
      </el-form-item>
    </el-form>
    <el-table style="width: 100%" :data="userList">
      <el-table-column prop="id" label="ID" width="120" align='center'></el-table-column>
      <el-table-column label="头像" width="70" align='center'>
        <template slot-scope="scope">
          <el-image :src='scope.row.img'>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="180" align='center'></el-table-column>
      <el-table-column prop="phone" label="手机" width="160" align='center'></el-table-column>
      <el-table-column prop="type" label="类型" width="120" align='center'></el-table-column>
      <el-table-column prop="address" label="所在地址" width="350" align='center'></el-table-column>
      <el-table-column prop="date" label="注册时间" align='center'></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      searchphone: "",
      userList: [
        {
          id: 1234567890,
          img:
            "http://img3.duitang.com/uploads/item/201605/07/20160507191419_J2m8R.thumb.700_0.jpeg",
          name: "篮球形象大使",
          phone: "78945613",
          type: "游客",
          address: "湖南省岳阳市岳阳楼区奇家岭街道湖南理工学院南湖学院希望门",
          date: "2019年5月30日 14:11:23"
        }
      ],
    };
  },
  methods: {
    search(){
      if(this.searchphone===''){
        return this.$message.warning({
          message:'请输入手机号',
          duration:2000
        })
      }else{
        let searchRes=[]
        for(let i in this.userList){
          this.userList[i].forEach(val=>{
            if(val.phone.indexOf(this.searchphone) !=-1){

            }
          })
        }
      }
    },
  }
};
</script>

<style scoped>
</style>
