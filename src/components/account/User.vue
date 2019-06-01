<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机:">
        <el-input v-model="searchphone" placeholder="输入要查询的手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-right">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table style="width: 100%" :data="userList">
      <el-table-column prop="userId" label="ID"  align="center"></el-table-column>
      <el-table-column label="头像" width="70" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.headImg">
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
        pageSize: 8
      },
      searchphone: "",
      userList: []
    };
  },
  methods: {
    currentChange(val) {
      this.paginations.currentPage = val;
      getUserInfo({
        page: this.paginations.currentPage,
        rows: 8
      }).then(result => {
        this.userList=handleUserData(result)
        console.log(result);
      });
    },
    getAllUserInfo() {
      getUserInfo({
        page: 1,
        rows: 8
      })
        .then(result => {
          this.userList=handleUserData(result)
          this.paginations.total = result.data.info.total;
          console.log(result);
        })
    }
  },
  mounted() {
    this.getAllUserInfo();
  }
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
</style>
