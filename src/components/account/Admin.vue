<template>
  <div>
    <el-button type="primary" @click="currentChange">刷新</el-button>
    <el-button class="add-btn" type="primary" @click="addAdmin">添加管理员</el-button>
    <el-table style="width: 100%" :data="adminList">
      <el-table-column label="管理员帐号" prop="userName" width="150"></el-table-column>
      <el-table-column label="昵称" prop="nickname" width="150"></el-table-column>
      <el-table-column label="联系方式" prop="telephone" width="200"></el-table-column>
      <el-table-column label="账号类型" prop="memberAccountTypeId" width="150"></el-table-column>
      <el-table-column label="开户日期" prop="openDate" width="200"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastLoginDate" width="200"></el-table-column>
      <el-table-column v-if="false" prop="id"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
    <admin-edit :editDialog.sync="editDialog" :id="id" :curpage='paginations.currentPage' @currentChange="currentChange"></admin-edit>
    <add-admin :addDialog.sync="addDialog" @getAllAdminList="getAllAdminList"></add-admin>
  </div>
</template>

<script>
import AdminEdit from "./Edit";
import AddAdmin from "./Add";
import { getAdminInfo, deleteAdminInfo } from "../../api/adminList";
import {handleAdminData} from '../../lib/handleData'
export default {
  name: "Admin",
  methods: {
    handleEdit(index, row) {
      this.id = row.id;
      this.editDialog = true;
    },
    //删除对应的管理员信息
    handleDelete(index, row) {
      let id = row.id;
      deleteAdminInfo({ id }).then(result => {
        if (result.data.status === 200) {
          this.$message.success({
            message: "删除成功",
            duration: 1500
          }),
            this.currentChange(this.paginations.currentPage);
        } else if( result.data.status === 400){
          this.$message.error({
            message: result.data.msg,
            duration: 1500
          });
        }
      });
    },
    addAdmin() {
      this.addDialog = true;
    },
    //获取管理员信息,传入页数和获取数量
    getAllAdminList() {
      getAdminInfo({
        page: 1,
        rows: 8
      }).then(result => {
        // handleData将获取的数据进行一些转换
       this.adminList= handleAdminData(result)
        this.paginations.total = result.data.info.total;
        console.log(result);
      });
    },
    currentChange(val) {
      this.paginations.currentPage=val
      getAdminInfo({
        page: this.paginations.currentPage,
        rows: 8
      }).then(result => {
        this.adminList= handleAdminData(result)
        console.log(result);
      });
    },

  },
  data() {
    return {
      adminList: [],
      editDialog: false,
      addDialog: false,
      id: null,
      paginations: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    };
  },
  mounted() {
    this.getAllAdminList();
  },
  components: {
    AdminEdit,
    AddAdmin
  }
};
</script>

<style scoped>
.add-btn {
  float: right;
  margin-bottom: 20px;
}
.pagination{
  text-align: center;
}
</style>
