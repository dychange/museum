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
        <el-input v-model="editItem.name" @focus="clear('name')"></el-input>
      </el-form-item>
      <el-form-item label="展品文字说明" prop="info">
        <el-input
          type="textarea"
          v-model="editItem.info"
          maxlength="2000"
          show-word-limit
          :autosize="{minRows: 5,maxRows:5}"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片名称" prop="imgName">
        <el-input v-model="editItem.imgName" @focus="clear('imgName')"></el-input>
      </el-form-item>
      <el-form-item label="音频名称" prop="audioName">
        <el-input v-model="editItem.audioName" @focus="clear('audioName')"></el-input>
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
import { getTypeName, updateItem } from "../../api/item";
export default {
  name: "ItemEdit",
  methods: {
    saveInfo(formName) {
      this.$confirm("确认保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              let editItem = this.editItem;
              updateItem(editItem).then(result => {
                if (result.data.status === 200) {
                  this.$message.success(result.data.msg),
                  this.closeDialog()
                  this.$emit("currentChange", this.curpage);
                }
              });
            } else {
              this.$message.error("请填写正确信息");
            }
          });
        })
        .catch(() => {});
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editItem"].resetFields();
      });
      this.$emit("update:editDialog", false);
      this.$emit("update:editItem", {});
    },
    clear(prop) {
      this.$refs["editItem"].clearValidate(prop);
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
            required: true,
            message: "展品名称不能为空",
            trigger: "blur"
          }
        ],
        imgName: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            required: true,
            message: "展品名称不能为空",
            trigger: "blur"
          }
        ],
        audioName: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            required: true,
            message: "展品名称不能为空",
            trigger: "blur"
          }
        ]
      },
      types: []
    };
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    editItem: {
      type: Object
    },
    curpage: {
      type: Number
    }
  },
  created() {
    getTypeName().then(result => {
      if (result.data.status === 200) {
        let info = result.data.info;
        let obj = { value: "" };
        for (let i in info) {
          obj.value = info[i].typeName;
          Object.assign(info[i], obj);
        }
        this.types = info;
      }
    });
  }
};
</script>


