<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机:">
        <el-input placeholder="输入要查询的手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-right">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table style="width: 100%">
      <el-table-column type="index" width="180">1</el-table-column>
      <el-table-column prop="img" label="头像" width="180"></el-table-column>
      <el-table-column prop="name" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="address" label="所在地址" width="180"></el-table-column>
      <el-table-column prop="date" label="注册时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "User"
};
</script>

<style scoped>
</style>
