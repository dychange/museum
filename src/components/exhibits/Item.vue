<template>
  <div>
    <el-button class="add-btn" type="primary" @click="addDialog=true" >新增展品</el-button>
    <el-table :data="itemList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="图片名称:">
              <span>{{ props.row.imgName }}</span>
            </el-form-item>
            <el-form-item label="音频名称:">
              <span>{{ props.row.audioName }}</span>
            </el-form-item>
            <el-form-item label="添加时间:">
              <span>{{ props.row.addTime }}</span>
            </el-form-item>
            <el-form-item label="添加人id:">
              <span>{{ props.row.operatorId }}</span>
            </el-form-item>
            <el-form-item label="展品查询次数:">
              <span>{{ props.row.queryTimes }}</span>
            </el-form-item>
            <el-form-item label="展品二维码:">
              <span>{{ props.row.qrCode }}</span>
            </el-form-item>
            <el-form-item label="扫码结果:">
              <span>{{ props.row.scanResult }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="展品类型" prop="typeName" width="300"></el-table-column>
      <el-table-column label="展品名称" prop="name" width="300"></el-table-column>
      <el-table-column label="展品文字说明" prop="info" show-overflow-tooltip width="400"></el-table-column>
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
    <add-item :addDialog.sync="addDialog" @getAllItem="getAllItem"></add-item>
    <item-edit
      :editDialog.sync="editDialog"
      :editItem.sync="editItem"
      @currentChange="currentChange"
      :curpage="paginations.currentPage"
    ></item-edit>
  </div>
</template>

<script>
import { getItemInfo, delItem } from "../../api/item";
import { handleItemData } from "../../lib/handleData";
import AddItem from "./AddItem";
import ItemEdit from "./ItemEdit";
export default {
  name: "Item",
  methods: {
    handleEdit(index, row) {
      this.editDialog = true;
      this.editItem = {
        id: row.id,
        name: row.name,
        info: row.info,
        imgName: row.imgName,
        audioName: row.audioName,
        typeName: row.typeName,
        typeId: row.typeId
      };
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          delItem({ id }).then(result => {
            if (result.data.status === 200) {
              this.$message.success("删除成功");
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
    getAllItem() {
      getItemInfo({
        page: 1,
        rows: 8
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList = handleItemData(result);
          this.paginations.total = result.data.info.total;
        }
        console.log(result);
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getItemInfo({
        page: this.paginations.currentPage,
        rows: 8
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList = handleItemData(result);
        }
      });
    }
  },
  data() {
    return {
      itemList: [],
      editItem: {
        id: null,
        name: "",
        info: "",
        imgName: "",
        audioName: "",
        typeName: "",
        typeId: null
      },
      paginations: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      },
      addDialog: false,
      editDialog: false,
    };
  },
  created() {
    this.getAllItem();
  },
  components: {
    AddItem,
    ItemEdit
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
.pagination {
  text-align: center;
}
.add-btn {
  margin-bottom: 20px;
  float: right;
}
</style>
