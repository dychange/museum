<template>
  <el-dialog title="管理员更新" :visible.sync="editDialog" :modal-append-to-body="false" :before-close="closeDialog" :close-on-click-modal='false'>
    <el-form label-position="top">
      <el-form-item label="帐号">
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名">
        <el-input ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AdminEdit",
  data() {
    return {
    }
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog(){
      this.$emit('update:editDialog',false)
    }
  }
};
</script>

<style scoped>
</style>
