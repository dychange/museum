<template>
  <div>
    <div>
     <el-date-picker
     class="datepicker"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
    <el-button class="add-btn" type="primary" >新增商品</el-button>
    </div>
    <el-table style="width: 100%" >
      <el-table-column label="头像" prop="img"></el-table-column>
      <el-table-column label="展品名称" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="账号类型" prop="usertype"></el-table-column>
      <el-table-column label="开户日期" prop="date"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastlogin"></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ItemType",
   methods: {
    handleEdit(index, row) {
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
};
</script>

<style scoped>
.add-btn {
  float: right;
  margin-bottom: 20px;
}
</style>
