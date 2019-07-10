<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-search"></i>
      查询条件
    </div>
    <div style="margin-bottom:10px;">
      <el-date-picker
        v-model="searchTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :editable="false"
        :default-time="['00:00:00', '00:00:00']"
        value-format="timestamp"
      ></el-date-picker>
      <el-button style="margin-left:10px;" type="primary" @click="searchData" size="small ">查询</el-button>
      <el-button style="margin-left:10px;" type="primary" @click="resetData" size="small ">重置</el-button>
    </div>
    <div class="moduleTitle">
      <i class="el-icon-data-line"></i>
      数据统计
    </div>
    <el-table style="width: 100%" :data="DataList" header-row-class-name="header">
      <el-table-column label="用户头像" width="100" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.wechatUser.headImg" lazy style="width:31px;height:31px;">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" prop="wechatUser.nickName" align="center" min-width="20%"></el-table-column>
      <el-table-column label="展品名称" prop="exhibitsInfo.name" align="center" min-width="20%"></el-table-column>
      <el-table-column label="用户ip" prop="selectUserIp" align="center" min-width="20%"></el-table-column>
      <el-table-column label="查询时间" prop="selectTime" align="center" min-width="20%"></el-table-column>
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
import { handleSelectData } from "../../lib/handleData";
import { getDataList } from "../../api/searchData";
export default {
  name: "DataTotal",
  methods: {
    searchData() {
      if (this.searchTime !== null && this.searchTime.length !== 0) {
        let before = this.searchTime[0];
        let after = this.searchTime[1];
        if (before === after) {
          this.$message.error("请选择不同时间");
        } else {
          this.paginations.currentPage=1
          getDataList({
            page: 1,
            rows: this.paginations.pageSize,
            before,
            after
          }).then(result => {
            if (result.data.status === 200) {
              this.DataList = handleSelectData(result);
              this.paginations.total = result.data.info.total;
            }
          });
        }
      } else {
       this.getAllDataList()
      }
    },
    resetData() {
      this.searchTime=[]
      this.paginations.currentPage=1
     this.getAllDataList()
    },
    currentChange(val) {
      this.paginations.currentPage = val;
      getDataList({
        page: this.paginations.currentPage,
        rows: this.paginations.pageSize,
        before: this.searchTime ? this.searchTime[0] : null,
        after: this.searchTime ? this.searchTime[1] : null
      }).then(result => {
        if (result.data.status === 200) {
          this.DataList = handleSelectData(result);
        }
      });
    },
    getCurDataList() {
      getDataList({
        page: 1,
        rows: this.paginations.pageSize,
        before: this.getNowDate(),
        after: this.getAfterDate()
      }).then(result => {
        if (result.data.status === 200) {
          this.DataList = handleSelectData(result);
          this.paginations.total = result.data.info.total;
        }
      });
    },
     getAllDataList() {
      getDataList({
        page: 1,
        rows: this.paginations.pageSize,
        before: null,
        after: null
      }).then(result => {
        if (result.data.status === 200) {
          this.DataList = handleSelectData(result);
          this.paginations.total = result.data.info.total;
        }
      });
     },
    getNowDate() {
      return new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      ).getTime();
    },
    getAfterDate() {
      return new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000
      ).getTime();
    }
  },
  data() {
    return {
      DataList: [],
      paginations: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      searchTime: [this.getNowDate(), this.getAfterDate()]
    };
  },
  created() {
    this.getCurDataList();
  }
};
</script>
