<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-search"></i>
      查询条件
    </div>
    <div>
      <el-select
        v-model="itemType"
        filterable
        clearable
        placeholder="请选择展区"
        style="margin-right:10px;"
      >
        <el-option v-for="item in types" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
      </el-select>
      <el-autocomplete
        v-model="itemName"
        :fetch-suggestions="querySearch"
        placeholder="请输入展品名称"
        :trigger-on-focus="false"
      ></el-autocomplete>
      <el-button style="margin-left:10px;" type="primary" size="small " @click="searchItem">查询</el-button>
      <el-button style="margin-left:10px;" type="primary" size="small " @click="resetItem">重置</el-button>
      <el-button class="add-btn" type="primary" @click="addDialog=true" size="small ">新增展品</el-button>
      <el-button class="add-btn" type="primary" size="small " @click="exportToExcel">导出</el-button>
    </div>
    <div class="moduleTitle">
      <i class="iconfont">&#xe6b6;</i>
      展品管理
    </div>
    <el-table
      :data="itemList"
      style="width: 100%"
      @expand-change="expandChange"
      header-row-class-name="header"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="图片名称:">
              <el-popover placement="right" width="300" trigger="click">
                <el-button type="text" slot="reference">查看图片</el-button>
                <img :src="props.row.imgName" style="width:100%;height:100%;" />
              </el-popover>
            </el-form-item>
            <el-form-item label="音频:">
              <el-button
                :icon="playing?'el-icon-video-pause':'el-icon-video-play'"
                circle
                @click="startOrPause"
              ></el-button>
              <audio
                ref="audio"
                :src="props.row.audioName"
                @play="onPlay"
                @pause="onPause"
                preload="auto"
                :key="props.row.audioName"
              ></audio>
            </el-form-item>
            <el-form-item label="添加时间:">
              <span>{{ props.row.addTime }}</span>
            </el-form-item>
            <el-form-item label="展品查询次数:">
              <span>{{ props.row.queryTimes }}</span>
            </el-form-item>
            <el-form-item label="展品二维码:">
              <el-popover placement="right" width="100" trigger="click">
                <el-button type="text" slot="reference">查看图片</el-button>
                <img :src="props.row.qrCode" style="width:100%;height:100%;" />
              </el-popover>
            </el-form-item>
            <el-form-item label="扫码结果:">
              <span>{{ props.row.scanResult }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="number" min-width="5%" align="center"></el-table-column>
      <el-table-column label="所在展区" prop="typeName" min-width="20%" align="center"></el-table-column>
      <el-table-column label="展品名称" prop="name" min-width="20%" align="center"></el-table-column>
      <el-table-column
        label="展品文字说明"
        prop="info"
        show-overflow-tooltip
        min-width="25%"
        align="center"
      ></el-table-column>
      <el-table-column label="添加人" prop="memberInfo.nickname" min-width="20%" align="center"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="250" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
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
    <add-item :addDialog.sync="addDialog" @getAllItem="getAllItem" :types="types"></add-item>
    <item-edit
      :editDialog.sync="editDialog"
      :editItem.sync="editItem"
      :types="types"
      @currentChange="currentChange"
      :curpage="paginations.currentPage"
    ></item-edit>
    <preview :previewDialog.sync="previewDialog" :detailInfo="detailInfo"></preview>
  </div>
</template>

<script>
import {
  getItemInfo,
  delItem,
  getTypeName,
  getItemName,
  exportItem
} from "../../api/item";
import { handleAddTime } from "../../lib/handleData";
import AddItem from "./AddItem";
import ItemEdit from "./ItemEdit";
import Preview from "./preview";
export default {
  name: "Item",
  methods: {
    exportToExcel() {
      let msg={
        itemName:this.itemName,
        itemType:this.itemType
      }
      exportItem(msg).then(result => {
        if (result.data.status === 200) {
          let list = result.data.info;
          console.log(result)
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("../../assets/js/Export2Excel");
            const tHeader = ["展品id", "展品名称", "展品链接","展区"];
            const filterVal = ["id", "name", "url","type"];
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, "excel");
          });
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    searchItem() {
      this.paginations.currentPage = 1;
      this.getAllItem();
    },
    resetItem() {
      this.itemType = this.itemName = null;
      this.paginations.currentPage = 1;
      this.getAllItem();
    },
    querySearch(queryString, cb) {
      let nameList = this.nameList;
      let results = queryString
        ? nameList.filter(this.createFilter(queryString))
        : nameList;
      cb(results);
    },
    createFilter(queryString) {
      return itemName => {
        return (
          itemName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handlePreview(index, row) {
      this.previewDialog = true;
      this.detailInfo = {
        Name: row.name,
        Audio: row.audioName,
        Content: row.info,
        Img: row.imgName
      };
    },
    handleEdit(index, row) {
      this.editDialog = true;
      this.editItem = {
        id: row.id,
        name: row.name,
        info: row.info,
        imgName: row.imgName,
        audioName: row.audioName,
        typeName: row.typeName,
        typeId: row.typeId,
        oldImg: "",
        oldAudio: ""
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
          let imgName = row.imgName;
          delItem({ id, imgName }).then(result => {
            if (result.data.status === 200) {
              this.$message.success("删除成功");
              this.currentChange(this.paginations.currentPage);
            }
          });
        })
        .catch(() => {});
    },
    getAllItem() {
      getItemInfo({
        page: 1,
        rows: this.paginations.pageSize,
        itemName: this.itemName,
        itemType: this.itemType
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList = handleAddTime(result);
          this.paginations.total = result.data.info.total;
        }
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getItemInfo({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize,
        itemName: this.itemName,
        itemType: this.itemType
      }).then(result => {
        if (result.data.status === 200) {
          this.itemList = handleAddTime(result);
        }
      });
    },
    startOrPause() {
      this.playing ? this.$refs.audio.pause() : this.$refs.audio.play();
    },
    onPlay() {
      this.playing = true;
    },
    onPause() {
      this.playing = false;
    },
    expandChange(row, expandedRows) {
      if (expandedRows.length > 1) {
        expandedRows.shift();
      }
    }
  },
  data() {
    return {
      itemList: [],
      types: [],
      itemName: null,
      nameList: [],
      itemType: null,
      editItem: {},
      detailInfo: {},
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      addDialog: false,
      editDialog: false,
      playing: false,
      previewDialog: false
    };
  },
  created() {
    this.getAllItem();
    getTypeName().then(result => {
      if (result.data.status === 200) {
        let info = result.data.info;
        let obj = { value: "" };
        for (let i in info) {
          obj.value = info[i].typeName;
          Object.assign(info[i], obj);
        }
        this.types = info;
      }
    });
    getItemName().then(result => {
      if (result.data.status === 200) {
        this.nameList = result.data.info;
      }
    });
  },
  components: {
    AddItem,
    ItemEdit,
    Preview
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
  margin-bottom: 0 !important;
  width: 50%;
  padding-left: 12px;
}
.el-button.is-circle {
  padding: 0;
  border: 0;
  position: absolute;
  top: 6px;
}
.el-button >>> .el-icon-video-play {
  font-size: 28px;
}
.el-button >>> .el-icon-video-pause {
  font-size: 28px;
}
</style>

