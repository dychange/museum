<template>
  <el-dialog title="新增管理员信息" :visible.sync="addDialog" :modal-append-to-body="false">
    <el-form label-position="top">
      <el-form-item label="帐号">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号类型">
        <el-select placeholder="请选择">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人姓名">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addDialog=false">保存</el-button>
      <el-button @click="addDialog=false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Add",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    addDialog(val) {
      this.addDialog = val;
      this.$emit("update:addDialog", val);
    }
  }
};
</script>

<style scoped>
</style>
