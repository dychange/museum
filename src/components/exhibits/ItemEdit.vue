<template>
  <el-dialog
    title="展品更新"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form label-position="top" status-icon :model="editItem" :rules="rules" ref="editItem">
      <el-form-item label="展品名称" prop="name">
        <el-input v-model="editItem.name"></el-input>
      </el-form-item>
      <el-form-item label="展品文字说明" prop="info">
        <el-input type="textarea" v-model="editItem.info"></el-input>
      </el-form-item>
      <el-form-item label="图片名称" prop="imgName">
        <el-input v-model="editItem.imgName"></el-input>
      </el-form-item>
      <el-form-item label="音频名称" prop="audioName">
        <el-input v-model="editItem.audioName"></el-input>
      </el-form-item>
      <el-form-item label="展品类型" required>
        <el-select v-model="editItem.typeId" filterable placeholder="请选择">
          <el-option v-for="item in types" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveInfo('editItem')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ItemEdit",
  methods: {
    saveInfo(formName) {},
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editItem"].resetFields();
      });
      this.$emit("update:editDialog", false);
    }
  },
  data() {
    return {
      rules: {
        name: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            max: 18,
            message: "最大只能18位密码",
            trigger: "blur"
          }
        ],
      },
      types: [],
      editItem: {
        name: "",
        info: "",
        imgName: "",
        audioName: "",
        typeId: null
      }
    };
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
</style>
