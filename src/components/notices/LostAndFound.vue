<template>
  <div>
    <el-button class="add-btn" type="primary" @click="addLost">发布</el-button>
    <el-table :data="lostList" style="width: 100%">
      <el-table-column label="物品名称" prop="articleName" width="150"></el-table-column>
      <el-table-column label="说明" prop="remark" width="250" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否领取" prop="status" width="150"></el-table-column>
      <el-table-column label="丢失地点" prop="lostPlace" width="150"></el-table-column>
      <el-table-column label="发布人ID" prop="operatorId" width="150"></el-table-column>
      <el-table-column label="丢失时间" prop="lostTime" width="200" align="center"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleReceived(scope.$index, scope.row)" v-if="scope.row.statusCode===0?true:false">已找回</el-button>
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
    <add-lost :addDialog.sync="addDialog" @getAllLost='getAllLost'></add-lost>
  </div>
</template>

<script>
import { getLostList, delLostInfo ,recevied} from "../../api/notices";
import { handleLostData } from "../../lib/handleData";
import AddLost from "./AddLost";
export default {
  name: "LostAndFound",
  methods: {
    handleReceived(index,row){
      console.log(row.id)
       this.$confirm("丢失的物品确认找回了吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          let status=row.statusCode=1
          recevied({ id,status }).then(result => {
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
        rows: 8
      }).then(result => {
        if (result.data.status === 200) {
          this.lostList = handleLostData(result);
          this.paginations.total = result.data.info.total;
        }
        console.log(result);
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getLostList({
        page: this.paginations.currentPage,
        rows: 8
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
        pageSize: 8,
        total: 0
      },
      addDialog: false
    };
  },
  created() {
    this.getAllLost()
  },
  components: {
    AddLost
  }
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
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
.add-btn {
  float: right;
  margin-bottom: 20px;
}
</style>
