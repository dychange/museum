<template>
  <div>
    <el-table :data="tableData"  style="width: 100%">
      <el-table-column fixed prop="name" label="展品名称" width="150"></el-table-column>
      <el-table-column prop="info" label="展品文字说明" width="200"></el-table-column>
      <el-table-column prop="img_name" label="图片名称" width="120"></el-table-column>
      <el-table-column prop="audio_name" label="音频名称" width="120"></el-table-column>
      <el-table-column prop="add_time" label="添加时间" width="120"></el-table-column>
      <el-table-column prop="operator_id" label="添加人id" width="120"></el-table-column>
      <el-table-column prop="query_times" label="展品查询次数" width="120"></el-table-column>
      <el-table-column prop="qr_code" label="展品二维码" width="120"></el-table-column>
      <el-table-column prop="scan_result" label="扫码结果" width="120"></el-table-column>
      <el-table-column prop="remark" label="备注" width="120"></el-table-column>
      <el-table-column prop="type_id" label="商品类型" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Item",
  data() {
      return {
            tableData: [{
          name: '王小虎',
        },] 
      }
  },
  methods: {
      handleClick(row) {
        console.log(row);
      }
  },
};
</script>

<style scoped>
</style>
