<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-menu"></i>
      展区</div>
      <el-button class="add-btn" type="primary" @click="addDialog=true" size="small ">新增展区</el-button>
    <el-table style="width: 100%" :data="itemTypeList" header-row-class-name='header'>
      <el-table-column label="创建人" prop="memberInfo.nickname" align="center"></el-table-column>
      <el-table-column label="展品类型名称" prop="typeName" align="center"></el-table-column>
      <el-table-column label="备注信息" prop="remark" align="center"></el-table-column>
      <el-table-column label="添加日期" prop="addTime" align="center"></el-table-column>
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
import {handleAddTime} from '../../lib/handleData'
import AddItemType from "./AddItemType";
export default {
  name: "ItemType",
  methods: {
    currentChange(val) {
      this.paginations.currentPage=val
      getItemTypeInfo({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize
      }).then(result => {
        if(result.data.status === 200){
        this.itemTypeList = handleAddTime(result);
        }
        console.log(result);
      });
    },
    getAllItemTypeList() {
      getItemTypeInfo({
        page: 1,
        rows: this.paginations.pageSize
      }).then(result => {
        if(result.data.status === 200){
        this.itemTypeList = handleAddTime(result);
        this.paginations.total = result.data.info.total;
        }
        console.log(result);
      });
    }
  },
  data() {
    return {
      itemTypeList: [],
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      addDialog: false,
    };
  },
  created() {
    this.getAllItemTypeList();
  },
  components: {
    AddItemType
  }
};
</script>


