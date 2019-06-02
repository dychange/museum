<template>
  <div>
    <div>
      <el-button class="add-btn" type="primary" @click="addDialog=true">新增展品类型</el-button>
    </div>
    <el-table style="width: 100%" :data="itemTypeList">
      <el-table-column label="创建人ID" prop="operatorId" ></el-table-column>
      <el-table-column label="展品类型名称" prop="typeName" ></el-table-column>
      <el-table-column label="备注信息" prop="remark" ></el-table-column>
      <el-table-column label="添加日期" prop="addTime" ></el-table-column>
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
    <add-item-type :addDialog.sync="addDialog" @getAllItemTypeList='getAllItemTypeList'></add-item-type>
  </div>
</template>

<script>
import { getItemTypeInfo } from "../../api/item";
import AddItemType from "./AddItemType";
export default {
  name: "ItemType",
  methods: {
    currentChange(val) {
      this.paginations.currentPage=val
      getItemTypeInfo({
        page: this.paginations.currentPage,
        rows: 8
      }).then(result => {
        this.itemTypeList = result.data.info.rows;
        console.log(result);
      });
    },
    getAllItemTypeList() {
      getItemTypeInfo({
        page: 1,
        rows: 8
      }).then(result => {
        this.itemTypeList = result.data.info.rows;
        this.paginations.total = result.data.info.total;
        console.log(result);
      });
    }
  },
  data() {
    return {
      itemTypeList: [],
      paginations: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      },
      addDialog: false
    };
  },
  mounted() {
    this.getAllItemTypeList();
  },
  components: {
    AddItemType
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
