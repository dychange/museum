<template>
  <el-dialog
    title="修改展区"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
  >
    <el-form
      label-position="top"
      status-icon
      :model="editItemTypeInfo"
      :rules="rules"
      ref="editItemTypeInfo"
    >
      <el-form-item label="展区名称" prop="typeName">
        <el-input v-model="editItemTypeInfo.typeName" @focus="clear('typeName')"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model="editItemTypeInfo.remark" @focus="clear('remark')"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveItemType('editItemTypeInfo')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editItemType } from "../../api/item";
import { getUserInfoMessage } from "../../utils/localStorage";
export default {
  name: "EditItemType",
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    curpage:{
        type:Number
    },
    editItemTypeInfo:{
        type:Object
    }
  },
  methods: {
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editItemTypeInfo"].resetFields();
      });
      this.$emit("update:editDialog", false);
    },
    saveItemType(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ItemInfo = this.editItemTypeInfo;
          editItemType(ItemInfo).then((result) => {
            if(result.data.status===200){
              this.$message.success(result.data.msg)
              this.closeDialog()
              this.$emit('currentChange',this.curpage)
            }
          })
        }
      });
    },
    clear(prop) {
      this.$refs["editItemTypeInfo"].clearValidate(prop);
    }
  },
  data() {
    return {
      rules: {
        typeName: [
          { required: true, message: "展区不能为空", trigger: "blur" },
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
        ],
        remark: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

