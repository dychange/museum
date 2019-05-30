<template>
  <el-dialog title="新增管理员信息" :visible.sync='addDialog' :modal-append-to-body="false" :before-close="closeDialog" :close-on-click-modal='false'>
    <el-form label-position="top">
      <el-form-item label="帐号">
        <el-input ></el-input>
      </el-form-item>
      <el-form-item label="账号类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option :value="123"></el-option>
        </el-select>
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
  name: "Add",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog(){
      this.$emit('update:addDialog',false)
    }
  },
  data() {
    return {
      value:''
    }
  },
};
</script>

<style scoped>
</style>
