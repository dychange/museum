<template>
  <div>
    <el-button class="add-btn" type="primary" @click="addAdmin" >添加管理员</el-button>
    <el-table style="width: 100%" :data="adminList">
      <el-table-column label="管理员ID" prop="id" width="80" align="center"></el-table-column>
      <el-table-column label="管理员帐号" prop="userName" width="120" align="center"></el-table-column>
      <el-table-column label="昵称" prop="nickname" width="130" align="center"></el-table-column>
      <el-table-column label="联系方式" prop="telephone" width="150"></el-table-column>
      <el-table-column label="账号类型" prop="memberAccountTypeId" width="100"></el-table-column>
      <el-table-column label="开户日期" prop="openDate" width="180"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastLoginDate" width="180"></el-table-column>
      <el-table-column label="最后登录IP" prop="lastIp" width="170"></el-table-column>
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
    <admin-edit
      :editDialog.sync="editDialog"
      :editAdmin.sync="editAdmin"
      :curpage="paginations.currentPage"
      @currentChange="currentChange"
    ></admin-edit>
    <add-admin :addDialog.sync="addDialog" @getAllAdminList="getAllAdminList"></add-admin>
  </div>
</template>

<script>
import AdminEdit from "./Edit";
import AddAdmin from "./Add";
import { getAdminInfo, deleteAdminInfo } from "../../api/adminList";
import { handleAdminData } from "../../lib/handleData";
export default {
  name: "Admin",
  methods: {
    handleEdit(index, row) {
      this.editAdmin = {
        id: row.id,
        password: null,
        checkpass: null,
        memberAccountTypeId: row.memberAccountId,
        telephone: row.telephone
      };
      this.editDialog = true;
    },
    //删除对应的管理员信息
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          deleteAdminInfo({ id }).then(result => {
            if (result.data.status === 200) {
              this.$message.success("删除成功"),
                this.currentChange(this.paginations.currentPage);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addAdmin() {
      this.addDialog = true;
    },
    //获取管理员信息,传入页数和获取数量
    getAllAdminList() {
      getAdminInfo({
        page: 1,
        rows: 7
      }).then(result => {
        // handleData将获取的数据进行一些转换
        if (result.data.status === 200) {
          this.adminList = handleAdminData(result);
          this.paginations.total = result.data.info.total;
        }
        console.log(result);
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getAdminInfo({
        page: this.paginations.currentPage,
        rows: 7
      }).then(result => {
        if (result.data.status === 200) {
          this.adminList = handleAdminData(result);
        }
        console.log(result);
      });
    }
  },
  data() {
    return {
      adminList: [],
      editDialog: false,
      addDialog: false,
      editAdmin: {
        id: null,
        password: null,
        checkpass: null,
        memberAccountTypeId: "",
        telephone: null
      },
      paginations: {
        total: 0,
        currentPage: 1,
        pageSize: 7
      }
    };
  },
  created() {
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
.pagination {
  text-align: center;
}
</style>


