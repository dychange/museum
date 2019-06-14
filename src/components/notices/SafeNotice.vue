<template>
  <div>
    <el-button class="add-btn" type="primary" @click="addNotice">发布通告</el-button>
    <el-table style="width: 100%" :data="noticeList">
      <el-table-column label="通告类型" width="200">
        <template slot-scope="types">
        <el-tag type="danger" effect="dark" v-if="types.row.type===2?true:false">紧急通告</el-tag>
        <el-tag  effect="dark" v-else>普通通告</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="通告标题" prop="title" width="200"></el-table-column>
      <el-table-column label="通告说明" prop="content" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column label="发布时间" prop="addTime" width="200"></el-table-column>
      <el-table-column label="是否发布" width="200">
        <template slot-scope="release">
          <el-switch
            v-model="release.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="已发布"
            inactive-text="未发布"
            @change="openNotice(release.row.status,release.row)"
          ></el-switch>
        </template>
      </el-table-column>
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
    <add-notice :addDialog.sync="addDialog" @getAllNoticeList="getAllNoticeList"></add-notice>
    <edit-notice
      :editDialog.sync="editDialog"
      :curpage="paginations.currentPage"
      :editNotice.sync="editNotice"
      @currentChange='currentChange'
    ></edit-notice>
  </div>
</template>

<script>
import AddNotice from "./AddNotice";
import EditNotice from "./EditNotice";
import { getNoticeInfo, delNoticeInfo, Release } from "../../api/notices";
import { handleAddTime } from "../../lib/handleData";
export default {
  name: "SafeNotice",
  methods: {
    handleEdit(index, row) {
      this.editNotice = {
        id: row.id,
        title: row.title,
        content: row.content,
        type: row.type
      };
      this.editDialog = true;
    },
    //删除对应的通告信息
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          let id=row.id
          delNoticeInfo({id}).then((result) => {
            if(result.data.status===200){
              this.$message.success(result.data.msg)
              this.currentChange(this.paginations.currentPage)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openNotice(val,row) {
      let status=val
      let id=row.id
      Release({id,status}).then((result) => {
        if(result.data.status===200){
          this.$message.success(result.data.msg)
        }
      })
    },
    addNotice() {
      this.addDialog = true;
    },
    //获取通告列表,传入页数和获取数量
    getAllNoticeList() {
      getNoticeInfo({
        page: 1,
        rows: 7
      }).then(result => {
        if (result.data.status === 200) {
          this.noticeList = handleAddTime(result);
          console.log(result);
        }
      });
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getNoticeInfo({
        page: this.paginations.currentPage,
        rows: 7
      }).then(result => {
        if (result.data.status === 200) {
          this.noticeList = handleAddTime(result);
        }
      });
    }
  },
  data() {
    return {
      noticeList: [],
      editNotice: {},
      editDialog: false,
      addDialog: false,
      editNotice: {},
      paginations: {
        total: 0,
        currentPage: 1,
        pageSize: 7
      }
    };
  },
  created() {
    this.getAllNoticeList();
  },
  components: {
    AddNotice,
    EditNotice
  }
};
</script>
