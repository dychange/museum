<template>
  <div>
    <el-table style="width: 100%" :data="userList" header-row-class-name='header'>
      <el-table-column label="头像" width="50" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.headImg" lazy >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"  align="center"></el-table-column>
      <el-table-column prop="city" label="所在地址"  align="center"></el-table-column>
      <el-table-column prop="openTime" label="注册时间" align="center"></el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @current-change="currentChange"
            :current-page.sync="paginations.currentPage"
            :page-size="paginations.pageSize"
            layout="total, prev, pager, next"
            :total="paginations.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserInfo } from "../../api/userList";
import {handleUserData} from '../../lib/handleData'
export default {
  name: "User",
  data() {
    return {
      paginations: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      userList: []
    };
  },
  methods: {
    currentChange(val) {
      this.paginations.currentPage = val;
      getUserInfo({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize
      }).then(result => {
        if(result.data.status === 200){
        this.userList=handleUserData(result)
        }
        console.log(result);
      });
    },
    getAllUserInfo() {
      getUserInfo({
        page: 1,
        rows: this.paginations.pageSize
      })
        .then(result => {
          if(result.data.status === 200){
          this.userList=handleUserData(result)
          this.paginations.total = result.data.info.total;
          }
          console.log(result);
        })
    }
  },
  created() {
    this.getAllUserInfo();
  }
};
</script>

