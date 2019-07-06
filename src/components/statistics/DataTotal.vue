<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-data-line"></i>
      数据统计</div>
    <el-table style="width: 100%" :data="DataList" header-row-class-name='header'>
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
import {handleSelectData} from '../../lib/handleData'
import {getDataList} from '../../api/searchData'
export default {
  name: "DataTotal",
  methods: {
    currentChange(val) {
      this.paginations.currentPage=val
      getDataList({
        page:this.paginations.currentPage,
        rows:this.paginations.pageSize
      }).then((result) => {
        if(result.data.status===200){
          this.DataList=handleSelectData(result)
        }
      })
    },
    getAllDataList() {
      getDataList({
        page:1,
        rows:this.paginations.pageSize
      }).then((result) => {
        if(result.data.status===200){
          this.DataList=handleSelectData(result)
          this.paginations.total=result.data.info.total
        }
      })
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
    };
  },
  created() {
    this.getAllDataList()
  }
};
</script>


