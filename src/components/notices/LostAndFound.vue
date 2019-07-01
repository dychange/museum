<template>
  <div>
    <div class="moduleTitle">
      <i class="iconfont">&#xe630;</i>
      失物招领</div>
    <el-button class="add-btn" type="primary" @click="addLost" size="small ">发布</el-button>
    <el-table :data="lostList" style="width: 100%" header-row-class-name='header'>
      <el-table-column label="物品名称" prop="articleName" min-width="13%"></el-table-column>
      <el-table-column label="说明" prop="remark" min-width="20%" show-overflow-tooltip></el-table-column>
      <el-table-column label="丢失地点" prop="lostPlace" min-width="18%" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否领取" prop="status" min-width="12%">
        <template slot-scope="types">
          <el-tag type="danger" effect="dark" v-if="types.row.status===0?true:false">未领取</el-tag>
          <el-tag type="success" effect="dark" v-else>已领取</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布人昵称" prop="memberInfo.nickname" min-width="12%" align="center"></el-table-column>
      <el-table-column label="领取人电话" prop="receiveUserPhone" min-width="12%" align="center"></el-table-column>
      <el-table-column label="丢失时间" prop="lostTime" min-width="20%" align="center"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleReceived(scope.$index, scope.row)"
            v-if="scope.row.status===0?true:false"
          >已找回</el-button>
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
    <add-lost :addDialog.sync="addDialog" @getAllLost="getAllLost"></add-lost>
  </div>
</template>

<script>
import { getLostList, delLostInfo, recevied } from "../../api/notices";
import { handleLostData } from "../../lib/handleData";
import { getUserInfoMessage } from "../../utils/localStorage";
import AddLost from "./AddLost";
export default {
  name: "LostAndFound",
  methods: {
    handleReceived(index, row) {
      this.$prompt("请填写领取人手机号码", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        closeOnClickModal: false,
        inputPattern: /0?(13|14|15|18|17|19)[0-9]{9}/,
        inputErrorMessage: "手机号码格式不正确"
      })
        .then(({ value }) => {
          let list = {
            id: row.id,
            status: 1,
            receiveUserPhone: value
          };
          recevied(list).then(result => {
            if (result.data.status === 200) {
              this.$message.success("已确认"),
                this.currentChange(this.paginations.currentPage);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          delLostInfo({ id }).then(result => {
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
    getAllLost() {
      getLostList({
        page: 1,
        rows: this.paginations.pageSize
      }).then(result => {
        if (result.data.status === 200) {
          this.lostList = handleLostData(result);
          this.paginations.total = result.data.info.total;
        }
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getLostList({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize
      }).then(result => {
        if (result.data.status === 200) {
          this.lostList = handleLostData(result);
        }
      });
    },
    addLost() {
      this.addDialog = true;
    }
  },
  data() {
    return {
      lostList: [],
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      addDialog: false
    };
  },
  created() {
    this.getAllLost();
  },
  components: {
    AddLost
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
