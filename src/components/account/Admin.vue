<template>
  <div>
    <el-button class="add-btn" type="primary" @click="addAdmin">添加管理员</el-button>
    <el-table style="width: 100%" :data="table_data">
      <el-table-column label="管理员帐号" prop="admin"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="账号类型" prop="usertype"></el-table-column>
      <el-table-column label="开户日期" prop="date"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastlogin"></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <admin-edit :editDialog.sync="editDialog"></admin-edit>
    <add-admin :addDialog.sync="addDialog"></add-admin>
  </div>
</template>

<script>
import AdminEdit from "./Edit";
import AddAdmin from "./Add";
export default {
  name: "Admin",
  methods: {
    handleEdit(index, row) {
      this.editDialog = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addAdmin() {
      this.addDialog = true;
    }
  },
  data() {
    return {
      table_data: [
        {
          admin: "123"
        }
      ],
      editDialog: false,
      addDialog: false
    };
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
