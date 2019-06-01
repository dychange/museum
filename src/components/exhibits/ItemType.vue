<template>
  <div>
    <div>
    <el-button class="add-btn" type="primary" @click="addDialog=true">新增商品</el-button>
    </div>
    <el-table style="width: 100%" :data="itemList">
      <el-table-column label="创建人ID" prop="operatorId" width="200"></el-table-column>
      <el-table-column label="展品类型名称" prop="typeName" width="200"></el-table-column>
      <el-table-column label="备注信息" prop="remark" width="400"></el-table-column>
      <el-table-column label="添加日期" prop="addTime" width="200"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="200">
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
    <add-item :addDialog.sync='addDialog'></add-item>
  </div>
</template>

<script>
import {getItemTypeInfo} from '../../api/item'
import AddItem from './AddItem'
export default {
  name: "ItemType",
   methods: {
    handleEdit(index, row) {
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    currentChange(val){

    },
    getAllItemList(){
      getItemTypeInfo({
        page:1,
        rows:8
      }).then((result) => {
        this.itemList=result.data.info.rows
        this.paginations.total=result.data.info.total
        console.log(result)
      })
    }
  },
  data() {
    return {
      itemList:[],
      paginations:{
        currentPage:1,
        pageSize:8,
        total:0
      },
      addDialog:false
    }
  },
  mounted() {
    this.getAllItemList()
  },
  components:{
    AddItem
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
