<template>
  <el-dialog
    title="新增展区"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
  >
    <el-form
      label-position="top"
      status-icon
      :model="newItemTypeInfo"
      :rules="rules"
      ref="newItemTypeInfo"
    >
      <el-form-item label="展区名称" prop="typeName">
        <el-input v-model="newItemTypeInfo.typeName" @focus="clear('typeName')"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model="newItemTypeInfo.remark" @focus="clear('remark')"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createItemType('newItemTypeInfo')">添加</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { checkItemTypeName, addItemType } from "../../api/item";
import { getUserInfoMessage } from "../../utils/localStorage";
export default {
  name: "AddItemType",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["newItemTypeInfo"].resetFields();
      });
      this.$emit("update:addDialog", false);
    },
    // 创建新的商品
    createItemType(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newItemTypeInfo.operatorId = getUserInfoMessage("userInfo").id;
          let ItemInfo = this.newItemTypeInfo;
          addItemType(ItemInfo).then(result => {
            if(result.data.status === 200){
              this.$message.success('添加成功')
              this.closeDialog()
              this.$emit('getAllItemTypeList')
            }
          });
        }
      });
    },
    clear(prop) {
      this.$refs["newItemTypeInfo"].clearValidate(prop);
    }
  },
  data() {
    const checkTypeName = (rule, value, callback) => {
      let typeName = value;
      checkItemTypeName({ typeName }).then(result => {
        if (result.data.status === 412 ) {
          callback(new Error(result.data.msg));
        }
        callback();
      });
    };
    return {
      newItemTypeInfo: {
        typeName: "",
        remark: "",
        operatorId: null
      },
      rules: {
        typeName: [
          { required: true, message: "展区不能为空", trigger: "blur" },
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            validator: checkTypeName,
            trigger: "blur"
          }
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

