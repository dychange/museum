<template>
  <div>
    <el-table :data="lostList" style="width: 100%">
      <el-table-column label="物品名称" prop="articleName" width="150"></el-table-column>
      <el-table-column label="说明" prop="remark" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否领取" prop="status" width="150"></el-table-column>
      <el-table-column label="丢失地点" prop="lostPlace" width="150"></el-table-column>
      <el-table-column label="发布人昵称" prop="nickName" width="150"></el-table-column>
      <el-table-column label="丢失时间" prop="lostTime" width="200" align="center"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="100">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import { getLostList, delLostInfo } from "../../api/notices";
import { handleLostData } from "../../lib/handleData";
export default {
  name: "LostAndFound",
  methods: {
    handleDelete(index, row) {},
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
    }
  },
  data() {
    return {
      lostList: [],
      paginations: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    };
  },
  created() {
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
</style>
