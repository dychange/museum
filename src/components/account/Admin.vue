<template>
  <div>
    <el-button type="primary" @click="getAdminList">刷新</el-button>
    <el-button class="add-btn" type="primary" @click="addAdmin">添加管理员</el-button>
    <el-table style="width: 100%" :data="adminList">
      <el-table-column label="管理员帐号" prop="userName"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="账号类型" prop="memberAccountTypeId"></el-table-column>
      <el-table-column label="开户日期" prop="openDate"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastLoginDate"></el-table-column>
      <el-table-column v-if="false" prop="id"></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <admin-edit :editDialog.sync="editDialog" :id='id' @getAdminList='getAdminList'></admin-edit>
    <add-admin :addDialog.sync="addDialog" @getAdminList='getAdminList'></add-admin>
  </div>
</template>

<script>
import AdminEdit from "./Edit";
import AddAdmin from "./Add";
import { getAdminInfo, deleteAdminInfo } from "../../api/adminList";
import { formatDate } from "../../lib/formate";
export default {
  name: "Admin",
  methods: {
    handleEdit(index, row) {
      this.id=row.id
      this.editDialog = true;
    },
    //删除对应的管理员信息
    handleDelete(index, row) {
      let id = row.id;
      deleteAdminInfo({ id })
        .then(result => {
          if (result.data.status === 200) {
            this.$message.success({
              message: "删除成功",
              duration: 1500
            }),
              this.getAdminList();
          } else {
            this.$message.error({
              message: result.data.msg,
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAdmin() {
      this.addDialog = true;
    },
    //获取管理员信息,传入页数和获取数量
    getAdminList() {
      getAdminInfo({
        page: 1,
        rows: 12
      })
        .then(result => {
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
          this.adminList = list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      adminList: [],
      editDialog: false,
      addDialog: false,
      id:null
    };
  },
  mounted() {
    this.getAdminList();
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
</style>
