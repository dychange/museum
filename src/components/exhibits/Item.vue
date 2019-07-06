<template>
  <div>
    <div class="moduleTitle">
      <i class="iconfont">&#xe6b6;</i>
      展品管理
    </div>
    <el-button class="add-btn" type="primary" @click="addDialog=true" size="small ">新增展品</el-button>
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
               <el-popover
                placement="right"
                width="300"
                trigger="click"
              >
                <el-button type="text" slot="reference">查看图片</el-button>
                <img :src="props.row.imgName" style="width:100%;height:100%;" >
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
              <el-popover
                placement="right"
                width="100"
                trigger="click"
              >
                <el-button type="text" slot="reference">查看图片</el-button>
                <img :src="props.row.qrCode" style="width:100%;height:100%;" >
              </el-popover>
            </el-form-item>
            <el-form-item label="扫码结果:">
              <span>{{ props.row.scanResult }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="展品类型" prop="typeName" min-width="20%"></el-table-column>
      <el-table-column label="展品名称" prop="name" min-width="20%"></el-table-column>
      <el-table-column label="展品文字说明" prop="info" show-overflow-tooltip min-width="25%"></el-table-column>
      <el-table-column label="添加人" prop="memberInfo.nickname" min-width="20%" align="center"></el-table-column>
      <el-table-column label="编辑" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
           <el-button type="mini" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
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
    <preview :previewDialog.sync='previewDialog' :detailInfo='detailInfo'></preview>
  </div>
</template>

<script>
import { getItemInfo, delItem } from "../../api/item";
import { handleAddTime } from "../../lib/handleData";
import AddItem from "./AddItem";
import ItemEdit from "./ItemEdit";
import Preview from './preview'
export default {
  name: "Item",
  methods: {
    handlePreview(index,row){
      this.previewDialog=true
      this.detailInfo={
        Name:row.name,
        Audio:row.audioName,
        Content:row.info,
        Img:row.imgName
      }
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
          let imgName=row.imgName
          delItem({ id,imgName }).then(result => {
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
        rows: this.paginations.pageSize
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
        rows: this.paginations.pageSize
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
      editItem: {},
      detailInfo:{},
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      addDialog: false,
      editDialog: false,
      playing: false,
      previewDialog:false
    };
  },
  created() {
    this.getAllItem();
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

