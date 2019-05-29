<template>
  <el-dialog title="管理员更新" :visible.sync="editDialog" :modal-append-to-body="false">
    <el-form label-position="top">
      <el-form-item label="帐号">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editDialog=false">保存</el-button>
      <el-button @click="editDialog=false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AdminEdit",
  props: {
    editDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    editDialog(val) {
      this.editDialog = val;
      this.$emit("update:editDialog", val);
    }
  }
};
</script>

<style scoped>
</style>
