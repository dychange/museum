<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-menu"></i>
      展区
    </div>
    <el-button class="add-btn" type="primary" @click="addDialog=true" size="small ">新增展区</el-button>
    <el-table style="width: 100%" :data="itemTypeList" header-row-class-name="header">
      <el-table-column label="创建人" prop="memberInfo.nickname" align="center"></el-table-column>
      <el-table-column label="展区名称" prop="typeName" align="center"></el-table-column>
      <el-table-column label="备注信息" prop="remark" align="center"></el-table-column>
      <el-table-column label="添加日期" prop="addTime" align="center"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="160">
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
    <add-item-type :addDialog.sync="addDialog" @getAllItemTypeList="getAllItemTypeList"></add-item-type>
    <edit-item-type
      :editItemTypeInfo="editItemTypeInfo"
      :editDialog.sync="editDialog"
      @currentChange="currentChange"
      :curpage="paginations.currentPage"
    ></edit-item-type>
  </div>
</template>

<script>
import { getItemTypeInfo, editItemType, delItemType } from "../../api/item";
import { handleAddTime } from "../../lib/handleData";
import AddItemType from "./AddItemType";
import EditItemType from "./EditItemType";
export default {
  name: "ItemType",
  methods: {
    handleEdit(index, row) {
      this.editDialog=true
      this.editItemTypeInfo = {
        id:row.id,
        typeName: row.typeName,
        remark: row.remark
      };
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          delItemType({id}).then((result) => {
            if(result.data.status===200){
              console.log(result)
              this.$message.success('删除成功')
              this.currentChange(this.paginations.currentPage)
            }
          })
        })
        .catch(() => {});
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getItemTypeInfo({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize
      }).then(result => {
        if (result.data.status === 200) {
          this.itemTypeList = handleAddTime(result);
        }
      });
    },
    getAllItemTypeList() {
      getItemTypeInfo({
        page: 1,
        rows: this.paginations.pageSize
      }).then(result => {
        if (result.data.status === 200) {
          this.itemTypeList = handleAddTime(result);
          this.paginations.total = result.data.info.total;
        }
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
      editDialog: false,
      editItemTypeInfo: {}
    };
  },
  created() {
    this.getAllItemTypeList();
  },
  components: {
    AddItemType,
    EditItemType
  }
};
</script>


