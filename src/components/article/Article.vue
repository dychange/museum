<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-search"></i>
      查询条件
    </div>
    <el-autocomplete
      v-model="itemName"
      :fetch-suggestions="querySearch"
      placeholder="请输入文章名称"
      :trigger-on-focus="false"
    ></el-autocomplete>
    <el-button style="margin-left:10px;" type="primary" size="small " @click="searchItem">查询</el-button>
    <el-button style="margin-left:10px;" type="primary" size="small " @click="resetItem">重置</el-button>
     <router-link tag="span" to="/article">
      <el-button size="small" class="add-btn" type="primary">新文章</el-button>
    </router-link>
    <div class="moduleTitle">
      <i class="el-icon-document-copy"></i>
      文章列表
    </div>
    <el-table style="width: 100%" :data="articleList" header-row-class-name="header">
      <el-table-column label="文章类型" min-width="15%">
        <template slot-scope="types">
          <el-tag effect="dark" v-if="types.row.essayInfo.essayType===2?true:false">博物馆文化</el-tag>
          <el-badge
            :value="types.row.essayInfo.dynamicType===1?'紧急':'普通'"
            :type="types.row.essayInfo.dynamicType===1?'danger':'primary'"
            class="dytype"
            v-else
          >
            <el-tag effect="dark" type="success">本馆动态</el-tag>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" prop="essayInfo.title" min-width="15%" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column label="作者" prop="essayInfo.author" min-width="13%" align="center"></el-table-column>
      <el-table-column label="来源" prop="essayInfo.source" min-width="15%" align="center"></el-table-column>
      <el-table-column label="浏览次数" prop="essayInfo.views" min-width="12%" align="center"></el-table-column>
      <el-table-column label="发布时间" prop="essayInfo.addTime" min-width="23%" align="center"></el-table-column>
      <el-table-column label="录入者" prop="essayInfo.inputer" min-width="13%" align="center"></el-table-column>
      <el-table-column label="添加人昵称" prop="nickName" min-width="15%" align="center"></el-table-column>
      <el-table-column label="是否发布" width="200" align="center">
        <template slot-scope="release">
          <el-switch
            v-model="release.row.essayInfo.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="已发布"
            inactive-text="未发布"
            @change="openNotice(release.row.essayInfo.status,release.row.essayInfo)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="编辑" fixed="right" width="208" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    <preview :previewDialog.sync="previewDialog" :previewInfo="previewInfo"></preview>
    <edit-art :editDialog.sync='editDialog' :editInfo='editInfo' @currentChange="currentChange"
      :curpage="paginations.currentPage"></edit-art>
  </div>
</template>

<script>
import EditArt from './EditArt'
import Preview from "./Preview";
import {handleArtTime} from '../../lib/handleData'
import {getArtList, delArt , editArt } from '../../api/article'
export default {
  name: "Article",
  methods: {
    handleEdit(index, row) {
      this.editDialog=true
      this.editInfo={
        author: row.essayInfo.author,
        inputer: row.essayInfo.inputer,
        content: row.essayInfo.content,
        source: row.essayInfo.source,
        title: row.essayInfo.title,
        essayType:row.essayInfo.essayType,
        dynamicType:row.essayInfo.dynamicType,
        id:row.essayInfo.id
      }
    },
    openNotice(val, row) {
      let status = val;
      let id = row.id;
      editArt({id,status}).then((result) => {
        if(result.data.status===200){
          this.$message.success(result.data.msg)
          this.currentChange(this.paginations.currentPage)
        }
      })
    },
    handleDel(index, row) {
      this.$confirm("此操作将永久删除,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          let id = row.essayInfo.id;
          delArt({id}).then((result) => {
            if(result.data.status===200){
              this.$message.success('删除成功')
              this.currentChange(this.paginations.currentPage)
            }
          })
        })
        .catch(() => {});
    },
    handlePreview(index, row) {
      this.previewDialog = true;
      this.previewInfo = {
        author: row.essayInfo.author,
        inputer: row.essayInfo.inputer,
        addTime: row.essayInfo.addTime,
        content: row.essayInfo.content,
        source: row.essayInfo.source,
        title: row.essayInfo.title,
        views: row.essayInfo.views
      };
    },
    currentChange(val) {
      this.paginations.currentPage=val
      getArtList({
        page:this.paginations.currentPage,
        rows:this.paginations.pageSize
      }).then((result) => {
        if(result.data.status===200){
          this.articleList=handleArtTime(result)
        }
      })
    },
    getAllArticle(){
      getArtList({
        page:1,
        rows:this.paginations.pageSize
      }).then((result) => {
        if(result.data.status===200){
          this.articleList=handleArtTime(result)
          this.paginations.total=result.data.info.total 
        }
      })
    },
    searchItem() {
      this.paginations.currentPage = 1;
    },
    resetItem() {
      this.itemName = null;
      this.paginations.currentPage = 1;
      this.getAllArticle()
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
  },
  created() {
    this.getAllArticle()
  },
  data() {
    return {
      articleList: [],
      paginations: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      previewInfo: {},
      previewDialog: false,
      editDialog:false,
      editInfo: {},
      itemName: null,
      nameList: []
    };
  },
  components: {
    Preview,
    EditArt
  }
};
</script>


<style scoped>
.dytype {
  margin-top: 10px;
}
</style>
